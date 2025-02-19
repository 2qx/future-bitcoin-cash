
import { getHodlAddresses, getUnspentAddresses, getLichoWillAddresses } from "./extra";

describe(`Static Coupon Tests`, () => {

    test("Should text extra", async () => {

        let addresses  = await getLichoWillAddresses();
        process.stdout.write(JSON.stringify(addresses) + '\n');
        //await getUnspentAddresses();
        //await getHodlAddresses();
    });

});