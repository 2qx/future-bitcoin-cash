import { batteryArtifact } from '../src/';
import { gantryArtifact } from '../src/';
import { vaultArtifact } from '../src/';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT, FailedRequireError } from 'cashscript';
import { binToHex, numberToBinUint32LEClamped } from "@bitauth/libauth";
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
    });

    let gantryBaton = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(to32LE(1000000)), // 1,000,000
        capability: 'none'
      }
    });

    let batteryBaton = randomNFT({
      amount: 800n,
      category: baton.category,
      nft: {
        commitment: binToHex(to32LE(100000)), // 100,000
        capability: 'minting'
      }
    });


    let locktime = 110n;
    let step = 1000000n;
    
    const vault = new Contract(vaultArtifact,[locktime],{ provider })
    let vaultBytecode = vault.bytecode.slice(4)
    let gantry = new Contract(gantryArtifact, [step, vaultBytecode], { provider });
    let gantryBytecode = gantry.bytecode.slice(8 + vaultBytecode.length + 2)
    const contract = new Contract(batteryArtifact, [99n, 10001n, gantryBytecode, vaultBytecode], { provider });
    

    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 1000100n,
      token: baton,
    }));

    let utxo = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category === baton.category)[0]

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

      await expect(transaction.send()).resolves.not.toThrow();
  });
});
