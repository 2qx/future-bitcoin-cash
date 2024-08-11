import { getHvifIconHex, getFbchIconSvg } from "./icons"
import * as fs from 'fs';

const writeSVG = (i ) => {return fs.writeFileSync('/tmp/FBCH-' + i + ".svg", getFbchIconSvg(i));}

describe('test example contract functions', () => {
    it('should get the 0 block icon', async () => {
        let genesis = getHvifIconHex(0);
        let genesisIcon = "6e63696605" +
            "0500" +
            "05ff" +
            "0500" +
            "0500" +
            "0500" +
            "050a04242424" +
            "5c5c5c5c240a0a28283428342c2c2c2c30303030342c342c3c283c0a0428" +
            "40285c345c34400a0438283838583858280a04383c385c585c583c060a01" +
            "01001001178200030a000100000a010101000a020102000a030104000a04010300";
        expect(genesis).toBe(genesisIcon);
        let f = getHvifIconHex(975000);
        let test = getHvifIconHex(257000, true);
        expect(test).not.toBe(genesisIcon);
    });

    it.skip('skip writing icons', async () => {
        // Or        
        for await (const n of [...Array(5).keys()]) {
            await writeSVG(1e6+(1e6*n))
        }
        for await (const n of [...Array(20).keys()]) {
            await writeSVG(9e5+(1e5*n))
        }
        for await (const n of [...Array(50).keys()]) {
            await writeSVG(8.6e5+(1e4*n))
        }
        for await (const n of [...Array(200).keys()]) {
            await writeSVG(8.57e5+(1e3*n))
        }
    })
});
