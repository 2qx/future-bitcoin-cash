
// @ts-ignore
import packageJson from "../package.json" assert { type: "json" };

import "fake-indexeddb/auto";

import { Cli, Command, Option } from "clipanion";

import {
  swap
} from "@fbch/lib";



import { lockingBytecodeToCashAddress, hexToBin } from "@bitauth/libauth";


abstract class NetworkCommand  {
  isChipnet = Option.Boolean("--chipnet", false, {
    description: "Use chipnet",
  });
  isRegtest = Option.Boolean("--regtest", false,
  {
    description: "Use a regtest network",
  });
}

abstract class CustomFeeCommand extends NetworkCommand {
  fee = Option.String("--fee", {
    required: false,
    description: "transaction fee override",
  });
}

export class SwapCommand extends CustomFeeCommand {
  static override usage = Command.Usage({
    category: `Beneficiary`,
    description: `Regular payments over time`,
  });

  static override paths = [[`annuity`], [`a`]];

  getAddress = Option.Boolean("--deposit", false, {
    description: "give the deposit address for the contract and exit",
  });

  address = Option.String("--address", {
    required: true,
    description:
      "receiving cash address to send coins to, i.e. beneficiary address",
  });
  period = Option.String("--period", {
    required: false,
    description:
      "how often (in blocks) the contract pays (default: 4000, about monthly)",
  });
  allowance = Option.String("--allowance", {
    required: false,
    description:
      "the executor's allowance for miner fees & administration (default: 3400 sats)",
  });
  installment = Option.String("--installment", {
    required: true,
    description: "amount to be paid each period",
  });
  executorAddress = Option.String("--exAddress", {
    required: false,
    description: "address for fee taken by executor for submitting transaction",
  });

  async execute() {
    let network = this.isChipnet
      ? "chipnet"
      : this.isRegtest
      ? "regtest"
      : "mainnet";
    const defaultPeriod = this.isChipnet ? 1n : 4000n;
    let periodInt = !this.period ? defaultPeriod : parseBigInt(this.period);
    let allowanceInt = !this.allowance ? 3400n : parseBigInt(this.allowance);
    let installmentInt = parseBigInt(this.installment);
    let feeOverride = !this.fee ? undefined : parseBigInt(this.fee);
    let version = parseInt(this.version)

    if (!this.getAddress) {
      let a = new Annuity(
        periodInt,
        this.address,
        installmentInt,
        allowanceInt,
        { version: version, network: network }
      );
      await a.info();
      if(await a.isFunded()) a.execute(this.executorAddress, feeOverride);
    } else {
      let a = new Annuity(
        periodInt,
        this.address,
        installmentInt,
        allowanceInt,
        { version: version, network: network }
      );
      await a.info();
    }
  }
}



const cli = new Cli({
  binaryName: "fbch",
  binaryLabel: "@fbch/cli",
  binaryVersion: packageJson.version,
  enableColors: true,
  enableCapture: true
});


export { cli };