
import { artifact } from '../contracts/metadata.v1.js';
import { aliceAddress, aliceTemplate } from './alice.js';
import { Contract, MockNetworkProvider, randomNFT, randomUtxo } from 'cashscript';
import 'cashscript/dist/test/JestExtensions.js';
import { decodeTransaction, hexToBin, binToHex, numberToBinUintLE } from '@bitauth/libauth';


export function toHex(num: number|bigint): string {
  num = Number(num)
  let hex = binToHex(numberToBinUintLE(num)).toUpperCase();
  if (!hex) hex = "00";
  return "0x" + hex;
}

describe('test coupon contract functions', () => {
  it('should spend coupon to/from p2pkh address', async () => {

    const provider = new MockNetworkProvider();
    const contract = new Contract(artifact, [], { provider });

    let random = randomNFT({
      nft: {
        commitment: "01",
        capability: 'none'
      },
      amount: 0n,
      category: "24faf3f715e35a5bc7efa383135b1a55249e0cc2bf2512972e3b7ba5cfa08742"
    })
    provider.addUtxo(contract.tokenAddress, randomUtxo({
      satoshis: 100000n,
      token: random
    }));

    let utxos = await provider.getUtxos(contract.tokenAddress);

    let transaction = await contract.functions
      .test01()
      .from(utxos[0])
      .to(
        [
          {
            to: contract.tokenAddress,
            amount: 7400n
          }
        ]
      )
      .withOpReturn(['0x534d5030', '0x1000', "tBCH", "test BCH"])
      //TODO - should handle null [... , ""]
      .withOpReturn(['0x534d5030', '0x1000', "tBCH", '0x01', '0x08'])
      .withOpReturn(['0x534d5030', '0x1100', "Test name", "A token to test names and descriptions"])
      .withOpReturn(['0x534d5030', '0x1200', "icon", "https://example.invalid/tbch.png"])
      .withOpReturn(['0x534d5030', '0x1200', "web", "https://tbch.invalid/"])
      .withOpReturn(['0x534d5030', '0x1100', "龍", "龍令牌"])  
      .send()

    expect(transaction.hex).toMatch(/6a04534d5030/);
    let decodedTx = decodeTransaction(hexToBin(transaction.hex))
    if (typeof decodedTx === "string") throw decodedTx
    
    expect(binToHex(decodedTx.outputs[1].lockingBytecode)).toBe("6a04534d50300210000474424348087465737420424348")
    expect(binToHex(decodedTx.outputs[2].lockingBytecode)).toBe("6a04534d5030021000047442434801010108")
    expect(binToHex(decodedTx.outputs[3].lockingBytecode)).toBe("6a04534d50300211000954657374206e616d65264120746f6b656e20746f2074657374206e616d657320616e64206465736372697074696f6e73")
    expect(binToHex(decodedTx.outputs[4].lockingBytecode)).toBe("6a04534d50300212000469636f6e2068747470733a2f2f6578616d706c652e696e76616c69642f746263682e706e67")
    expect(binToHex(decodedTx.outputs[5].lockingBytecode)).toBe("6a04534d5030021200037765621568747470733a2f2f746263682e696e76616c69642f")
    expect(binToHex(decodedTx.outputs[6].lockingBytecode)).toBe("6a04534d503002110003e9be8d09e9be8de4bba4e7898c")
  });


});
