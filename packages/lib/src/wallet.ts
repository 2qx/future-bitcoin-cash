import { Wallet, TestNetWallet, RegTestWallet, BaseWallet, SendRequest, TokenSendRequest } from "mainnet-js";
import { SwapState, SwapRequestI } from "./interface";
import { hash256, binToHex, hexToBin, swapEndianness } from "@bitauth/libauth";
import { vaultArtifact, couponArtifact } from "@fbch/contracts";
import { deriveLockingBytecode } from "./util"
import { Vault } from "./vault"
import {
    Contract,
    ElectrumNetworkProvider,
    TransactionBuilder, SignatureTemplate,
    HashType
} from "cashscript";
import {
    Utxo as CsUtxo,
    NetworkProvider as CsNetworkProvider
} from "cashscript";

import { asCsUtxo, delay, prefixFromNetworkMap } from "./util";
import { CATEGORY_MAP, TIMELOCK_MAP } from "./constant";


const TOKEN_SATS = 800;
const MINER_FEE = 345;
const EXTRA = TOKEN_SATS + MINER_FEE;




async function buildSwapTransaction(state: SwapState, fee = 546n, estimate = false) {

    let request

    if (state.requests && state.requests.length > 0) request = state.requests.at(-1)

    const vault = state.vaults.get(request.locktime);

    // if building the final transaction, change the state.
    if (!estimate) state.requests.pop()

    let provider = state.provider

    let transactionBuilder = new TransactionBuilder({ provider });
    const sigTemplate = new SignatureTemplate(this.privateKey!, HashType.SIGHASH_ALL)

    let vaultContract = new Contract(
        vaultArtifact,
        [BigInt(request.locktime)],
        { provider: provider, addressType: 'p2sh32' }
    );


    let inputs = [
        { ...vault, unlocker: vaultContract.unlock.swap() },
    ];

    let placement: bigint
    if (request.placement) placement = BigInt(request.placement)
    if (request.future) placement = -BigInt(request.future.token.amount);


    const contractOutput = {
        to: vaultContract.tokenAddress,
        amount: BigInt(vault.satoshis) + placement,
        token: {
            amount: BigInt(vault.token?.amount!) - placement,
            category: vault.token.category,
        }
    }

    let outputs = [contractOutput]


    // placement with coupon
    if (request.coupon) {

        // Find a wallet utxo that matches the exact placement amount plus fees
        const walletUtxoIdx = state.wallet.findIndex(utxo => utxo.satoshis > placement + BigInt(EXTRA));

        let ticket
        if (walletUtxoIdx !== -1) {
            ticket = state.wallet[walletUtxoIdx];
        } else {
            throw ("Could not find suitable utxo for coupon, try shaping wallet")
        }

        // remove the used utxo from the wallet
        if (!estimate) state.wallet.splice(walletUtxoIdx, 1);

        const walletInput = { ...ticket, unlocker: sigTemplate.unlockP2PKH() }

        const walletOutput = {
            to: this.getTokenDepositAddress(),
            amount: 800n,
            token: {
                amount: placement,
                category: vault.token.category,
            }
        }

        inputs.push(walletInput)
        outputs.push(walletOutput)

        let lock = deriveLockingBytecode(vaultContract.tokenAddress)
        let couponContract = new Contract(
            couponArtifact,
            [placement, lock],
            { provider: provider, addressType: 'p2sh32' }
        );
        inputs.push({ ...request.coupon, unlocker: couponContract.unlock.apply() })
        //@ts-ignore
        outputs.push({
            to: this.getTokenDepositAddress(),
            amount: (ticket.satoshis + request.coupon.satoshis) - (fee + placement + 800n)
        })

    } else if (request.future) {

        if (-placement !== request.future.token.amount) {
            throw Error("Partial redemption of tokens not implemented")
        }
        // Unlock the wallet's 
        const walletInput = { ...request.future, unlocker: sigTemplate.unlockP2PKH() }


        const walletOutput = {
            to: this.getTokenDepositAddress(),
            amount: request.future.token.amount + request.future.satoshis - fee
        }

        inputs.push(walletInput)
        //@ts-ignore
        outputs.push(walletOutput)

    } else if (!request.coupon && request.placement > 0) {
        // Find a utxo that can match the placement amount
        const walletUtxoIdx = state.wallet.findIndex(utxo => utxo.satoshis > placement + BigInt(EXTRA));

        let ticket
        if (walletUtxoIdx !== -1) {
            ticket = state.wallet[walletUtxoIdx];
        } else {
            throw ("Could not find single suitable utxo for placement")
        }

        // remove the ticket from the wallet
        if (!estimate) state.wallet.splice(walletUtxoIdx, 1);
        const walletInput = { ...ticket, unlocker: sigTemplate.unlockP2PKH() }

        const walletOutput = {
            to: this.getTokenDepositAddress(),
            amount: 800n,
            token: {
                amount: placement,
                category: vault.token.category,
            }
        }

        inputs.push(walletInput)
        outputs.push(walletOutput)

        // if there is change...
        if (ticket.satoshis - placement - fee > 543n) {
            //@ts-ignore
            outputs.push({
                to: this.getTokenDepositAddress(),
                amount: ticket.satoshis - placement
            })
        }

    } else {
        throw Error("Could not interpret swap request")
    }



    console.log(inputs)
    console.log(outputs)
    transactionBuilder.addInputs(inputs);
    transactionBuilder.addOutputs(outputs);
    if (placement < 0) transactionBuilder.setLocktime(Number(request.locktime));
    if (estimate) transactionBuilder.setMaxFee(BigInt(fee) + 5000n);
    if (!estimate) transactionBuilder.setMaxFee(BigInt(fee) + 1n);

    let details

    if (estimate) {
        details = transactionBuilder.build();
        return BigInt(details.length / 2)
    } else {

        let hex = transactionBuilder.build();
        let txid = swapEndianness(binToHex(hash256(hexToBin(hex))))
        state.chain.push(hex)

        // reset the vault utxo 
        state.vaults.set(request.locktime, {
            txid: txid,
            vout: 0,
            satoshis: vault.satoshis + placement,
            token: {
                category: vault.token.category,
                amount: vault.token.amount - placement
            }
        })

        return { ...state }
    }
}

async function swapFnRaw(state: SwapState): Promise<SwapState> {


    let actualFee = await this.buildSwapTransaction(state, BigInt(MINER_FEE) + 100n, true) as bigint
    console.log(actualFee)
    state = await this.buildSwapTransaction(state, actualFee) as SwapState

    // recursively process requests
    // return stack when done.
    if (state.requests && state.requests.length > 0) {
        return this.swapFnRaw(state)
    } else {
        state.chain.map(async (tx) => {
            await state.provider.sendRawTransaction(tx)
            delay(100)
        })
        return state
    }

}

async function getVaultUtxoMap(requests: SwapRequestI[], provider: ElectrumNetworkProvider) {

    // get distinct list of locktimes
    let locktimes = [...new Set(requests.map(item => item.locktime))];

    let vaultUtxoSet = new Map();

    // get vault Utxo Sets of the 
    for (const lock of locktimes) {
        console.log(Vault.getAddress(lock, prefixFromNetworkMap[provider.network]))
        const vaultUtxos = (await provider.getUtxos(Vault.getAddress(lock, prefixFromNetworkMap[provider.network])))
        let randomVaultUtxo = vaultUtxos
            .filter(u => u.token && u.token.category == TIMELOCK_MAP.get(lock))
            .sort((a, b) => Number(a.satoshis) - Number(b.satoshis)).pop();
        vaultUtxoSet.set(lock, randomVaultUtxo)
    }
    return vaultUtxoSet;
}

async function swap(requests: SwapRequestI | SwapRequestI[], provider?: ElectrumNetworkProvider) {

    if (!Array.isArray(requests)) requests = [requests];
    if (!provider) provider = new ElectrumNetworkProvider(this.network);

    let wallet = (await this.getUtxos()).map(u => asCsUtxo(u))
    let vaults = await this.getVaultUtxoMap(requests, provider)
    let state = {
        chain: [],
        provider: provider,
        vaults: vaults,
        requests: requests,
        wallet: wallet,
    };

    return await this.swapFnRaw(state)

}

async function sendMaxFungibleTokens(cashaddr: string) {

    let sendRequests = (await (this.getUtxos()))
        .filter(u => u.token)
        .filter(u => !u.token.capability)
        .map(u => {
            return new TokenSendRequest({
                cashaddr: cashaddr,
                value: u.satoshis,
                amount: u.token.amount,
                tokenId: u.token.tokenId
            })

        })
    return await this.send(sendRequests)
}

export class FutureWallet extends Wallet {

    public buildSwapTransaction = buildSwapTransaction
    public swap = swap
    public swapFnRaw = swapFnRaw
    public sendMaxFungibleTokens = sendMaxFungibleTokens
    public getVaultUtxoMap = getVaultUtxoMap

}

export class FutureTestNetWallet extends TestNetWallet {

    public buildSwapTransaction = buildSwapTransaction
    public swap = swap
    public swapFnRaw = swapFnRaw
    public sendMaxFungibleTokens = sendMaxFungibleTokens
    public getVaultUtxoMap = getVaultUtxoMap

}

export class FutureRegTestWallet extends RegTestWallet {

    public buildSwapTransaction = buildSwapTransaction
    public swap = swap
    public swapFnRaw = swapFnRaw
    public sendMaxFungibleTokens = sendMaxFungibleTokens
    public getVaultUtxoMap = getVaultUtxoMap

}
