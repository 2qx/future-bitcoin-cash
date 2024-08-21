import { batteryArtifact } from '../src/';
import { gantryArtifact } from '../src/';
import { vaultArtifact } from '../src/';

import { TokenSendRequest, NFTCapability, OpReturnData, Wallet, TestNetWallet } from "mainnet-js";
import { Contract, randomNFT, ElectrumNetworkProvider } from 'cashscript';
import {
    binToHex, hexToBin, utf8ToBin,
    numberToBinUint32LEClamped,
    swapEndianness,
    hash256
} from "@bitauth/libauth";

const to32LE = numberToBinUint32LEClamped;

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var stringLength = 19;

function pickRandom() {
    return possible[Math.floor(Math.random() * possible.length)];
}


describe('test example contract functions', () => {
    it.skip('should cat balance', async () => {
        const alice = await Wallet.fromId(process.env["FBCH_ID"]!);
        console.log(await alice.getBalance());
        console.log(await alice.getTokenUtxos());
        console.log(await alice.getTokenDepositAddress());
    });
    it.skip('should allow execution of a battery contract', async () => {


        const LAST_HEIGHT = 857000n
        const alice = await Wallet.fromId(process.env["FBCH_ID"]!);
        let provider = new ElectrumNetworkProvider();        

        // const LAST_HEIGHT = 212000n
        // const alice = await TestNetWallet.fromId(process.env["tFBCH_ID"]!);
        // let provider = new ElectrumNetworkProvider("chipnet");

        var randomString = Array.from({ length: stringLength }, pickRandom).join('');


        let step = 1_000_000n;
        
        // // convert locktime to LE Byte4
        let stepBytes = to32LE(Number(step));

        let unsigned = await alice.send(
            [
                {
                    cashaddr: alice.getDepositAddress(),
                    value: 47235000,
                    unit: 'sats',
                },
                OpReturnData.from("FBCH-"+randomString)
            ]
            , { buildUnsigned: true })

        let hash = ""
        const vanity = "fbc0"
        let signedTx = hexToBin("")

        //4FJGyVzxb46zn8EWYrd
        
        while (swapEndianness(hash).slice(0, vanity.length) !== vanity) {
            randomString = Array.from({ length: stringLength }, pickRandom).join('');
            let i = unsigned.unsignedTransaction.indexOf("6a1846424348")
            unsigned.unsignedTransaction = unsigned.unsignedTransaction.substring(0, i) +
                "6a1846424348" + binToHex(utf8ToBin("-" + "4FJGyVzxb46zn8EWYrd")) +
                unsigned.unsignedTransaction.substring(i+52)
            
            signedTx = await alice.signUnsignedTransaction(unsigned.unsignedTransaction!, unsigned.sourceOutputs!)
            hash = binToHex(hash256(signedTx))
            if (swapEndianness(hash).slice(0, 3) == "fbc") console.log(swapEndianness(hash), randomString)
        }
        console.log(binToHex(signedTx))
        console.log(randomString)
        await alice.submitTransaction(signedTx)
        let batonResponse = await alice.tokenGenesis({
            commitment: binToHex(stepBytes),            // NFT Commitment message
            capability: NFTCapability.minting,          // NFT capability
            value: 47234000,                              // Satoshi value
        })
        console.log(batonResponse)

        let batonCategory = swapEndianness(hash)

        let dummyLockTime = 110n;
        const vaultInstance = new Contract(
            vaultArtifact,
            [dummyLockTime],
            { provider }
        )
        let vaultBytecode = vaultInstance.bytecode.slice(4)
        let tmpGantry = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
        let gantryBytecode = tmpGantry.bytecode.slice(8 + vaultBytecode.length + 2)
        const contract = new Contract(batteryArtifact, [1000n, LAST_HEIGHT, gantryBytecode, vaultBytecode], { provider });
        console.log(contract.address)
        console.log(contract.tokenAddress)

        // fund the contract
        await delay(1000);
        let tx = await alice.send([
            new TokenSendRequest({
                cashaddr: contract.tokenAddress,
                value: 47233000,
                tokenId: batonCategory,
                capability: NFTCapability.minting,
                commitment: binToHex(stepBytes)
            }),
        ]);
        await delay(1000);
        let currentTime = Number(LAST_HEIGHT)
        
        while (step > 1000n) {
            await delay(1000);
            let gantryInstance = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
            let utxo = (await contract.getUtxos()).filter(u => u.token.category == batonCategory)[0]
            let nextExpiration = currentTime - (currentTime % Number(step)) + Number(step);

            let gantryAmount = 42500000000n/step + 2n
            let transaction = contract.functions
                .execute()
                .from(utxo)
                .withTime(Number(LAST_HEIGHT))
                .withoutChange()
                .withoutTokenChange()
                .to(
                    [
                        {
                            to: gantryInstance.tokenAddress,
                            amount: gantryAmount,
                            token: randomNFT({
                                amount: 0n,
                                category: batonCategory,
                                nft: {
                                    commitment: binToHex(to32LE(nextExpiration)),
                                    capability: 'mutable'
                                }
                            })
                        },
                        {
                            to: contract.tokenAddress,
                            amount: utxo.satoshis - (gantryAmount + 1500n),
                            token: randomNFT({
                                amount: 0n,
                                category: batonCategory,
                                nft: {
                                    commitment: binToHex(to32LE(Number(step) / 10)),
                                    capability: 'minting'
                                }
                            })
                        }
                        
                    ]
                ).send();
            await expect(transaction).resolves.not.toThrow();
            step /= 10n;

        }

        await delay(2000)
        let utxo = (await contract.getUtxos()).filter(u => u.token!.category == batonCategory)[0]
        expect(utxo.token.category).toBe(batonCategory)
        let gantryInstance = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
        let nextExpiration = currentTime - (currentTime % Number(step)) + Number(step);
        let gantryAmount = 42500000000n/step + 2n
        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withoutChange()
            .withoutTokenChange()
            .withTime(Number(LAST_HEIGHT))
            .to(
                [
                    {
                        to: gantryInstance.tokenAddress,
                        amount: gantryAmount,
                        token: randomNFT({
                            amount: 0n,
                            category: batonCategory,
                            nft: {
                                commitment: binToHex(to32LE(nextExpiration)),
                                capability: 'mutable'
                            }
                        })
                    },
                    {
                        to: contract.address,
                        amount: utxo.satoshis - (gantryAmount + 1500n)
                    }                    
                ]
            ).send();
        await expect(transaction).resolves.not.toThrow();

    });
});
