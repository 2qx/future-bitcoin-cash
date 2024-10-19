import { binToHex, hexToBin, lockingBytecodeToCashAddress } from "@bitauth/libauth"
import { gantryArtifact } from "@fbch/contracts";
import { Contract, ElectrumNetworkProvider } from "cashscript";
import { Gantry } from "./gantry";
import { Vault } from "./vault";
describe(`Static Coupon Tests`, () => {

    test("Token address should match", async () => {

        let lock = Gantry.getLockingBytecode(1000, Vault.unlockingScript)
        const contract = new Contract(gantryArtifact, [1000n, Vault.unlockingScript]);
        let cashaddr = lockingBytecodeToCashAddress(lock)
        expect(contract.bytecode).toBe(binToHex(Gantry.getUnlockingBytecode(1000,Vault.unlockingScript)))
        expect(binToHex(lock)).toBe("aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087")
        //console.log(await contract.tokenAddress)
        expect(contract.address).toBe(cashaddr)
    });

    test("Gantry locks should match", async () => {

        let lockSet = Gantry.getLockingBytecodeSet(1e6,4)
        expect(lockSet.has("aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087")).toBe(true)
        expect(lockSet.has("aa208b8bbab9023ff4c94e3ba458d213c5f629cf4d2f750a813e3855fa8b88f7790087")).toBe(true)
        expect(lockSet.has("aa206cf5cd944ca7cf45ed3a3075694fea5f7ad92d0011784c896238049653e405f987")).toBe(true)
        expect(lockSet.has("aa204e1a8669275f0b5c1deaa1f168de429a8dc53f91acc489dbc819239ebc9a155787")).toBe(true)
        expect(lockSet.has("aa204e1a8669275f0b5c1deaa1f168dasdfe429a8dc53f91acc489dbc819239ebc9a155787")).toBe(false)
    });


    test("Should step gantry", async () => {

        let provider = new ElectrumNetworkProvider("chipnet");
        await Gantry.step(1000n, provider);

    });

    test("Should step some gantries", async () => {

        let provider = new ElectrumNetworkProvider();
        // await Gantry.step(1_000_000n, provider);
        for await (const results of [...Array(10).keys()]) {
            await Gantry.step(100_000n, provider);
        }
        for await (const results of [...Array(20).keys()]) {
            await Gantry.step(10_000n, provider);
        }
        for await (const results of [...Array(52).keys()]) {
            await Gantry.step(1_000n, provider);
        }

    });
});