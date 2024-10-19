import {
    Transaction,
    Input,
    Output
} from "@bitauth/libauth";

import {
    NetworkProvider as CsNetworkProvider
} from "cashscript";


export interface CsUtxo {
    txid: string;
    vout: number;
    satoshis: bigint;
    token?: TokenDetails;
}

export interface CouponDataI {
    locktime: number;
    placement: number;
    address: string;
    lockingBytecode: string;
}

export interface CouponItemI {
    id: string;
    address: string;
    utxo: CsUtxo;
    spb?: number;
    ytm?: number;
    ypa?: number;
    locale?: rateSetLocale;
    locktime?: number;
    placement?: number;
    lockingBytecode?: string;
}

export interface TokenDetails {
    amount: bigint;
    category: string;
    nft?: {
        capability: 'none' | 'mutable' | 'minting';
        commitment: string;
    };
}

export interface rateSet {
    spb: number;
    ytm: number;
    ypa: number;
}

export interface rateSetLocale {
    spb: string;
    ytm: string;
    ypa: string;
}

export interface SwapState {
    provider: CsNetworkProvider;
    vaults: Map<number, CsUtxo>;
    wallet: CsUtxo[];
    requests?: SwapRequestI[];
    chain?: string[];
}

export type SwapRequestI = SwapRequestCouponI | SwapRequestPlacementI | SwapRequestFutureI;

export interface SwapRequestCouponI {
    locktime: number;
    placement: number;
    coupon: CsUtxo;
}

export interface SwapRequestPlacementI {
    locktime: number;
    placement: number;
}

export interface SwapRequestFutureI {
    future: CsUtxo;
    locktime: number;
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


export interface UtxoItemI {
    cashaddr: string;
    utxo: UtxoI;
}





export interface SendRequest {
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