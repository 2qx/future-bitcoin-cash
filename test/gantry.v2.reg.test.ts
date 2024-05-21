import { artifact } from '../contracts/gantry.v2.js';
import { artifact as vaultArtifact } from '../contracts/vault.v2.js';
import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import { RegTestWallet, TokenSendRequest, NFTCapability } from "mainnet-js";
import { Contract, ElectrumNetworkProvider, randomUtxo, randomNFT, FailedTransactionError } from 'cashscript';
import {
    binToHex,
    cashAddressToLockingBytecode,
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


        let step = 10n

        let locktime = 110n;
        const tmpVault = new Contract(
            vaultArtifact,
            [locktime],
            { provider }
        )

        const contract = new Contract(
            artifact,
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
                tokenId:  baton.category,
                capability: NFTCapability.mutable,
                commitment: "6e000000"
            }),
        ]);
        
        let utxo = (await provider.getUtxos(contract.tokenAddress))[0]


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
                        amount: o1,
                        token: updatedBaton
                    },
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 700000000000000n, category: utxo.txid } }, // 1
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 700000000000000n, category: utxo.txid } }, // 2
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: 700000000000000n, category: utxo.txid } }, // 3

                ]
            )
            //
            // 6a 04 534d5030 02 1000 04 46424348 04 6e000000 01 08
            .withOpReturn([
                "SMP0",
                "0x1000",
                "FBCH",
                "0x" + binToHex(to32LE(Number(locktime))),
                "0x08"
            ]).send();

        expect((await transaction).outputs.length).toBe(5);
        expect(transaction).resolves.not.toThrow();
    });
});
