import {
    binToBigIntUintLE,
    binToHex,
    cashAddressToLockingBytecode,
    CashAddressNetworkPrefix,
    CashAddressType,
    decodeCashAddress,
    decodeTransactionBCH,
    encodeCashAddress,
    hexToBin
} from "@bitauth/libauth";

import { BATON, ELECTRUM_CONCURRENCY } from "./constant"

import { Utxo } from "cashscript";
import { balanceFromSatoshi, UtxoI } from "mainnet-js";

import {
    CouponItemI,
    CsUtxo,
    rateSet,
    UtxoItemI
} from "./interface.js";


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

export function getRates(
    currentBlock: number,
    futureBlock: number,
    coupon: number,
    principal = 1e8): rateSet {

    if (futureBlock <= currentBlock) {
        return {
            spb: Infinity,
            ytm: Infinity,
            ypa: Infinity
        }
    }

    return {
        spb: Math.round(Number((coupon / (futureBlock - currentBlock) / ((principal - coupon) / 1e8)) + Number.EPSILON) * 100) / 100,
        ytm: Number((coupon / (principal - coupon)) * 1e2) ,
        ypa: Number((coupon / (principal - coupon)) * 1e2 * (52596 / (futureBlock - currentBlock))),
    }

}

/**
     * Return rate information for a given coupon in a localized format
     *
     *
     * @param currentBlock - the current time, in blocks
     * @param futureBlock - the future time, in blocks
     * @param coupon - the coupon amount in satoshis
     * @param principal - amount required to claim coupon
     */

export function getRateLocale(
    currentBlock: number,
    futureBlock: number,
    coupon: number,
    principal = 1e8) {

    let rates = getRates(
        currentBlock,
        futureBlock,
        coupon,
        principal);

    return {
        spb: rates.spb.toLocaleString(undefined, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }),
        ytm: rates.ytm.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
            }
        ),
        ypa: rates.ypa.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
            }
        ),
    }
}

export function asTokenUnawareP2sh(rawAddress: string): string {
    const addressInfo = decodeCashAddress(rawAddress)
    if (typeof addressInfo == "string") throw (addressInfo)
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


/**
     * Return the series of a valid minting transaction, or false if invalid
     *
     *
     * @param rawTx - the pre-genesis transaction, category id, for a FBCH series
     * @param returnSeriesTime - whether or not to return the series blocktime as a number (default True).
     */
export function verifySeriesCategory(
    rawTx: string | Uint8Array,
    returnSeriesTime: boolean = true,
): number | boolean {
    // If the transaction is passed as a hex, convert it for libauth
    if (typeof rawTx === "string") rawTx = hexToBin(rawTx)

    // Decode the tx to an object
    const transaction = decodeTransactionBCH(rawTx)

    // if decoding transaction fails, return false suppressing error
    if (typeof transaction === "string") return false

    // Get the first output
    const output0 = transaction.outputs[0]

    // Check the first output is spending the authorization baton
    if (binToHex(output0.token.category) != BATON) return false

    // Return the commitment as a number
    if (returnSeriesTime) return Number(binToBigIntUintLE(output0.token.nft.commitment))

    // or return true
    return true
}


/**
 * Same as Promise.all(items.map(item => task(item))), but it waits for
 * the first {batchSize} promises to finish before starting the next batch.
 *
 * @template A
 * @template B
 * @param {function(A): B} task The task to run for each item.
 * @param {A[]} items Arguments to pass to the task for each call.
 * @param {int} batchSize
 * @returns {Promise<B[]>}
 */
export async function promiseAllInBatches(task, items, batchSize=ELECTRUM_CONCURRENCY) {
    let position = 0;
    let results = [];
    while (position < items.length) {
        const itemsForBatch = items.slice(position, position + batchSize);
        results = [...results, ...await Promise.all(itemsForBatch.map(item => task(item)))];
        position += batchSize;
    }
    return results;
}


export async function getBalanceWrap(args) {
    let balance = await args[0].request('blockchain.address.get_balance', args[1], "include_tokens");
    if (balance instanceof Error) throw balance
    return balance.confirmed
}

export async function getAllBalances(electrumClient, addresses) {
    return promiseAllInBatches(getBalanceWrap, addresses.map(a => [electrumClient, a]))
}

export async function listUnspentWrap(args): Promise<UtxoItemI[]> {
    let unspent = await args[0].request('blockchain.address.listunspent', args[1]);
    if (unspent instanceof Error) throw unspent
    return unspent.map((r) => {
        return {
            utxo: { txid: r.tx_hash, vout: r.tx_pos, satoshis: BigInt(r.value) } as CsUtxo,
            address: args[1]
        }

    })
}

export async function getAllUnspentCoupons(electrumClient, addresses): Promise<Map<string, CouponItemI>> {
    let allUnspent = (await promiseAllInBatches(listUnspentWrap, addresses.map(a => [electrumClient, a]))).flat()
    var map = new Map();
    allUnspent.map(obj => map.set(obj.utxo.txid + ":" + obj.utxo.vout, obj));
    return map as Map<string, any>
}

