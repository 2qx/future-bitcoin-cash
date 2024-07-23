import { Transaction,
    Input,
    Output } from "@bitauth/libauth";



export interface SwapState {
    placement: number;
    locktime: number;
    vault: UtxoI;
    wallet: SourceOutput[];
    coupons?: UtxoI[];
    chain?: Transaction[];
}

const literal = <L extends string>(l: L): L => l;


export type SourceOutput = Input & Output;


export interface UtxoI {
    txid: string;
    vout: number;
    satoshis: number;
    height?: number;
    coinbase?: boolean;
    token?: TokenI;
}


export interface SendRequest{
    cashaddr: string;
    value: number;
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