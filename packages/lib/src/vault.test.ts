import  { CashAddressNetworkPrefix, cashAddressToLockingBytecode, binToHex, hexToBin} from "@bitauth/libauth"
import { vault } from "@fbch/contracts";
import { coupon } from "@fbch/contracts";
import { Contract, MockNetworkProvider } from "cashscript";
import { Vault } from "./vault";
describe(`Static Vault Tests`, () => {

    test("Token address should match", async () => {
        const contract = new Contract(vault, [1000n]);
        expect(Vault.getAddress(1000)).toBe(contract.tokenAddress)
    });


    test("Test series generator", async () => {
        expect(Vault.getSeriesTimes(1000)).toEqual(Array.from({ length: 10 }, (e, i) => 2000 + 1000 * i))
        expect(Vault.getSeriesTimes(1000,2,5)).toEqual(Array.from({ length: 5 }, (e, i) => 1100 + (100 * i)))
        expect(Vault.getSeriesTimes(1000,4,5)).toEqual(Array.from({ length: 5 }, (e, i) => 10000 + 10000 * i))
    });

    test("Token address should match a testnet address", async () => {
        const provider = new MockNetworkProvider();
        const contract = new Contract(vault, [1000n], {provider});
        expect(Vault.getAddress(1000, CashAddressNetworkPrefix.testnet)).toBe(contract.tokenAddress)
    });


    test("Token bytecode should match cs bytecode", async () => {
        const provider = new MockNetworkProvider();
        const contract = new Contract(vault, [1000n], {provider});
        expect(Vault.getUnlockingBytecode(1000)).toEqual(hexToBin(contract.bytecode))
    });


    test("Series vault addresses should match", async () => {
        const contract = new Contract(vault, [1000n]);

        const step = Math.pow(10, 3)
        const next = 1000 + 1000 % step + step;
        const seriesTimes = Array.from({ length: 10 }, (e, i) => next + step * i)
        let addrs = seriesTimes.map( t => { return new Contract(vault,[BigInt(t)]).tokenAddress})
        expect(Vault.getSeries(1000).length).toBe(10)
        expect(Vault.getSeries(1000)).toEqual(addrs)
    });


    test("Series coupon addresses should match", async () => {
        const contract = new Contract(vault, [1000n]);

        const step = Math.pow(10, 3)
        const next = 1000 + 1000 % step + step;
        const seriesTimes = Array.from({ length: 10 }, (e, i) => next + step * i)
        let addrs = seriesTimes.map( t => { return new Contract(vault,[BigInt(t)]).tokenAddress })
        let bytecodes = addrs.map( a => { 
             let b = cashAddressToLockingBytecode(a)
             if(typeof b === 'string') throw b
             return b.bytecode
             })
        let coupons = bytecodes.map( b => { return new Contract(coupon, [100000000n, binToHex(b)]).tokenAddress})
        expect(Vault.getCouponSeries(1000, 100000000).length).toBe(10)
        expect(Vault.getCouponSeries(1000)).toEqual(coupons)
    });

});