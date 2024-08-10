import { gantryArtifact } from '../src/';
import { vaultArtifact } from '../src/';
import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import { TokenSendRequest, NFTCapability } from 'mainnet-js';
import { Contract, ElectrumNetworkProvider, randomNFT } from 'cashscript';
import {
    binToHex,
    bigIntToVmNumber
} from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';
import { getAnAliceWallet } from "./aliceWalletTest";



describe('test example contract functions', () => {
    it('should mint tokens to a valid vault from a gantry contract', async () => {
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
        const alice = await getAnAliceWallet(2_000_000)

        // Gantry args:
        //
        // bytes tokenCategory, 
        // bytes stepBytes, 
        // bytes vaultUnlockingBytecode

        // The nft commitment carries the current locktime
        let o1 = 4001n;


        let batonResponse = await alice.tokenGenesis({
            commitment: "6e000000",             // NFT Commitment message
            capability: NFTCapability.mutable, // NFT capability
            value: 1000,                    // Satoshi value
        })

        let baton = randomNFT({
            amount: 0n,
            category: batonResponse.tokenIds![0],
            nft: {
                commitment: '6e000000', // 120
                capability: 'mutable'
            }
        })

        let updatedBaton = randomNFT({
            amount: 0n,
            category: batonResponse.tokenIds![0],
            nft: {
                commitment: '78000000', // 120
                capability: 'mutable'
            }
        })


        let step = 10n

        let locktime = 110n;
        const tmpVault = new Contract(
            vaultArtifact,
            [locktime],
            { provider }
        )

        const contract = new Contract(
            gantryArtifact,
            [
                step, // 10
                tmpVault.bytecode.slice(4)
            ],
            { provider }
        );


        // fund the contract
        await alice.send([
            new TokenSendRequest({
                cashaddr: contract.tokenAddress,
                value: 100000,
                tokenId: baton.category,
                capability: NFTCapability.mutable,
                commitment: "6e000000"
            }),
        ]);

        let utxo = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category === baton.category)[0]

        const vault = new Contract(
            vaultArtifact,
            [locktime],
            { provider }
        )

        // console.log(JSON.stringify(vault))
        // let vaultLock = cashAddressToLockingBytecode( vault.tokenAddress)
        // if(typeof vaultLock === "string") throw vaultLock
        // console.log(binToHex(vaultLock.bytecode))

        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withoutTokenChange()
            .withoutChange()
            .to(
                [
                    {
                        to: contract.tokenAddress,
                        amount: utxo.satoshis-8500n,
                        token: updatedBaton
                    },
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 1
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 2
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 3
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 4
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 5
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 6
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } }, // 7
                ]
            )
            //
            // 6a 04 46424348 01 6e000000 
            .withOpReturn([
                "FBCH",
                "0x" + binToHex(bigIntToVmNumber(locktime))
            ]).send();
        expect(transaction).resolves.not.toThrow();
        let tx = await transaction
        expect(binToHex(tx.outputs.slice(-1)[0].lockingBytecode)).toMatch("6a0446424348016e");
        expect(tx.outputs.length).toBe(9);
    });

});
