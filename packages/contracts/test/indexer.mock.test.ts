import { indexerArtifact } from '../src/';
import { aliceAddress, alicePriv } from './alice';
import { Contract, MockNetworkProvider, randomUtxo, randomNFT, SignatureTemplate } from 'cashscript';
import { binToHex, bigIntToVmNumber, swapEndianness, padMinimallyEncodedVmNumber } from "@bitauth/libauth";
import 'cashscript/dist/test/JestExtensions.js';

describe('test example contract functions', () => {
    it('should store deadbeef', async () => {
        const provider = new MockNetworkProvider();



        const contract = new Contract(indexerArtifact, [""], { provider });
        provider.addUtxo(contract.address, randomUtxo({
            satoshis: 800n,
            token: {
                amount: 0n,
                category: "00000000000000000000000000000000",
                nft: {
                    commitment: "deadbeef",
                    capability: "none"
                }
            }
        }));
        let utxos = await contract.getUtxos()
        expect(utxos[0].token.nft.commitment).toBe("deadbeef");

        const deadContract = new Contract(indexerArtifact, ["feed"], { provider });
        provider.addUtxo(deadContract.address, randomUtxo({
            satoshis: 800n,
            token: {
                amount: 0n,
                category: "00000000000000000000000000000000",
                nft: {
                    commitment: "beef",
                    capability: "none"
                }
            }
        }));
        let utxos2 = await deadContract.getUtxos()
        expect(utxos2[0].token.nft.commitment).toBe("beef");

    });

});