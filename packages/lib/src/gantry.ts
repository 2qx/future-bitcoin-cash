import {
    encodeDataPush,
    hash256,
    bigIntToVmNumber,
    CashAddressNetworkPrefix,
    hexToBin,
    binToHex,
    lockingBytecodeToCashAddress,
    swapEndianness,
    numberToBinUint32LEClamped,
    binToNumberInt32LE

} from "@bitauth/libauth";

import { gantryArtifact } from "@fbch/contracts";
import { Vault } from "./vault"
import { Contract, ElectrumNetworkProvider, Network } from "cashscript";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const to32LE = numberToBinUint32LEClamped;
const from32LE = binToNumberInt32LE;

export class Gantry {

    step: number;

    public static category = "fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46";

    public static unlockingScript = "c0009dc0c7c0cd88c0cec0d188c0ccc0c6023421949dc0cf81c0d278537993548088767b965a97009c63c4519d67768277787e52797e02aa2078aa7e01877e51cd788851d100c88851d2008851d3070040075af075079d51cc02e8039d52cd788852d100c88852d2008852d3070040075af075079d52cc02e8039d53cd788853d100c88853d2008853d3070040075af075079d53cc02e8039d54cd788854d100c88854d2008854d3070040075af075079d54cc02e8039d55cd788855d100c88855d2008855d3070040075af075079d55cc02e8039d56cd788856d100c88856d2008856d3070040075af075079d56cc02e8039d57cd788857d100c88857d2008857d3070040075af075079d57cc02e8039d58cd066a0446424348547982777e54797e8858d1008858cc009dc4599d6d686d51";

    static getLockingBytecodeSet(start, num) {
        let steps = [...Array(num).keys()].map((x, i) => start * 10 ** -i);
        let locks = steps.map(step => binToHex(Gantry.getLockingBytecode(step, Vault.unlockingScript)));
        return new Set(locks)
    }

    /**
     * Return the unlockingBytecode for a Gantry
     *
     *
     * @param step - the threshold amount (sats) to redeem coupon
     * @param vaultBytecode - the vault locking bytecode
     */
    static getUnlockingBytecode(step: number, vaultBytecode: Uint8Array | string) {
        const stepVm = encodeDataPush(bigIntToVmNumber(BigInt(step)))
        if (typeof vaultBytecode === "string") vaultBytecode = hexToBin(vaultBytecode)
        const vaultVm = encodeDataPush(vaultBytecode)
        const unlockingScript = hexToBin(this.unlockingScript)
        return new Uint8Array(
            [
                ...vaultVm,
                ...stepVm,
                ...unlockingScript
            ]
        )
    }

    /**
    * Return the lockingBytecode for a Gantry
    *
    *
    * @param step - 
    * @param vaultBytecode - the Vault locking bytecode
    */
    static getLockingBytecode(step: number, vaultBytecode: Uint8Array | string) {
        if (typeof vaultBytecode === "string") vaultBytecode = hexToBin(vaultBytecode)
        return new Uint8Array(
            [
                ...hexToBin("aa20"),
                ...hash256(this.getUnlockingBytecode(step, vaultBytecode)),
                ...hexToBin("87")
            ]
        );
    }


    /**
     * Return the token address for a Vault
     *
     *
     * @param step - block time of the vault lock
     * @param network - cashaddress network prefix
     */
    static getAddress(step: number, network = CashAddressNetworkPrefix.mainnet, tokenSupport = true) {

        let lockingBytecode = this.getLockingBytecode(step, Vault.unlockingScript);
        let addr = lockingBytecodeToCashAddress(lockingBytecode, network, { tokenSupport: tokenSupport })
        if (typeof addr !== 'string') throw (addr)
        return addr
    }


    static async step(step: bigint, provider: ElectrumNetworkProvider) {

        let contract = new Contract(gantryArtifact, [step, Vault.unlockingScript], { provider })
        let utxo = (await provider.getUtxos(contract.tokenAddress))[0]
        let to = []
        console.log(utxo)
        let baton = utxo.token
        let updatedBaton = { ...baton }
        let category = utxo.txid
        let currentVault = from32LE(hexToBin(baton.nft!.commitment))
        let nextExpiration = currentVault + Number(step)
        console.log("step:", nextExpiration)
        updatedBaton = {
            amount: 0n,
            category: baton.category,
            nft: {
                capability: baton.nft.capability,
                commitment: binToHex(to32LE(nextExpiration))
            }
        }
        let prefix = provider.network == "mainnet" ? "bitcoincash" : "bchtest"
        let vaultAddress = Vault.getAddress(currentVault, prefix as CashAddressNetworkPrefix)

        if ((currentVault / Number(step)) % 10 != 0) {
            to = [
                {
                    to: contract.tokenAddress,
                    amount: utxo.satoshis - 8500n,
                    token: updatedBaton
                },
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 1
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 2
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 3
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 4
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 5
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 6
                { to: vaultAddress, amount: 1000n, token: { amount: BigInt(21e14), category: category } }, // 7
            ]
        } else {
            to = [
                {
                    to: contract.tokenAddress,
                    amount: utxo.satoshis - 8500n,
                    token: updatedBaton
                }
            ]
        }
        let fn = contract.functions
            .execute()
            .from(utxo)
            .withoutTokenChange()
            .withoutChange()
            .to(to)
        if ((currentVault / Number(step)) % 10 != 0) {
            fn = fn
                // broadcast creation of the tokens
                // 6a 04 46424348 04 6e000000
                .withOpReturn([
                    "FBCH",
                    "0x" + binToHex(bigIntToVmNumber(BigInt(currentVault)))
                ])
        }
        let tx = await fn.send();
        await delay(2000);

    }
}