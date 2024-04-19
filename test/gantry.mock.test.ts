import { artifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT } from 'cashscript';
import { binToHex, hexToBin } from "@bitauth/libauth";
import  { deriveLockingBytecode } from "../src/util.js";
import 'cashscript/dist/test/JestExtensions.js';

describe('test example contract functions', () => {
    it('should mint tokens to a valid vault from a gantry contract', async () => {
        const provider = new MockNetworkProvider();

        // Gantry args:
        //
        // bytes tokenCategory, 
        // bytes stepBytes, 
        // bytes vaultUnlockingBytecode

        // The nft commitment carries the current locktime

        let i0 = 9999n;
        let o0 = 1000n;
        let o1 = 4001n;

        let baton = randomNFT({
            amount: 0n,
            nft: {
                commitment: "6e", // 110
                capability: "mutable"
            },
        })
        let updatedBaton = randomNFT({
            amount: 0n,
            category: baton.category,
            nft: {
                commitment: '78', // 120
                capability: 'mutable'
            }
        })

        let catReversed = binToHex(hexToBin(baton.category).reverse())
        
        console.log(catReversed)
        const contract = new Contract(
            artifact,
            [
                catReversed,
                hexToBin("a"), // 10
                hexToBin("00d000d394537a637881b17551ce53798800d0009d00c678a2696700ce53798851d0009d00cc78a2696800cd02aa20c1aa7e01877e88c0cdc0c788c0d0c0c693c0d3c0cc939c777777")
            ],
            { provider }
        );
        let txId = "24faf3f715e35a5bc7efa383135b1a55249e0cc2bf2512972e3b7ba5cfa08742"
        provider.addUtxo(contract.address, randomUtxo({
            txid: txId,
            satoshis: i0,
            vout: 0,
            token: baton,
        }));

        let utxo = (await provider.getUtxos(contract.address))[0]

        const tokenIdUnRev = binToHex(hexToBin(txId).reverse());
        let locktime = 110;
        // convert locktime to LE Byte4
        let locktimeBytes = hexToBin(("0000000000" + locktime.toString(16)).slice(-8)).reverse();
        const vault = new Contract(
            vaultArtifact,
            [
                locktimeBytes, 
                tokenIdUnRev
            ],
            { provider }
        )

        console.log(tokenIdUnRev);
        console.log(vault.bytecode);
        console.log(binToHex(deriveLockingBytecode(vault.address)));
        console.log(vault.address);

        
        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withTime(100)
            .withoutTokenChange()
            .to(
                [
                    {
                        to: vault.tokenAddress,
                        amount: 1000n,
                        token: {
                            amount: 2100000000000000n,
                            category: utxo.txid
                        }
                    },
                    {
                        to: contract.tokenAddress,
                        amount: o1,
                        token: updatedBaton
                    }
                ]
            );
        await expect(transaction.send()).resolves.not.toThrow();
    });
});
