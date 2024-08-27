import { Wallet, TestNetWallet, RegTestWallet, BaseWallet, SendRequest, TokenSendRequest } from "mainnet-js";
import { SwapState, SwapRequestI } from "./interface";
import { hash256, binToHex, hexToBin, swapEndianness } from "@bitauth/libauth";
import { vaultArtifact, couponArtifact } from "@fbch/contracts";
import { Coupon } from "./coupon"
import { Vault } from "./vault"
import {
    Contract,
    ElectrumNetworkProvider,
    TransactionBuilder, SignatureTemplate
} from "cashscript";
import {
    Utxo as CsUtxo,
    NetworkProvider as CsNetworkProvider
} from "cashscript";

import { delay } from "./util";

/**
 * Split the wallet balance into chunks for swapping. 
 *
 */
async function preparePlacementOutpoints() {
    let balance = await this.getBalance("sats") as number
    let outputs = []
    while (balance > 1_000_800) {
        if (balance > 100_000_800) {
            balance -= 100_000_800
            outputs.push(100_000_800)
        } else if (balance > 10_000_800) {
            balance -= 10_000_800
            outputs.push(10_000_800)
        } else if (balance > 1_000_800) {
            balance -= 1_000_800
            outputs.push(1_000_800)
        }
    }



    let requests = outputs.map(a => {
        return new SendRequest({
            cashaddr: this.getDepositAddress(),
            value: a,
            unit: 'sats',
        })
    })
    const tx = await this.send(requests)
}

async function buildSwapTransaction(state: SwapState, fee = 520n, estimate = false) {

    const vault = state.vault;

    let request

    if (state.requests && state.requests.length > 0) request = state.requests.at(-1)

    // if building the final transaction, change the state.
    if (!estimate) state.requests.pop()

    let provider = state.provider

    let transactionBuilder = new TransactionBuilder({ provider });
    const sigTemplate = new SignatureTemplate(this.privateKey!)

    let vaultContract = new Contract(
        vaultArtifact,
        [BigInt(request.locktime)],
        { provider: provider, addressType: 'p2sh32' }
    );

    let inputs = [
        { ...vault, unlocker: vaultContract.unlock.swap() },
    ];

    const contractOutput = {
        to: vaultContract.tokenAddress,
        amount: BigInt(vault.satoshis) + BigInt(request.placement),
        token: {
            amount: BigInt(vault.token?.amount!) - BigInt(request.placement),
            category: vault.token.category,
        }
    }

    let outputs = [contractOutput]

    // A wallet coin to pay transaction fees, if placing without coupon
    const stub = state.walletStub;

    if (request.placement > 0) {



        // Find a utxo that can match the placement amount
        const walletUtxoIdx = state.wallet.findIndex(utxo => utxo.satoshis === BigInt(request.placement) + 800n);

        let ticket
        if (walletUtxoIdx !== -1) {
            ticket = state.wallet[walletUtxoIdx];
        } else {
            throw ("Could not find suitable utxo")
        }

        // remove the ticket from the wallet
        if (!estimate) state.wallet.splice(walletUtxoIdx, 1);
        const walletInput = { ...ticket, unlocker: sigTemplate.unlockP2PKH() }

        const walletOutput = {
            to: this.getTokenDepositAddress(),
            amount: 800n,
            token: {
                amount: BigInt(request.placement),
                category: vault.token.category,
            }
        }

        inputs.push(walletInput)
        outputs.push(walletOutput)

        if (request.coupon) {

            let couponContract = new Contract(
                couponArtifact,
                [BigInt(request.placement), vaultContract.bytecode],
                { provider: provider, addressType: 'p2sh32' }
            );
            inputs.push({ ...request.coupon, unlocker: couponContract.unlock.apply() })
            //@ts-ignore
            outputs.push({
                to: this.getTokenDepositAddress(),
                amount: request.coupon.satoshis - fee
            })


        } else {

            inputs.push({ ...stub, unlocker: sigTemplate.unlockP2PKH() })
            //@ts-ignore
            outputs.push({
                to: this.getTokenDepositAddress(),
                amount: BigInt(stub.satoshis) - fee
            })
        }
    } else if (request.placement < 0) {
        if (request.coupon) {

            if (BigInt(-request.placement) !== request.coupon.token.amount) {
                throw Error("Partial redemption of tokens not implemented")
            }
            // Unlock the wallet's 
            const walletInput = { ...request.coupon, unlocker: sigTemplate.unlockP2PKH() }


            const walletOutput = {
                to: this.getTokenDepositAddress(),
                amount: request.coupon.token.amount + request.coupon.satoshis - fee
            }

            inputs.push(walletInput)
            //@ts-ignore
            outputs.push(walletOutput)

        } else {
            throw Error("Attempted redemption without token UTXO")
        }
    }


    transactionBuilder.addInputs(inputs);
    transactionBuilder.addOutputs(outputs);
    if (request.placement < 0) transactionBuilder.setLocktime(Number(request.locktime));
    transactionBuilder.setMaxFee(fee + 1n);

    let details

    if (estimate) {
        details = transactionBuilder.build();
        return BigInt(details.length / 2)
    } else {
        let hex = transactionBuilder.build();
        let txid = swapEndianness(binToHex(hash256(hexToBin(hex))))
        state.chain.push(hex)
        // reset the stub utxo paying fees
        state.walletStub = {
            txid: txid,
            vout: 2,
            satoshis: stub.satoshis - fee,
        }

        // reset the vault utxo 
        state.vault = {
            txid: txid,
            vout: 0,
            satoshis: vault.satoshis + BigInt(request.placement),
            token: {
                category: vault.token.category,
                amount: vault.token.amount - BigInt(request.placement)
            }
        }

        return { ...state }
    }
}

async function swapFnRaw(state: SwapState): Promise<SwapState> {


    let actualFee = await this.buildSwapTransaction(state, 1000n, true) as bigint
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


async function swap(requests: SwapRequestI | SwapRequestI[]) {

    if (!Array.isArray(requests)) requests = [requests]
    let provider = new ElectrumNetworkProvider(this.network);
    let wallet = await provider.getUtxos(this.getDepositAddress())
    let stub = wallet.pop()
    let vault = provider.getUtxos(Vault.getAddress(requests[0].locktime, this.network))
    let state = {
        chain: [],
        provider: provider,
        vault: vault,
        requests: requests,
        wallet: wallet,
        walletStub: stub,
    };

    return await this.swap(state)

}

async function sendMaxTokens(cashaddr: string) {

    let sendRequests = await (this.getUtxos()).map(u => {
        return new TokenSendRequest({
            cashaddr: cashaddr,
            value: u.value,
            amount: u.token.amount,
            tokenId: u.token.tokenId,
            capability: u.token.capability
        })
    })
    return await this.send(sendRequests)
}

export class FutureWallet extends Wallet {

    public preparePlacementOutpoints = preparePlacementOutpoints
    public buildSwapTransaction = buildSwapTransaction
    public swap = swap
    public swapFnRaw = swapFnRaw
    public sendMaxTokens = sendMaxTokens

}

export class FutureTestNetWallet extends TestNetWallet {

    public preparePlacementOutpoints = preparePlacementOutpoints
    public buildSwapTransaction = buildSwapTransaction
    public swap = swap
    public swapFnRaw = swapFnRaw
    public sendMaxTokens = sendMaxTokens

}

export class FutureRegTestWallet extends RegTestWallet {

    public preparePlacementOutpoints = preparePlacementOutpoints
    public buildSwapTransaction = buildSwapTransaction
    public swap = swap
    public swapFnRaw = swapFnRaw
    public sendMaxTokens = sendMaxTokens

}
