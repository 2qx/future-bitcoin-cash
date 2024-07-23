import  { hexToBin } from "@bitauth/libauth"
import { couponArtifact  } from "@fbch/contracts";
import { Contract } from "cashscript";
import { Coupon } from "./coupon";
import { Vault } from "./vault";
describe(`Static Coupon Tests`, () => {

    test("Token address should match", async () => {
        let lock = Vault.getLockingBytecode(1000)
        const contract = new Contract(couponArtifact, [100000n, lock]);
        expect(Coupon.getAddress(100000, lock)).toBe(contract.tokenAddress)
    });

    test("Unlocking Bytecode to Match", async () => {
        let lock = Vault.getUnlockingBytecode(1000)
        const contract = new Contract(couponArtifact, [100000n, lock]);
        expect(Coupon.getUnlockingBytecode(100000, lock)).toEqual(hexToBin(contract.bytecode))
    });

    test("Cat some token addresses", async () => {
        for(var i = 900000; i <= 1e6; i+=10000){
            let a = Coupon.getAddress(100000000, Vault.getLockingBytecode(i))
            console.log(i, a)
        }
    });

});