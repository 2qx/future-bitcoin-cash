import { artifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import { RegTestWallet, TokenSendRequest, NFTCapability } from "mainnet-js";
import { Contract, ElectrumNetworkProvider, randomUtxo, randomNFT, FailedTransactionError } from 'cashscript';
import {
    binToHex,
    numberToBinUint32LEClamped,
    swapEndianness
} from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';
import { getAnAliceWallet } from "./aliceWalletTest.js";

const to32LE = numberToBinUint32LEClamped;


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


        let step = 10
        // convert locktime to LE Byte4
        let stepBytes = to32LE(step);
        let txId = "0000000000000000000000000000000000000000bf2512972e3b7ba5cfa08742"

        const tokenIdUnRev = swapEndianness(batonResponse.tokenIds![0]);
        // const tokenIdUnRev = batonResponse.tokenIds![0];
        
        let locktime = 110;
        // convert locktime to LE Byte4
        let locktimeBytes = to32LE(locktime);
        const tmpVault = new Contract(
            vaultArtifact,
            [
                locktimeBytes,
                txId
            ],
            { provider }
        )
        
        const contract = new Contract(
            artifact,
            [
                tokenIdUnRev,
                stepBytes, // 10
                tmpVault.bytecode.slice(76)
            ],
            { provider }
        );


        // fund the contract
        await alice.send([
            new TokenSendRequest({
                cashaddr: contract.tokenAddress,
                value: 100000,
                tokenId:  baton.category,
                capability: NFTCapability.mutable,
                commitment: "6e000000"
            }),
        ]);
        
        let utxo = (await provider.getUtxos(contract.tokenAddress))[0]


        const vault = new Contract(
            vaultArtifact,
            [
                locktimeBytes,
                swapEndianness(utxo.txid)
            ],
            { provider }
        )




        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withoutTokenChange()
            .withoutChange()
            .to(
                [
                    {
                        to: contract.tokenAddress,
                        amount: o1,
                        token: updatedBaton
                    },
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 300000000000000n, category: utxo.txid } }, // 1
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 300000000000000n, category: utxo.txid } }, // 2
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 300000000000000n, category: utxo.txid } }, // 3
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 300000000000000n, category: utxo.txid } }, // 4
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 300000000000000n, category: utxo.txid } }, // 5
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 300000000000000n, category: utxo.txid } }, // 6
                    {
                        to: vault.tokenAddress,
                        amount: 1000n,
                        token: {
                            amount: 300000000000000n,
                            category: utxo.txid,
                            nft: {
                                commitment: "",
                                capability: "none"
                            }
                        }
                    },// 7

                ]
            )
            //
            // 6a 04 534d5030 02 1000 04 46424348 04 6e000000 01 08
            .withOpReturn([
                "SMP0",
                "0x1000",
                "FBCH",
                "0x" + binToHex(locktimeBytes),
                "0x08"
            ]).send();

        console.log((await transaction).outputs)
        expect(transaction).resolves.not.toThrow();
    });
});
