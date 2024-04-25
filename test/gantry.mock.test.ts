import { artifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT } from 'cashscript';
import { scriptToBytecode } from "@cashscript/utils";
import { binToHex, 
    cashAddressToLockingBytecode, 
    isPayToScriptHash32, 
    hexToBin,
    numberToBinUint32LEClamped,
    swapEndianness
 } from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';


const to32LE = numberToBinUint32LEClamped;


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
                commitment: "6e000000", // 110
                capability: "mutable"
            },
        })
        let updatedBaton = randomNFT({
            amount: 0n,
            category: baton.category,
            nft: {
                commitment: '78000000', // 120
                capability: 'mutable'
            }
        })

        let catReversed = swapEndianness(baton.category);

        let step = 10
        // convert locktime to LE Byte4
        let stepBytes = to32LE(step);

        let txId = "24faf3f715e35a5bc7efa383135b1a55249e0cc2bf2512972e3b7ba5cfa08742"
        const tokenIdUnRev = swapEndianness(txId);
        let locktime = 110;
        // convert locktime to LE Byte4
        let locktimeBytes = to32LE(locktime);
        const vault = new Contract(
            vaultArtifact,
            [
                locktimeBytes,
                tokenIdUnRev
            ],
            { provider }
        )
        const contract = new Contract(
            artifact,
            [
                catReversed,
                stepBytes, // 10
                vault.bytecode.slice(76)
            ],
            { provider }
        );

        binToHex(scriptToBytecode(contract.redeemScript))

        provider.addUtxo(contract.tokenAddress, randomUtxo({
            txid: txId,
            satoshis: i0,
            vout: 0,
            token: baton,
        }));

        let utxo = (await provider.getUtxos(contract.tokenAddress))[0]

        let transaction = contract.functions
            .execute()
            .from(utxo)
            .withoutTokenChange()
            .to(
                [
                    {
                        to: vault.tokenAddress,
                        amount: 5000n,
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
