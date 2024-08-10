import { hexToBin } from "@bitauth/libauth"
import { gantryArtifact } from "@fbch/contracts";
import { Contract, ElectrumNetworkProvider } from "cashscript";
import { Gantry } from "./gantry";
import { Vault } from "./vault";
describe(`Static Coupon Tests`, () => {

    test("Token address should match", async () => {

        let provider = new ElectrumNetworkProvider("chipnet");
        let lock = Vault.getLockingBytecode(1000)
        const contract = new Contract(gantryArtifact, [1000n, Vault.lockingScript], { provider });
        //console.log(await contract.getUtxos())
        //console.log(await contract.tokenAddress)
        expect(await contract.getBalance()).toBeGreaterThan(0n)
    });


    test("Should step gantry", async () => {

        let provider = new ElectrumNetworkProvider("chipnet");
        await Gantry.step(1000n, provider);

    });

    test("Should step some gantries", async () => {

        let provider = new ElectrumNetworkProvider();
        // for await (const results of [...Array(5).keys()]) {
        //     await Gantry.step(1_000_000n, provider);
        // }
        for await (const results of [...Array(10).keys()]) {
            await Gantry.step(100_000n, provider);
        }
        for await (const results of [...Array(10).keys()]) {
            await Gantry.step(10_000n, provider);
        }
        for await (const results of [...Array(52).keys()]) {
            await Gantry.step(1_000n, provider);
        }

    });
});