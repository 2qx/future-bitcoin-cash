import {
    encodeDataPush,
    hash256,
    bigIntToVmNumber,
    CashAddressNetworkPrefix,
    hexToBin,
    lockingBytecodeToCashAddress,
    binToHex
} from "@bitauth/libauth";

import { UtxoI } from "./interface.js"

export class Coupon {

    amount: number;
    lock: Uint8Array;
    static lockingScript = "00cc00c694a16900c788c08bc39c"

    /**
     * Return the address for a Coupon
     *
     *
     * @param amount - the threshold amount (sats) to redeem coupon
     * @param lock - the vault locking bytecode
     * @param network - the network prefix
     */
    static getAddress(amount: number, lock: Uint8Array, network = CashAddressNetworkPrefix.mainnet) {
        let lockingBytecode = this.getLockingBytecode(amount, lock)
        let addr = lockingBytecodeToCashAddress(lockingBytecode, network, { tokenSupport: true })
        if (typeof addr !== 'string') throw (addr)
        return addr
    }

    /**
     * Return the unlockingBytecode for a Coupon
     *
     *
     * @param amount - the threshold amount (sats) to redeem coupon
     * @param lock - the vault locking bytecode
     */
    static getUnlockingBytecode(amount: number, lock: Uint8Array) {
        const amountVm = encodeDataPush(bigIntToVmNumber(BigInt(amount)))
        const lockVm = encodeDataPush(lock)
        const lockingScript = hexToBin(this.lockingScript)
        return new Uint8Array(
            [
                ...lockVm,
                ...amountVm,
                ...lockingScript
            ]
        )
    }

    /**
     * Return the lockingBytecode for a Coupon
     *
     *
     * @param amount - the threshold amount (sats) to redeem coupon
     * @param lock - the Vault locking bytecode
     */
    static getLockingBytecode(amount: number, lock: Uint8Array) {
        return new Uint8Array(
            [
                ...hexToBin("aa20"),
                ...hash256(this.getUnlockingBytecode(amount, lock)),
                ...hexToBin("87")
            ]
        );
    }

    static asInput(amount: number, lock: Uint8Array, utxo: UtxoI) {
        return {
            outpointIndex: utxo.vout,
            outpointTransactionHash: hexToBin(utxo.txid),
            sequenceNumber: 0,
            unlockingBytecode: this.getUnlockingBytecode(amount, lock),
        }
    }
}