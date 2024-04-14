import { hash160 } from '@cashscript/utils';
import { SignatureTemplate } from "cashscript";
import {
    deriveHdPrivateNodeFromSeed,
    deriveHdPath,
    secp256k1,
    encodeCashAddress,
    deriveSeedFromBip39Mnemonic
} from '@bitauth/libauth';

// Generate entropy from BIP39 mnemonic phrase and initialise a root HD-wallet node
const seed = deriveSeedFromBip39Mnemonic('CashScript Examples');
const rootNode = deriveHdPrivateNodeFromSeed(seed, true);
const baseDerivationPath = "m/44'/145'/0'/0";

// Derive Alice's private key, public key, public key hash and address
const aliceNode = deriveHdPath(rootNode, `${baseDerivationPath}/0`);
if (typeof aliceNode === 'string') throw new Error();
export const alicePub = secp256k1.derivePublicKeyCompressed(aliceNode.privateKey) as Uint8Array;
export const alicePriv = aliceNode.privateKey;
export const alicePkh = hash160(alicePub);
export const aliceAddress = encodeCashAddress('bchtest', 'p2pkhWithTokens', alicePkh);
export const aliceTemplate = new SignatureTemplate(alicePriv)