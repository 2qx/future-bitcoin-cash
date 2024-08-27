import { Transaction,
    Input,
    Output } from "@bitauth/libauth";

import { 
    Utxo as CsUtxo, 
    NetworkProvider  as CsNetworkProvider
} from "cashscript";

export interface SwapState {
    provider: CsNetworkProvider; 
    vault: CsUtxo;
    walletStub: CsUtxo;
    wallet: CsUtxo[];
    requests?: SwapRequestI[];
    chain?: string[];
}

export interface SwapRequestI{
    // 
    // redemptions are negative placements
    // redemption coupons are carry fungible tokens 
    //
    placement: number;
    locktime: number;
    coupon?: CsUtxo;
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