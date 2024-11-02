
import { getHodlAddresses, getUnspentAddresses } from "./extra";

describe(`Static Coupon Tests`, () => {

    test("Should step gantry", async () => {

        await getUnspentAddresses();
        //await getHodlAddresses();
    });

});