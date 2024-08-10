import { gantryArtifact } from '../src/';
import { vaultArtifact } from '../src/';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT, FailedTransactionError } from 'cashscript';
import { scriptToBytecode } from "@cashscript/utils";
import {
    binToHex,
    bigIntToVmNumber
} from "@bitauth/libauth";
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

        let step = 10n

        let txId = "24faf3f715e35a5bc7efa383135b1a55249e0cc2bf2512972e3b7ba5cfa08742"
        let locktime = 110n;
        const vault = new Contract(
            vaultArtifact,
            [locktime],
            { provider }
        )
        const contract = new Contract(
            gantryArtifact,
            [
                step, // 10
                vault.bytecode.slice(4)
            ],
            { provider }
        );

        binToHex(scriptToBytecode(contract.redeemScript))

        provider.addUtxo(contract.tokenAddress, randomUtxo({
            txid: txId,
            satoshis: 100000n,
            vout: 0,
            token: baton,
        }));

        let utxo = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category === baton.category)[0]

        let transaction = await contract.functions
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
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 1
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 2
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 3
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 4
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 5
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 6
                    { to: vault.tokenAddress, amount: 1000n, token: { amount: BigInt(21e14), category: utxo.txid } },// 7

                ]
            ).withOpReturn([
                "FBCH",
                "0x" + binToHex(bigIntToVmNumber(locktime))
            ]).send();
        // 0x6a 04 534d5030 02 1000 04 46424348 04 6e000000
        //   6a 04 534d5030 02 1000 04 46424348 04 6e000000 01 08
        //console.log(await transaction)
        expect(transaction.outputs.length).toBe(9);
    });
});
