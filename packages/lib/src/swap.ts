
import template from './template/libauth.json';
import { SwapState } from './interface';
import { Coupon } from "./coupon"
import { Vault } from "./vault"
import {
    importWalletTemplate,
    walletTemplateToCompilerBCH,
    generateTransaction,
    CompilationData,
    bigIntToVmNumber
} from "@bitauth/libauth";


export function swap(state: SwapState): SwapState {
    const couponDefault = 100000
    const couponAmount = bigIntToVmNumber(BigInt(100000))
    const vaultLocktimeVmNumber = bigIntToVmNumber(BigInt(state.locktime))
    const vaultLock = Vault.getLockingBytecode(state.locktime)
    const couponLock = Coupon.getLockingBytecode(couponDefault, vaultLock)

    const walletTemplate = importWalletTemplate(template);
    if (typeof walletTemplate == 'string') {
        throw walletTemplate;
    }
    let compiler = walletTemplateToCompilerBCH(walletTemplate)
    const locking_data: CompilationData<never> = {
        bytecode: {
            vault_locktime: vaultLocktimeVmNumber,
            coupon_amount: couponAmount,
            coupon_lock: couponLock
        },
    };
    let lockingBytecodeResult = compiler.generateBytecode({
        data: locking_data,
        scriptId: 'coupon',
        debug: true
    })
    if (!lockingBytecodeResult.success) console.log(lockingBytecodeResult)


    let inputs = []

    // Push the vault input
    inputs.push(Vault.asInput(state.locktime, state.vault))

    // TODO ... wallet inputs
    
    if(state.coupons){
        const coupon = state.coupons.pop()
        const lock = Vault.getLockingBytecode(state.locktime)
        inputs.push(Coupon.asInput(couponDefault, lock, coupon!))
    }

    let outputs = []
    
    // Push the vault output 
    outputs.push(Vault.asOutput(state.locktime, state.vault, state.placement))

    // TODO ... wallet change and stuff

    let txResponse = generateTransaction({
        locktime: 0,
        version: 2,
        inputs, outputs,
    });

    
    if (txResponse.success) {
        state.chain?.push(txResponse.transaction)
    } else {
        throw txResponse
    }
    state.placement = 0;
    return state.placement > 0 ? swap(state) : state

}

