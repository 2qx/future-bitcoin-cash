import { Transaction } from "@bitauth/libauth";

export interface SwapState {
    placement: number;
    locktime: number;
    vault: UtxoI;
    wallet: UtxoI[];
    coupons?: UtxoI[];
    chain?: Transaction[];
}

const literal = <L extends string>(l: L): L => l;

export interface UtxoI {
    txid: string;
    vout: number;
    satoshis: number;
    height?: number;
    coinbase?: boolean;
    token?: TokenI;
}

export interface TokenI {
    amount: bigint;
    tokenId: string;
    capability?: NFTCapability;
    commitment?: string;
}

export const NFTCapability = {
    none: literal("none"),
    mutable: literal("mutable"),
    minting: literal("minting"),
};


export type NFTCapability = typeof NFTCapability[keyof typeof NFTCapability];