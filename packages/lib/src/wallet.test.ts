import { FutureRegTestWallet } from "./wallet";
import { Vault } from "./vault";
import { CashAddressNetworkPrefix } from "@bitauth/libauth";

import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import { ElectrumNetworkProvider } from "cashscript";
import { TokenSendRequest } from "mainnet-js";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export async function getAnAliceWallet(amount: number): Promise<FutureRegTestWallet> {
    const alice = await FutureRegTestWallet.fromId(process.env["ALICE_ID"]!);
    const height = await alice.provider!.getBlockHeight();
    let utxos = await alice.getUtxos();
    utxos = utxos.filter((u) => (height - u.height!) > 100)

    let randomUtxo = utxos[Math.floor(Math.random() * utxos.length)]
    let newAlice = await FutureRegTestWallet.newRandom();
    await alice.send([
        {
            cashaddr: newAlice.getDepositAddress(),
            value: amount,
            unit: "satoshis",
        },
    ], {
        utxoIds: [randomUtxo]
    });
    return newAlice
}


describe(`Prepare outpoints for swapping`, () => {

    test("Test utxo prep", async () => {
        let alice = await getAnAliceWallet(1_123_120_000)
        await alice.preparePlacementOutpoints()
        await delay(1000)
        let utxos = await alice.getUtxos()
        expect(utxos.length).toBe(17)
        expect(await alice.getBalance('sats')).toBeGreaterThan(1_123_119_269)
    });


})


describe(`Test placing with coupons`, () => {

    test("Test swapping with coupons", async () => {

        // get about 11.2 rBCH
        let alice = await getAnAliceWallet(1_123_120_000)
        await delay(1000)

        // create three coupons for locking a whole coin in the 1e2 vault
        let couponAddress = Vault.getCoupon(100_000_000, 100, CashAddressNetworkPrefix.regtest)
        alice.send([{
            cashaddr: alice.getDepositAddress(),
            value: 100_000,
            unit: 'sats',
        },
        {
            cashaddr: couponAddress,
            value: 100_000,
            unit: 'sats',
        },
        {
            cashaddr: couponAddress,
            value: 100_000,
            unit: 'sats',
        },
        {
            cashaddr: couponAddress,
            value: 100_000,
            unit: 'sats',
        }])

        await delay(1000)

        // Mint some FTs
        await alice.tokenGenesis({
            cashaddr: Vault.getAddress(100, CashAddressNetworkPrefix.regtest)!,
            amount: 100_000_000_000n
        });

        await delay(1000)
        await alice.preparePlacementOutpoints()
        await delay(1000)

        let regTest = new ElectrumCluster(
            "CashScript Application",
            "1.4.1",
            1,
            1,
            ClusterOrder.PRIORITY,
            2000
        );
        regTest.addServer("127.0.0.1", 60003, ElectrumTransport.WS.Scheme, false);

        let provider = new ElectrumNetworkProvider("regtest", regTest, false);

        let wallet = await provider.getUtxos(alice.getDepositAddress());
        let stub = wallet.pop();
        
        let coupons = await provider.getUtxos(couponAddress)

        let requests = coupons.map(u => {
            return {
                placement: 100_000_000,
                locktime: 100,
                //coupon: u
            }
        })
        let vaults = await alice.getVaultUtxoMap(requests, provider);
        let state = {
            chain: [],
            provider: provider,
            vaults: vaults,
            requests: requests,
            wallet: wallet,
            walletStub: stub,
        };

        let finalState = await alice.swapFnRaw(state)


        await delay(2000)
        //let utxos = await alice.getUtxos()
        //console.log(utxos)
        let bob = await FutureRegTestWallet.newRandom()

        await alice.sendMaxFungibleTokens(bob.getDepositAddress())
        await alice.sendMax(bob.getDepositAddress())
        let aliceTokens = await alice.getAllTokenBalances()
        expect(JSON.stringify(aliceTokens)).toBe('{}');
        expect(await bob.getBalance('sats')).toBeGreaterThan(1_123_120_000 - 360_002_000)
    });

    test("Test redeeming tokens", async () => {

        // get about 11.2 rBCH
        let alice = await getAnAliceWallet(1_123_120_000)
        let bob = await FutureRegTestWallet.newRandom()
        await delay(1000)
        // create a coupon for locking a whole coin in the 1e2 vault
        let couponAddress = Vault.getCoupon(100_000_000, 100, CashAddressNetworkPrefix.regtest)
        alice.send([{
            cashaddr: alice.getDepositAddress(),
            value: 100_000,
            unit: 'sats',
        },
        {
            cashaddr: couponAddress,
            value: 100_000,
            unit: 'sats',
        },
        {
            cashaddr: couponAddress,
            value: 100_000,
            unit: 'sats',
        },
        {
            cashaddr: couponAddress,
            value: 100_000,
            unit: 'sats',
        }])

        await delay(1000)

        // Mint some FTs
        let tokenResponse = await alice.tokenGenesis({
            cashaddr: alice.getDepositAddress(),
            amount: 1_000_000_000n
        });
        let tokenId = tokenResponse.tokenIds[0]
        await delay(1000)

        alice.send(
            [new TokenSendRequest({
                cashaddr: Vault.getAddress(100, CashAddressNetworkPrefix.regtest)!,
                amount: 500_000_000n,
                tokenId: tokenId,
                value: 500_001_000,
            }),
            new TokenSendRequest({
                cashaddr: alice.getDepositAddress(),
                amount: 100_000_000n,
                tokenId: tokenId,
                value: 800,
            }),
            new TokenSendRequest({
                cashaddr: alice.getDepositAddress(),
                amount: 100_000_000n,
                tokenId: tokenId,
                value: 800,
            }),
            new TokenSendRequest({
                cashaddr: alice.getDepositAddress(),
                amount: 100_000_000n,
                tokenId: tokenId,
                value: 800,
            }),
            new TokenSendRequest({
                cashaddr: alice.getDepositAddress(),
                amount: 100_000_000n,
                tokenId: tokenId,
                value: 800,
            }),
            new TokenSendRequest({
                cashaddr: alice.getDepositAddress(),
                amount: 100_000_000n,
                tokenId: tokenId,
                value: 800,
            })
        ]
        );
        await delay(1000)
        await alice.preparePlacementOutpoints()
        await delay(1000)

        let regTest = new ElectrumCluster(
            "CashScript Application",
            "1.4.1",
            1,
            1,
            ClusterOrder.PRIORITY,
            2000
        );
        regTest.addServer("127.0.0.1", 60003, ElectrumTransport.WS.Scheme, false);

        let provider = new ElectrumNetworkProvider("regtest", regTest, false);
        await delay(1000)
        let wallet = await provider.getUtxos(alice.getDepositAddress());
        let stub = wallet.pop();
        
        let futures = wallet.filter(u => u.token).filter( u => u.token.category == tokenId)
        let requests = futures.map(u => {
            return {
                locktime: 100,
                future: u
            }
        })

        let vaults = await alice.getVaultUtxoMap(requests, provider)
        let state = {
            chain: [],
            provider: provider,
            vaults: vaults,
            requests: requests,
            wallet: wallet,
            walletStub: stub,
        };

        let finalState = await alice.swapFnRaw(state)


        await delay(2000)
        //let utxos = await alice.getUtxos()
        //console.log(utxos)
        await alice.sendMax(bob.getDepositAddress())
        let aliceTokens = await alice.getAllTokenBalances()
        expect(await bob.getBalance('sats')).toBeGreaterThan(1_123_120_000 - 360_002_000)
    });
})