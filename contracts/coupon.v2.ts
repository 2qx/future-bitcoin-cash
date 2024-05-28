// Automatically Generated
export const artifact = {
  "contractName": "Coupon",
  "constructorInputs": [
    {
      "name": "amount",
      "type": "int"
    },
    {
      "name": "lock",
      "type": "bytes"
    }
  ],
  "abi": [
    {
      "name": "apply",
      "inputs": []
    }
  ],
  "bytecode": "OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_SUB OP_LESSTHANOREQUAL OP_VERIFY OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_1ADD OP_TXINPUTCOUNT OP_NUMEQUAL",
  "source": "pragma cashscript ^0.10.0;\n\n// Coupon - apply* utxo coupons by spending at least <amount> on <lock>\n//\n// [Alpha] 2024-05-21\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// Allow anyone to use an unspent output (utxo) in a transaction ...\n//\n// ... given:\n//\n// [ ] the zeroth inflow value exceeds a predefined amount \n// [ ] the zeroth output is to a predefined address\n// [ ] the coupon must be applied as the last input\n//\n// * Limit one per transaction.\n//\n// Note: this contract is designed to run as part of an integrated\n// multi-contract system. It's not in itself sufficient to assure \n// an advisory doesn't claim all coupons instantly for no cost.\n//\n// ... If there is no time or monetary cost to spend every coupon, \n// it should be expected that they will all be cleaned at once.\n//\n\ncontract Coupon(\n  // Minimum spent (sats) to claim each coupon utxo.\n  int amount,\n  \n  // Contract holding the logic.\n  bytes lock\n){\n\n  function apply() {\n    \n    // assure at the minium amount is sent to the intended contract\n    require((tx.outputs[0].value - tx.inputs[0].value) >= amount);\n    \n    // Check that the Coupon is interacting with an existing Vault instance \n    require(tx.outputs[0].lockingBytecode == lock);\n    \n    // The coupon must be spent as the last input, \n    //   therefore only coupon may be spent at a time.\n    require(this.activeInputIndex+1 == tx.inputs.length);\n  }\n\n}\n",
  "debug": {
    "bytecode": "00cc00c694517aa26900cd517a8769c05193c39c",
    "sourceMap": "40:24:40:25;:13::32;:45::46;:35::53;:13:::1;:58::64:0;;:12:::1;:4::66;43:23:43:24:0;:12::41;:45::49;;:12:::1;:4::51;47:12:47:33:0;:34::35;:12:::1;:39::55:0;:12:::1",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": ""
}