import { artifact } from '../contracts/battery.v1.js';
import { artifact as gantryArtifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT, FailedTransactionError } from 'cashscript';
import { binToHex, hexToBin, numberToBinUint32LEClamped, swapEndianness } from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';

const to32LE = numberToBinUint32LEClamped;

describe('test example contract functions', () => {
  it('should allow execution of a battery contract', async () => {
    const provider = new MockNetworkProvider();




    let baton = randomNFT({
      amount: 0n,
      nft: {
        commitment: binToHex(to32LE(1000000)), // 1,000,000
        capability: "minting"
      },
    })

    let gantryBaton = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(to32LE(1000000)), // 1,000,000
        capability: 'none'
      }
    })

    let batteryBaton = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(to32LE(100000)), // 100,000
        capability: 'minting'
      }
    })

    let batonReverse = swapEndianness(baton.category);

    let locktime = 110;
    // convert locktime to LE Byte4
    let locktimeBytes = to32LE(locktime);
    const vault = new Contract(
      vaultArtifact,
      [
        locktimeBytes,
        batonReverse
      ],
      { provider }
    )

    let step = 1000000;
    // convert locktime to LE Byte4
    let stepBytes = to32LE(step);
    const gantry = new Contract(gantryArtifact, [batonReverse, stepBytes, vault.bytecode.slice(76)], { provider });
    const contract = new Contract(artifact, [99n, 10001n, gantry.bytecode.slice(194), vault.bytecode.slice(76)], { provider });

    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 1000100n,
      token: baton,
    }));
    let utxo = (await provider.getUtxos(contract.address))[0]

    let transaction = contract.functions
      .execute()
      .from(utxo)
      .withTime(10003)
      .to(
        [

          {
            to: contract.tokenAddress,
            amount: 998200n,
            token: batteryBaton
          },
          {
            to: gantry.tokenAddress,
            amount: 1000n,
            token: gantryBaton
          }
        ]
      );

      await expect(transaction.send()).rejects.toThrow(FailedTransactionError);
  });
});
