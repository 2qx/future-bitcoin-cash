import {
    cashAddressToLockingBytecode
} from "@bitauth/libauth";

export function deriveLockingBytecode(address: string): Uint8Array {
    const lock = cashAddressToLockingBytecode(address);
    if (typeof lock === "string") throw lock;
    return lock.bytecode;
}