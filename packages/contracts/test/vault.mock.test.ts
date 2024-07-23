
import { vaultArtifact } from '../src/';
import { aliceAddress, aliceTemplate } from './alice';
import { Contract, MockNetworkProvider, 
    TransactionBuilder,
    randomUtxo, randomToken } from 'cashscript';
import 'cashscript/dist/test/JestExtensions.js';
import { 
  hexToBin,
  numberToBinUint32LEClamped
 } from '@bitauth/libauth';

const to32LE = numberToBinUint32LEClamped;


describe('test example contract functions', () => {
  it('should place sats and receive fungible tokens', async () => {
    const provider = new MockNetworkProvider();
    const transactionBuilder = new TransactionBuilder({ provider });

    let locktime = 200n;

    let tokens = randomToken({
        amount:70_000n
    })
    const contract = new Contract(vaultArtifact, [locktime], { provider });
    

    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 10000n,
      token: tokens,
    }));
    provider.addUtxo(aliceAddress, randomUtxo({satoshis:55_000n}));


    const contractUtxos = await provider.getUtxos(contract.address);
    const aliceUtxos = await provider.getUtxos(aliceAddress);

    transactionBuilder.addInputs([
        { ...contractUtxos[0], unlocker: contract.unlock.swap() },
        { ...aliceUtxos[0], unlocker: aliceTemplate.unlockP2PKH() },
      ]);
    
    transactionBuilder.addOutputs([
        { to: contract.address, amount: 50_000n },
        {
            to: aliceAddress,
            amount: 14000n,
            token: {
              amount: 50_000n,
              category: tokens.category,
            }
          },
      ]);
    transactionBuilder.setLocktime(201);
    transactionBuilder.setMaxFee(1000n);
    let transaction = transactionBuilder.send()

    await expect(transaction).resolves.not.toThrow();
    expect((await transaction).outputs[0]!.valueSatoshis).toBe(50_000n)
    expect((await transaction).outputs[1]!.token!.amount).toBe(50_000n)

  });
});
