import { artifact } from '../contracts/battery.v1.js';
import { artifact as gantryArtifact } from '../contracts/gantry.v1.js';
import { artifact as vaultArtifact } from '../contracts/vault.v1.js';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT } from 'cashscript';
import { hexToBin } from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';

describe.skip('test example contract functions', () => {
  it('should allow execution of a battery contract', async () => {
    const provider = new MockNetworkProvider();
    
    let i0 = 10000n;
    let o0 = 1000n;
    let o1 = 4001n;
    let allowance = 5000n;

    let baton = randomNFT({
      amount: 0n,
      nft: {
        commitment: "e803",
        capability: "minting"
      },
    })
    const gantry = new Contract(gantryArtifact, [baton.category, hexToBin("12"), hexToBin(vaultArtifact.debug.bytecode)], { provider });
    const contract = new Contract(artifact, [10n, 10000n, 11n, hexToBin(gantryArtifact.debug.bytecode), hexToBin(vaultArtifact.debug.bytecode), allowance], { provider });
    
    o0+o1
    provider.addUtxo(contract.address, randomUtxo({
      satoshis: i0,
      token: baton,
    }));
    let utxo = (await provider.getUtxos(contract.address))[0]

    let updatedBaton = baton
    updatedBaton.nft!.commitment = "1027"

    let transaction = contract.functions
      .execute()
      .from(utxo)
      .withTime(100)
      .to(
        [
          { to: gantry.address, amount: o0 },
          { to: contract.tokenAddress, 
            amount: o1, 
            token: updatedBaton
         }
        ]
      );
    await expect(transaction.send()).resolves.not.toThrow();
  });
});
