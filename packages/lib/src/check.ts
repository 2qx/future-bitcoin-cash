import {
    decodeTransactionBCH,
    hexToBin,
    binToHex,
    binToBigIntUintLE
} from "@bitauth/libauth"

export function checkCategory(
    rawTx: string | Uint8Array,
    gantries: Set<string>,
    batonCategory: string | Uint8Array,
    returnSeries: boolean = false,
) {
    // If the transaction is passed as a hex, convert it for libauth
    if (typeof rawTx === "string") rawTx = hexToBin(rawTx)

    // Convert baton to string if it's given as an array
    if (!(typeof batonCategory === "string")) batonCategory = binToHex(batonCategory)

    // Decode the tx to an object
    const transaction = decodeTransactionBCH(rawTx)

    // if decoding transaction fails, return false suppressing error
    if (typeof transaction === "string") return false

    // Get the first output
    const v0 = transaction.outputs[0]

    // If the first output destination sends to a gantry
    if (!gantries.has(binToHex(v0.lockingBytecode))) return false

    // Check the first output is spending the authorization baton
    if (binToHex(v0.token.category) != batonCategory) return false

    // Return the commitment as a number
    if (returnSeries) return Number(binToBigIntUintLE(v0.token.nft.commitment))

    // or return true
    return true
}