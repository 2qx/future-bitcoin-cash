import {
    cashAddressToLockingBytecode,
    CashAddressType,
    decodeCashAddress
} from "@bitauth/libauth";

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


export function isTokenAddress(rawAddress): boolean {
    const addressInfo = decodeCashAddress(rawAddress)
    if (typeof addressInfo == "string") return false
    return addressInfo.type == CashAddressType.p2pkhWithTokens || addressInfo.type == CashAddressType.p2shWithTokens
}