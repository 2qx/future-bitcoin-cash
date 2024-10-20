import { verifySeriesCategory, getAllBalances } from "./util"
import { Vault } from "./vault"
import { CATEGORY_MAP } from "./constant"
// Load the electrum library.
import { ElectrumClient } from '@electrum-cash/network';

let validMint = "0200000001ee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a400000000fd59014d560120c0d3c0d0a06376b17568c0cec0d188c0cdc0c788c0d0c0c693c0d3c0cc939c7702e803c0009dc0c7c0cd88c0cec0d188c0ccc0c6023421949dc0cf81c0d278537993548088767b965a97009c63c4519d67768277787e52797e02aa2078aa7e01877e51cd788851d100c88851d2008851d3070040075af075079d51cc02e8039d52cd788852d100c88852d2008852d3070040075af075079d52cc02e8039d53cd788853d100c88853d2008853d3070040075af075079d53cc02e8039d54cd788854d100c88854d2008854d3070040075af075079d54cc02e8039d55cd788855d100c88855d2008855d3070040075af075079d55cc02e8039d56cd788856d100c88856d2008856d3070040075af075079d56cc02e8039d57cd788857d100c88857d2008857d3070040075af075079d57cc02e8039d58cd066a0446424348547982777e54797e8858d1008858cc009dc4599d6d686d51feffffff09d2fa8702000000004aef46cb7cd3cda1f18731c3fc1e4284a2d9a891184b3ff231434509353101b0c0fb610430270d00aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b387e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b387e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b387e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b387e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b387e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b387e8030000000000004eefee96aefc930ebc192b5d808108feed3e80492d6e011760dcdb808718e44227a410ff0040075af0750700aa20de8fb20117718c88b25280d7a952ec3a2c10e777df29386f54d6c1d757b502b38700000000000000000a6a04464243480348230d4e190d00"


async function verifyAll(ec ){
    return 
}

describe(`Token series validity tests`, () => {

    test("Should return true on valid mint", async () => {
        let isValid = verifySeriesCategory(validMint, false)
        expect(isValid).toBe(true)
    })

    test("Should return series if return series is true", async () => {
        let series = verifySeriesCategory(validMint)
        expect(series).toBe(862000)
    })

    test.skip("Should validate each category", async () => {
        expect.assertions([... CATEGORY_MAP.keys()].length)
        const electrumClient = new ElectrumClient('Future Bitcoin Cash Tests', '1.4.1', 'bch.imaginary.cash');
        await electrumClient.connect();

        
        // Request the full transaction hex for the transaction ID.
        for (const [key, value] of CATEGORY_MAP) {
            const transactionHex = await electrumClient.request('blockchain.transaction.get', key);
            if(transactionHex instanceof Error) throw transactionHex
            // Print out the transaction hex.
            expect(verifySeriesCategory(transactionHex.toString())).toBe(value);
        }
        
    })


})