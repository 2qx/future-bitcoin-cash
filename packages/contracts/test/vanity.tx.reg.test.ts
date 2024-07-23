import { batteryArtifact } from '../src/';
import { gantryArtifact } from '../src/';
import { vaultArtifact } from '../src/';
import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import { TokenSendRequest, NFTCapability, OpReturnData } from "mainnet-js";
import { Contract, randomNFT, ElectrumNetworkProvider } from 'cashscript';
import {
    binToHex, hexToBin,
    numberToBinUint32LEClamped,
    hash256
} from "@bitauth/libauth";

import { getAnAliceWallet } from "./aliceWalletTest";

const to32LE = numberToBinUint32LEClamped;

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

describe('test example contract functions', () => {
    it('should allow execution of a battery contract', async () => {


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

        const alice = await getAnAliceWallet(2_010_000)

        let step = 1000000n;
        // convert locktime to LE Byte4
        let stepBytes = to32LE(Number(step));
        let unsigned = await alice.send(
            [
                {
                    cashaddr: alice.getDepositAddress(),
                    value: 2_000_000,
                    unit: 'sats',
                },
                OpReturnData.from((Math.random() * 1e8).toString())
            ]
            , { buildUnsigned: true })

        let hash = ""
        const vanity = "f0"
        let signedTx = hexToBin("")
        while (hash.slice(0, vanity.length) !== vanity) {
            unsigned = await alice.send(
                [
                    {
                        cashaddr: alice.getDepositAddress(),
                        value: 2_000_000,
                        unit: 'sats',
                    },
                    OpReturnData.from((Math.random() * 1e8).toString())
                ],
                { buildUnsigned: true })

            signedTx = await alice.signUnsignedTransaction(unsigned.unsignedTransaction!, unsigned.sourceOutputs!)

            hash = binToHex(hash256(signedTx))
        }
        await alice.submitTransaction(signedTx)
        let batonResponse = await alice.tokenGenesis({
            commitment: binToHex(stepBytes),            // NFT Commitment message
            capability: NFTCapability.minting,          // NFT capability
            value: 100000,                              // Satoshi value
        })

        let baton = randomNFT({
            amount: 0n,
            category: batonResponse.tokenIds![0],
            nft: {
                commitment: binToHex(stepBytes), // 120
                capability: 'minting'
            }
        })

        let locktime = 110n;
        const vaultInstance = new Contract(
            vaultArtifact,
            [locktime],
            { provider }
        )
        let vaultBytecode = vaultInstance.bytecode.slice(4)
        let tmpGantry = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
        let gantryBytecode = tmpGantry.bytecode.slice(8 + vaultBytecode.length + 2)
        const contract = new Contract(batteryArtifact, [100n, 200n, gantryBytecode, vaultBytecode], { provider });

        // fund the contract
        let tx = await alice.send([
            new TokenSendRequest({
                cashaddr: contract.tokenAddress,
                value: 1000000,
                tokenId: baton.category,
                capability: NFTCapability.minting,
                commitment: binToHex(stepBytes)
            }),
        ]);
        await delay(1000);
        let currentTime = await provider.getBlockHeight()

        while (step > 100n) {

            let gantryInstance = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
            let utxo = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category === baton.category)[0]
            let nextExpiration = currentTime - (currentTime % Number(step)) + Number(step);
            let transaction = contract.functions
                .execute()
                .from(utxo)
                .withTime(210)
                .to(
                    [
                        {
                            to: contract.tokenAddress,
                            amount: utxo.satoshis - 1500n,
                            token: randomNFT({
                                amount: 0n,
                                category: baton.category,
                                nft: {
                                    commitment: binToHex(to32LE(Number(step) / 10)),
                                    capability: 'minting'
                                }
                            })
                        },
                        {
                            to: gantryInstance.tokenAddress,
                            amount: 800n,
                            token: randomNFT({
                                amount: 0n,
                                category: baton.category,
                                nft: {
                                    commitment: binToHex(to32LE(nextExpiration)),
                                    capability: 'mutable'
                                }
                            })
                        }
                    ]
                ).send();
            await expect(transaction).resolves.not.toThrow();
            step /= 10n;

        }
        await delay(2000)
        let utxo = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category === baton.category)[0]
        console.log(utxo)
        
        expect(utxo.token.category).toBe(baton.category)
        let gantryInstance = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
        let nextExpiration = currentTime - (currentTime % Number(step)) + Number(step);
        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withTime(210)
            .to(
                [
                    {
                        to: contract.address,
                        amount: utxo.satoshis - 1500n
                    },
                    {
                        to: gantryInstance.tokenAddress,
                        amount: 800n,
                        token: randomNFT({
                            amount: 0n,
                            category: baton.category,
                            nft: {
                                commitment: binToHex(to32LE(nextExpiration)),
                                capability: 'mutable'
                            }
                        })
                    }
                ]
            ).send();
        await expect(transaction).resolves.not.toThrow();

    });
});
