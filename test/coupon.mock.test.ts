
import { artifact } from '../contracts/coupon.v2.js';
import { aliceAddress, aliceTemplate } from './alice.js';
import { Contract, MockNetworkProvider, 
    TransactionBuilder, randomUtxo } from 'cashscript';
import 'cashscript/dist/test/JestExtensions.js';
import { cashAddressToLockingBytecode } from '@bitauth/libauth';


describe('test coupon contract functions', () => {
  it('should spend coupon to/from p2pkh address', async () => {
    const provider = new MockNetworkProvider();
    const transactionBuilder = new TransactionBuilder({ provider });

    
    let lock = cashAddressToLockingBytecode(aliceAddress);
    if(typeof lock == "string") throw lock
    lock

    const contract = new Contract(artifact, [55_000n, lock.bytecode], { provider });
    
    provider.addUtxo(contract.address, randomUtxo({satoshis:55_000n}));
    provider.addUtxo(aliceAddress, randomUtxo({satoshis:5_000n}));

    const contractUtxos = await provider.getUtxos(contract.address);
    const aliceUtxos = await provider.getUtxos(aliceAddress);
    
    transactionBuilder.addInputs([
        { ...contractUtxos[0], unlocker: contract.unlock.apply() },
        { ...aliceUtxos[0], unlocker: aliceTemplate.unlockP2PKH() },
      ]);
    
    transactionBuilder.addOutputs([
        { to: aliceAddress, amount: 59_900n },
      ]);
    transactionBuilder.setMaxFee(100n);
    let debug = transactionBuilder.build()
    let transaction = transactionBuilder.send()

    await expect(transaction).resolves.not.toThrow();
    expect((await transaction).outputs[0]!.valueSatoshis).toBe(59_900n)

  });


});
