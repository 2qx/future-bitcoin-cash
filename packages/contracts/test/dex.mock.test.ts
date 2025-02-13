import { dexArtifact } from '../src/';
import { aliceAddress, alicePriv } from './alice';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT, SignatureTemplate } from 'cashscript';
import { binToHex, bigIntToVmNumber, swapEndianness, padMinimallyEncodedVmNumber } from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';

const toVmNum = (n) =>  padMinimallyEncodedVmNumber(bigIntToVmNumber(n),16);

describe('test example contract functions', () => {
  it('should allow execution of a buy order', async () => {
    const provider = new MockNetworkProvider();

    let baton = randomNFT({
      amount: 0n,
      nft: {
        commitment: "00",
        capability: "minting"
      },
    });

    let buyOrder = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(toVmNum(10000n)) + binToHex(toVmNum(10n)),
        capability: 'mutable'
      }
    });

    let buyOrder2 = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(toVmNum(9000n)) + binToHex(toVmNum(10n)),
        capability: 'mutable'
      }
    });


    let token = randomNFT({
      amount: 10000n,
    });

    // console.log("authCat: ", baton.category);
    // console.log("assetCat: ", token.category)


    const contract = new Contract(dexArtifact, [swapEndianness(baton.category), swapEndianness(token.category)], { provider });


    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 100800n,
      token: buyOrder,
    }));
    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 1000n
    }));

    let utxo0 = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.satoshis == 100800n)[0]
    let utxo1 = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.satoshis == 1000n)[0]

    provider.addUtxo(aliceAddress, randomUtxo({
      satoshis: 20800n,
      token: {
        amount: 10000n,
        category: token.category
      }
    }));

    const aliceUtxos = await provider.getUtxos(aliceAddress);

    // console.log(aliceUtxos[0])
    // console.log(binToHex(alicePriv))
    // console.log(buyOrder2)

    let transaction = contract.functions
      .swap()
      .from(utxo0)
      .from(utxo1)
      .fromP2PKH(aliceUtxos[0], new SignatureTemplate(alicePriv))
      // .withoutChange()
      // .withoutTokenChange()
      .to(
        [
          {
            to: contract.tokenAddress,
            amount: 90800n,
            token: buyOrder2
          },
          {
            to: contract.tokenAddress,
            amount: 800n,
            token: {
              category: token.category,
              amount: 1000n
            }
          }
        ]
      );

    await expect(transaction.send()).resolves.not.toThrow();
  });

  it('should allow execution of a sell order', async () => {
    const provider = new MockNetworkProvider();

    let baton = randomNFT({
      amount: 0n,
      nft: {
        commitment: "00",
        capability: "minting"
      },
    });

    let buyOrder = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(toVmNum(-10000n)) + binToHex(toVmNum(10n)),
        capability: 'mutable'
      }
    });

    let buyOrder2 = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(toVmNum(-9000n)) + binToHex(toVmNum(10n)),
        capability: 'mutable'
      }
    });


    let token = randomNFT({
      amount: 10000n,
    });

    // console.log("authCat: ", baton.category);
    // console.log("assetCat: ", token.category)


    const contract = new Contract(dexArtifact, [swapEndianness(baton.category), swapEndianness(token.category)], { provider });


    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 800n,
      token: buyOrder,
    }));
    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 800n,
      token: {
        amount: 10000n,
        category: token.category
      }
    }));

    let utxo0 = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category == baton.category)[0]
    let utxo1 = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category == token.category)[0]

    provider.addUtxo(aliceAddress, randomUtxo({
      satoshis: 22800n,
    }));

    const aliceUtxos = await provider.getUtxos(aliceAddress);

    // console.log(aliceUtxos[0])
    // console.log(binToHex(alicePriv))
    // console.log(buyOrder2)

    let transaction = contract.functions
      .swap()
      .from(utxo0)
      .from(utxo1)
      .fromP2PKH(aliceUtxos[0], new SignatureTemplate(alicePriv))
      // .withoutChange()
      // .withoutTokenChange()
      .to(
        [
          {
            to: contract.tokenAddress,
            amount: 10800n,
            token: buyOrder2
          },
          {
            to: contract.tokenAddress,
            amount: 800n,
            token: {
              category: token.category,
              amount: 9000n
            }
          },
          {
            to: aliceAddress,
            amount: 10800n,
            token: {
              category: token.category,
              amount: 800n
            }
          }
        ]
      );

    await expect(transaction.send()).resolves.not.toThrow();
  });

  it('should fail on execution of a short-funded sell order', async () => {
    const provider = new MockNetworkProvider();

    let baton = randomNFT({
      amount: 0n,
      nft: {
        commitment: "00",
        capability: "minting"
      },
    });

    let buyOrder = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(toVmNum(-10000n)) + binToHex(toVmNum(10n)),
        capability: 'mutable'
      }
    });

    let buyOrder2 = randomNFT({
      amount: 0n,
      category: baton.category,
      nft: {
        commitment: binToHex(toVmNum(-9000n)) + binToHex(toVmNum(10n)),
        capability: 'mutable'
      }
    });


    let token = randomNFT({
      amount: 10000n,
    });

    // console.log("authCat: ", baton.category);
    // console.log("assetCat: ", token.category)


    const contract = new Contract(dexArtifact, [swapEndianness(baton.category), swapEndianness(token.category)], { provider });


    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 800n,
      token: buyOrder,
    }));
    provider.addUtxo(contract.address, randomUtxo({
      satoshis: 800n,
      token: {
        amount: 10000n,
        category: token.category
      }
    }));

    let utxo0 = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category == baton.category)[0]
    let utxo1 = (await provider.getUtxos(contract.tokenAddress)).filter(u => u.token.category == token.category)[0]

    provider.addUtxo(aliceAddress, randomUtxo({
      satoshis: 22800n,
    }));

    const aliceUtxos = await provider.getUtxos(aliceAddress);

    // console.log(aliceUtxos[0])
    // console.log(binToHex(alicePriv))
    // console.log(buyOrder2)

    let transaction = contract.functions
      .swap()
      .from(utxo0)
      .from(utxo1)
      .fromP2PKH(aliceUtxos[0], new SignatureTemplate(alicePriv))
      // .withoutChange()
      // .withoutTokenChange()
      .to(
        [
          {
            to: contract.tokenAddress,
            amount: 10799n,
            token: buyOrder2
          },
          {
            to: contract.tokenAddress,
            amount: 800n,
            token: {
              category: token.category,
              amount: 9000n
            }
          },
          {
            to: aliceAddress,
            amount: 10800n,
            token: {
              category: token.category,
              amount: 800n
            }
          }
        ]
      );

    await (expect(transaction)).toFailRequireWith(/Payment for order too low/);
  });

});
