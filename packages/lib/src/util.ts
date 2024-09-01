import {
    cashAddressToLockingBytecode,
    CashAddressNetworkPrefix,
    CashAddressType,
    decodeCashAddress,
    encodeCashAddress
} from "@bitauth/libauth";

import { Utxo } from "cashscript";
import { UtxoI } from "mainnet-js";

export function deriveLockingBytecode(address: string): Uint8Array {
    const lock = cashAddressToLockingBytecode(address);
    if (typeof lock === "string") throw lock;
    return lock.bytecode;
}

export function getFutureBlockDate(currentBlock: number, futureBlock: number): Date {
    const blocks = futureBlock - currentBlock
    var futureDate = new Date();
    //@ts-ignore
    futureDate.setTime(futureDate.getTime() + 6E5 * blocks);
    return futureDate
}

export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


export function asTokenUnawareP2sh(rawAddress:string): string{
    const addressInfo = decodeCashAddress(rawAddress)
    if (typeof addressInfo == "string") throw(addressInfo)
    return encodeCashAddress(addressInfo.prefix as CashAddressNetworkPrefix, CashAddressType.p2sh, addressInfo.payload)
}

export function isTokenAddress(rawAddress): boolean {
    const addressInfo = decodeCashAddress(rawAddress)
    if (typeof addressInfo == "string") return false
    return addressInfo.type == CashAddressType.p2pkhWithTokens || addressInfo.type == CashAddressType.p2shWithTokens
}

export function asCsUtxo(u: UtxoI): Utxo {
    return {
        txid: u.txid,
        vout: u.vout,
        satoshis: BigInt(u.satoshis),
        token: u.token ? {
            amount: u.token.amount,
            category: u.token.tokenId,
            nft: {
                capability: u.token.capability,
                commitment: u.token.commitment,
            }
        } : undefined
    }
}

export const prefixFromNetworkMap = {
    mainnet: CashAddressNetworkPrefix.mainnet,
    testnet: CashAddressNetworkPrefix.testnet,
    regtest: CashAddressNetworkPrefix.regtest,
  };