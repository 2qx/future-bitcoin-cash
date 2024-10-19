import {
    binToHex,
    encodeDataPush,
    hash256,
    bigIntToVmNumber,
    CashAddressNetworkPrefix,
    hexToBin,
    lockingBytecodeToCashAddress,
    Output
} from "@bitauth/libauth";

import { CouponDataI, UtxoI } from "./interface"

import { Coupon } from "./coupon"
import { COUPON_SERIES, VAULT_SERIES } from "./constant";
import { getAllUnspentCoupons, getRates, getRateLocale } from "./util";

export class Vault {

    locktime: number;
    static unlockingScript = "c0d3c0d0a06376b17568c0cec0d188c0cdc0c788c0d0c0c693c0d3c0cc939c77"

    /**
     * Return the token address for a Vault
     *
     *
     * @param time - block time of the vault lock
     * @param network - cashaddress network prefix
     */
    static getAddress(time: number, network = CashAddressNetworkPrefix.mainnet, tokenSupport = true) {

        let lockingBytecode = this.getLockingBytecode(time);
        let addr = lockingBytecodeToCashAddress(lockingBytecode, network, { tokenSupport: tokenSupport })
        if (typeof addr !== 'string') throw (addr)
        return addr
    }

    /**
     * Return the coupon for a Vault at specified amount
     *
     *
     * @param amount - the threshold amount (sats) to redeem coupon
     * @param time - block time of the vault lock
     */
    static getCoupon(amount: number, time: number, network = CashAddressNetworkPrefix.mainnet) {
        return Coupon.getAddress(
            amount,
            this.getLockingBytecode(time),
            network
        )
    }

    /**
     * Return the unlockingBytecode for a Vault
     *
     *
     * @param time - block time of the vault lock
     */
    static getUnlockingBytecode(time: number) {
        const locktimeVm = encodeDataPush(bigIntToVmNumber(BigInt(time)))
        const unlockingScript = hexToBin(this.unlockingScript)
        return new Uint8Array(
            [
                ...locktimeVm,
                ...unlockingScript
            ]
        )
    }

    /**
     * Return the lockingBytecode for a Vault
     *
     *
     * @param time - block time of the vault lock
     */
    static getLockingBytecode(time: number) {

        return new Uint8Array(
            [
                ...hexToBin("aa20"),
                ...hash256(
                    this.getUnlockingBytecode(time)
                ),
                ...hexToBin("87")
            ]
        );
    }

    /**
     * Return an array of staggered block times
     *
     *
     * @param startTime - block time of the vault lock
     * @param series - power of 10 to stagger the times
     * @param limit - length of the array to return
     */
    static getSeriesTimes(startTime: number, series = 3, limit = 10) {
        const step = Math.pow(10, series)
        const next = startTime - (startTime % step) + step;
        return Array.from({ length: limit }, (e, i) => next + (step * i))
    }


    /**
     * Return an array of vaults in a series
     *
     *
     * @param startTime - block time of the vault lock
     * @param series - power of 10 to stagger the times
     * @param limit - length of the array to return
     * @param network - cashaddress network prefix
     */
    static getSeries(startTime: number, series?: number, limit?: number, network = CashAddressNetworkPrefix.mainnet): string[] {
        let seriesTimes = this.getSeriesTimes(startTime, series, limit)
        return seriesTimes.map(time => { return this.getAddress(time, network) })
    }


    /**
     * Return an array of vaults in all series
     *
     *
     * @param startTime - block time of the vault lock
     * @param series - power of 10 to stagger the times
     * @param limit - length of the array to return
     * @param network - cashaddress network prefix
     */
    static getAllSeries(startTime: number, network = CashAddressNetworkPrefix.mainnet) {

        let addresses = VAULT_SERIES.map(e => this.getSeries(startTime, e, e == 6 ? 4 : undefined, network)).flat()
        return [...new Set(addresses)]
    }


    /**
     * Return an array coupons for vaults in a series
     *
     *
     * @param startTime - block time of the vault lock
     * @param amount - coupon threshold amount
     * @param series - power of 10 to stagger the times
     * @param limit - length of the array to return
     * @param network - cashaddress network prefix
     */
    static getCouponSeries(startTime: number, amount = 1e8, series?: number, limit?: number, network = CashAddressNetworkPrefix.mainnet): string[] {
        let seriesTimes = this.getSeriesTimes(startTime, series, limit);
        return seriesTimes.map(
            time => {
                return Coupon.getAddress(
                    amount,
                    this.getLockingBytecode(time),
                    network
                )
            }
        )
    }

    // TODO fix-me
    static getAllCouponSeries(startTime: number, seriesTimes?): Map<string, CouponDataI> {

        if(!seriesTimes) seriesTimes = VAULT_SERIES.map(e => this.getSeriesTimes(startTime-1000, e, e == 6 ? 4 : undefined)).flat()
        seriesTimes = [...new Set(seriesTimes)]
        let amounts = COUPON_SERIES.map(c => Math.pow(10, c) * 1e8)
        let coupons = amounts.map(amount =>
            seriesTimes.map(
                time => {
                    let address = Coupon.getAddress(
                        amount,
                        this.getLockingBytecode(time),
                        CashAddressNetworkPrefix.mainnet
                    )
                    return {
                        locktime: time,
                        placement: amount,
                        order: Math.log10(amount/1e8),
                        address: address,
                        lockingBytecode: binToHex(Coupon.getLockingBytecode(amount, this.getLockingBytecode(time)))
                    }
                }
            )
        ).flat()
        var map = new Map();
        coupons.forEach(obj => map.set(obj.address, obj));
        return map;

    }


    /**
     * Return an array coupons for vaults in a series
     *
     *
     * @param electrumClient - an v4 electrum-cash client
     * @param height - the height after which to list coupons.
     * @param locktime - filter to coupons for a single series
     */

    public static async getAllCouponUtxos(electrumClient, height, locktime?) {
        let couponSeries = Vault.getAllCouponSeries(height, locktime)
        console.log(couponSeries)
        let allCoupons = await getAllUnspentCoupons(electrumClient, [...couponSeries.keys()]) 
        allCoupons.forEach((value, key, map) => {
            let cData = couponSeries.get(value.address)
            map.set(key,
                {
                    id: value.utxo.txid +":"+value.utxo.vout,
                    ...value,
                    ...getRates(height, cData.locktime, Number(value.utxo.satoshis), cData.placement),
                    locale: getRateLocale(height, cData.locktime, Number(value.utxo.satoshis), cData.placement),
                    ...cData
                } 
            ) 
        })
        return Array.from(allCoupons.values()).sort((a,b) => b.spb-a.spb)

    }

    /**
    * Return an Unspent Transaction Output as an Input
    *
    *
    * @param time - block time of the vault lock
    * @param utxo - the unspent transaction output being spent.
    */
    static asInput(time: number, utxo: UtxoI) {
        return {
            outpointIndex: utxo.vout,
            outpointTransactionHash: hexToBin(utxo.txid),
            sequenceNumber: 0,
            unlockingBytecode: this.getUnlockingBytecode(time),
        }
    }

    /**
    * Return an Unspent Transaction Output as an Output
    *
    *
    * @param time - block time of the vault lock
    * @param utxo - the unspent transaction output being spent.
    * @param placement - the number of sats being placed *into* the vault.
    */
    static asOutput(
        time: number,
        utxo: UtxoI,
        placement: number
    ): Output {
        return {
            lockingBytecode: this.getLockingBytecode(time),
            valueSatoshis: BigInt(utxo.satoshis + placement),
            token: {
                amount: utxo.token?.amount! - BigInt(placement),
                category: hexToBin(utxo.token?.tokenId!),
                nft: undefined,
            },
        } as Output;
    }

}