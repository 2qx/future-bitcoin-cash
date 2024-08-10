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
    static category: "fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46"

    static async step(step: bigint, provider: ElectrumNetworkProvider) {

        let contract = new Contract(gantryArtifact, [step, Vault.lockingScript], { provider })
        let utxo = (await provider.getUtxos(contract.tokenAddress))[0]
        let to = []
        console.log(utxo)
        let baton = utxo.token
        let updatedBaton = { ...baton }
        let category = utxo.txid
        let currentVault = from32LE(hexToBin(baton.nft!.commitment))
        let nextExpiration = currentVault + Number(step)
        console.log("step:",nextExpiration)
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