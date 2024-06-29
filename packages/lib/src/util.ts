import {
    cashAddressToLockingBytecode,
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




