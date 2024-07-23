
import template from './template/libauth.json';
import { SwapState, UtxoI, SendRequest } from './interface';
import { Coupon } from "./coupon"
import { Vault } from "./vault"

import {
  AnyCompilerConfiguration,
  AuthenticationProgramStateCommon,
  bigIntToVmNumber,
  binToHex,
  cashAddressToLockingBytecode,
  CompilationContextBCH,
  CompilationData,
  Compiler,
  generateTransaction,
  hexToBin,
  importWalletTemplate,
  Output,
  walletTemplateToCompilerBCH
} from "@bitauth/libauth";
import { Utxo } from 'cashscript';


export function swap(state: SwapState): SwapState {
  const couponDefault = 100000000
  const couponAmount = bigIntToVmNumber(BigInt(couponDefault))
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

  if (state.coupons) {
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

export function asInput(utxo: UtxoI, unlockingBytecode) {
  return {
    outpointIndex: utxo.vout,
    outpointTransactionHash: hexToBin(utxo.txid),
    sequenceNumber: 0,
    unlockingBytecode: unlockingBytecode,
  }
}


export function prepareInputs({
  inputs,
  compiler,
  signingKey,
  sourceAddress,
}: {
  inputs: UtxoI[];
  compiler: Compiler<
    CompilationContextBCH,
    AnyCompilerConfiguration<CompilationContextBCH>,
    AuthenticationProgramStateCommon
  >;
  signingKey: Uint8Array;
  sourceAddress: string;
}) {
  const preparedInputs: any[] = [];
  const sourceOutputs: any[] = [];
  for (const i of inputs) {
    const utxoTxnValue = i.satoshis;
    const utxoIndex = i.vout;
    // slice will create a clone of the array
    const utxoOutpointTransactionHash = new Uint8Array(
      i.txid.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    // reverse the cloned copy
    // utxoOutpointTransactionHash.reverse();
    if (!utxoOutpointTransactionHash || utxoIndex === undefined) {
      throw new Error("Missing unspent outpoint when building transaction");
    }

    const libAuthToken = i.token && {
      amount: BigInt(i.token.amount),
      category: hexToBin(i.token.tokenId),
      nft:
        i.token.capability !== undefined || i.token.commitment !== undefined
          ? {
            capability: i.token.capability,
            commitment:
              i.token.commitment !== undefined &&
              hexToBin(i.token.commitment!),
          }
          : undefined,
    };
    const key = signingKey?.length ? signingKey : Uint8Array.from(Array(32));
    const newInput = {
      outpointIndex: utxoIndex,
      outpointTransactionHash: utxoOutpointTransactionHash,
      sequenceNumber: 0,
      unlockingBytecode: {
        compiler,
        data: {
          keys: { privateKeys: { key: key } },
        },
        valueSatoshis: BigInt(utxoTxnValue),
        script: "unlock",
        token: libAuthToken,
      },
    };

    preparedInputs.push(newInput);

    const lockingBytecode = cashAddressToLockingBytecode(sourceAddress);
    if (typeof lockingBytecode === "string") {
      throw lockingBytecode;
    }

    sourceOutputs.push({
      outpointIndex: utxoIndex,
      outpointTransactionHash: utxoOutpointTransactionHash,
      sequenceNumber: 0,
      unlockingBytecode: Uint8Array.from([]),

      // additional info for sourceOutputs
      lockingBytecode: lockingBytecode.bytecode,
      valueSatoshis: BigInt(utxoTxnValue),
      token: libAuthToken,
    });
  }
  return { preparedInputs, sourceOutputs };
}

/**
 * prepareOutputs - create outputs for a transaction from a list of send requests
 *
 * a wrapper function
 *
 * @returns A promise to a list of unspent outputs
 */
export async function prepareOutputs(
  outputs: Array<SendRequest>
) {
  const lockedOutputs: Output[] = [];
  for (const output of outputs) {


    const outputLockingBytecode = cashAddressToLockingBytecode(output.cashaddr);
    if (typeof outputLockingBytecode === "string")
      throw new Error(outputLockingBytecode);

    if (output.value % 1 !== 0) {
      throw Error(
        `Cannot send ${output.value} satoshis, (fractional sats do not exist, yet), please use an integer number.`
      );
    }
    const lockedOutput: Output = {
      lockingBytecode: outputLockingBytecode.bytecode,
      valueSatoshis: BigInt(output.value),
    };
    lockedOutputs.push(lockedOutput);
  }
  return lockedOutputs;
}