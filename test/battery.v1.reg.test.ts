import { artifact } from '../contracts/battery.v1.js';
import { artifact as gantryArtifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import { RegTestWallet, TokenSendRequest, NFTCapability } from "mainnet-js";
import { Contract, randomUtxo, randomNFT, FailedTransactionError, ElectrumNetworkProvider } from 'cashscript';
import {
    binToHex, hexToBin,
    cashAssemblyToBin,
    lockingBytecodeToCashAddress, numberToBinUint32LEClamped, swapEndianness
} from "@bitauth/libauth";

import { getAnAliceWallet } from "./aliceWalletTest.js";

const to32LE = numberToBinUint32LEClamped;

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

        const alice = await getAnAliceWallet(2_000_000)

        let step = 1000000;
        // convert locktime to LE Byte4
        let stepBytes = to32LE(step);

        let batonResponse = await alice.tokenGenesis({
            commitment: binToHex(stepBytes),             // NFT Commitment message
            capability: NFTCapability.minting, // NFT capability
            value: 100000,                     // Satoshi value
        })

        let baton = randomNFT({
            amount: 0n,
            category: batonResponse.tokenIds![0],
            nft: {
                commitment: binToHex(stepBytes), // 120
                capability: 'minting'
            }
        })

        let batonReverse = swapEndianness(baton.category);

        let locktime = 110;
        // convert locktime to LE Byte4
        let locktimeBytes = to32LE(locktime);
        const vault = new Contract(
            vaultArtifact,
            [
                locktimeBytes,
                batonReverse
            ],
            { provider }
        )


        let tmpGantry = new Contract(gantryArtifact, [batonReverse, stepBytes, vault.bytecode.slice(76)], { provider });
        const contract = new Contract(artifact, [99n, 200n, tmpGantry.bytecode.slice(194), vault.bytecode.slice(76)], { provider });

        // fund the contract
        await alice.send([
            new TokenSendRequest({
                cashaddr: contract.tokenAddress,
                value: 1000000,
                tokenId: baton.category,
                capability: NFTCapability.minting,
                commitment: binToHex(stepBytes)
            }),
        ]);

        let currentTime = await provider.getBlockHeight()

        while (step > 99) {

            let stepBytes = to32LE(step);
            let gantry = new Contract(gantryArtifact, [batonReverse, stepBytes, vault.bytecode.slice(76)], { provider });
            let utxo = (await provider.getUtxos(contract.tokenAddress))[0]
            let nextExpiration = currentTime - (currentTime % step) + step;
            let transaction = contract.functions
                .execute()
                .from(utxo)
                .withTime(210)
                .to(
                    [

                        {
                            to: contract.tokenAddress,
                            amount: utxo.satoshis - 1900n,
                            token: randomNFT({
                                amount: 0n,
                                category: baton.category,
                                nft: {
                                    commitment: binToHex(to32LE(step / 10)),
                                    capability: 'minting'
                                }
                            })
                        },
                        {
                            to: gantry.tokenAddress,
                            amount: 1000n,
                            token: randomNFT({
                                amount: 0n,
                                category: baton.category,
                                nft: {
                                    commitment: binToHex(to32LE(nextExpiration)),
                                    capability: 'none'
                                }
                            })
                        }
                    ]
                ).send();
            await expect(transaction).resolves.not.toThrow();
            step /= 10;

        }

        let utxo = (await provider.getUtxos(contract.tokenAddress))[0]
        let nextExpiration = currentTime - (currentTime % step) + step;
        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withTime(210)
            .to(
                [{
                    //@ts-ignore
                    to: hexToBin("6a"),
                    amount: utxo.satoshis - 1900n,
                    token: randomNFT({
                        amount: 0n,
                        category: baton.category,
                        nft: {
                            commitment: binToHex(to32LE(nextExpiration)),
                            capability: 'none'
                        }
                    })
                }]
            ).send();
        await expect(transaction).resolves.not.toThrow();

    });
});
