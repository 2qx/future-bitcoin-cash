import { artifact } from '../contracts/battery.v1.js';
import { artifact as gantryArtifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT } from 'cashscript';
import { binToHex, hexToBin, numberToBinUint32LEClamped, swapEndianness } from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';

const to32LE = numberToBinUint32LEClamped;

describe('test example contract functions', () => {
  it('should allow execution of a battery contract', async () => {
    const provider = new MockNetworkProvider();

    let step = 100
    // convert locktime to LE Byte4
    let stepBytes = to32LE(step);


    let baton = randomNFT({
      amount: 0n,
      nft: {
        commitment: "64000000", // 100
        capability: "minting"
      },
    })

    let gantryBaton = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: '64000000', // 100
        capability: 'none'
      }
    })

    let batteryBaton = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: 'e8030000', // 1000
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

    const gantry = new Contract(gantryArtifact, [batonReverse, stepBytes, vault.bytecode.slice(76)], { provider });
    const contract = new Contract(artifact, [10000n, 11n, gantry.bytecode.slice(-184), vault.bytecode.slice(76)], { provider });

    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 10000n,
      token: baton,
    }));
    let utxo = (await provider.getUtxos(contract.address))[0]


    let transaction = contract.functions
      .execute()
      .from(utxo)
      .withTime(100)
      .to(
        [
          {
            to: gantry.tokenAddress,
            amount: 2000n,
            token: gantryBaton
          },
          {
            to: contract.tokenAddress,
            amount: 7400n,
            token: batteryBaton
          }
        ]
      );

    await expect(transaction.send()).resolves.not.toThrow();
  });
});
