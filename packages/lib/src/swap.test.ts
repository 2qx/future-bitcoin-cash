import { binToHex, CashAddressNetworkPrefix, encodeTransactionBCH } from "@bitauth/libauth";
import { regTx } from "./swap.vector";
import { decodeTransaction, hexToBin } from "@bitauth/libauth";
import { getAnAliceWallet } from "../../../script/aliceWalletTest"
import { RegTestWallet, SendRequest, TokenSendRequest } from "mainnet-js";
import { swap } from "./swap"
import { Vault } from "./vault"

describe('test example contract functions', () => {

    // test("Should swap coins for tokens on regtest", async () => {

    //     let vector = decodeTransaction(hexToBin(regTx))
    //     if (vector === "string") throw vector

        
    //     const alice = await getAnAliceWallet(2_000_010_000)

    //     let height = await alice.provider!.getBlockHeight();

    //     let vaultAddr = Vault.getSeries(height, 2, 1, CashAddressNetworkPrefix.regtest)[0]
    //     let couponAddr = Vault.getCouponSeries(height, 1e8, 2, 1, CashAddressNetworkPrefix.regtest)[0]

    //     let guessTokenId = (await alice.getUtxos())[0].txid
    //     const genesisResponse = await alice.tokenGenesis({
    //         // token UTXO recipient, if not specified will default to sender's address
    //         cashaddr: alice.getTokenDepositAddress()!,
    //         amount: 2100000000000000n,        // fungible token amount
    //         commitment: "abcd",             // NFT Commitment message
    //         value: 10000,                    // Satoshi value
    //     });

    //     const tokenId = genesisResponse.tokenIds![0];
    //     // fund the contract
    //     await alice.send([
    //         new TokenSendRequest({
    //             cashaddr: vaultAddr,
    //             value: 1000,
    //             tokenId: tokenId,
    //             amount: 2100000000000000n
    //         }),
    //         new SendRequest({
    //             cashaddr: couponAddr,
    //             value: 100000,
    //             unit: 'sat'
    //         })
    //     ]);

    //     let vault = await RegTestWallet.watchOnly(vaultAddr)
    //     let coupon = await RegTestWallet.watchOnly(couponAddr)
    //     let state = {
    //         placement: 10000,
    //         locktime: 205000,
    //         wallet: (await alice.getUtxos()),
    //         vault: [(await vault.getUtxos())[0]],
    //         coupons: [(await coupon.getUtxos())[0]],
    //         chain: []
    //     }
    //     let aliceUtxos = (await alice.getUtxos());
    //     let placement = swap(state);
    //     expect(binToHex(encodeTransactionBCH(placement.chain![0]!))).toBe(regTx)
    //     placement.chain!.map( tx => {
    //         alice.provider?.sendRawTransaction(binToHex(encodeTransactionBCH(tx)), false)
    //     })
        
    // });


    test("Should swap coins for tokens on regtest", async () => {

        let vector = decodeTransaction(hexToBin(regTx))
        if (vector === "string") throw vector

        
        const alice = await getAnAliceWallet(2_000_010_000)

        let height = await alice.provider!.getBlockHeight();

        let vaultAddr = Vault.getAddress(300, CashAddressNetworkPrefix.regtest)
        let couponAddr = Vault.getCoupon(1e8, 300, CashAddressNetworkPrefix.regtest)


        const genesisResponse = await alice.tokenGenesis({
            // token UTXO recipient, if not specified will default to sender's address
            cashaddr: alice.getTokenDepositAddress()!,
            amount: 2100000000000000n,        // fungible token amount
            commitment: "abcd",             // NFT Commitment message
            value: 10000,                    // Satoshi value
        });

        const tokenId = genesisResponse.tokenIds![0];
        // fund the contract
        await alice.send([
            new TokenSendRequest({
                cashaddr: vaultAddr,
                value: 1000,
                tokenId: tokenId,
                amount: 2100000000000000n
            }),
            new SendRequest({
                cashaddr: couponAddr,
                value: 100000,
                unit: 'sat'
            })
        ]);

        let vault = await RegTestWallet.watchOnly(vaultAddr)
        let coupon = await RegTestWallet.watchOnly(couponAddr)
        let state = {
            placement: 1e8,
            locktime: 300,
            wallet: (await alice.getUtxos()),
            vault: (await vault.getUtxos())[0],
            coupons: [(await coupon.getUtxos())[0]],
            chain: []
        }
        console.log(state)
        let placement = swap(state);
        expect(binToHex(encodeTransactionBCH(placement.chain![0]!))).toBe(regTx)
        placement.chain!.map( tx => {
            alice.provider?.sendRawTransaction(binToHex(encodeTransactionBCH(tx)), false)
        })
        
    });
});