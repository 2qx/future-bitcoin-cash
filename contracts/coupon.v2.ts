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
  "bytecode": "OP_0 OP_OUTPUTVALUE OP_LESSTHANOREQUAL OP_VERIFY OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_1ADD OP_TXINPUTCOUNT OP_NUMEQUAL",
  "source": "pragma cashscript ^0.10.0;\n\n// Coupon - apply* utxo coupons by spending at least <amount> on <lock>\n//\n// [Alpha] 2024-05-20\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// Allow anyone to use an unspent output (utxo) in a transaction ...\n//\n// ... given:\n//\n// [ ] the zeroth output value exceeds a predefined amount \n// [ ] the zeroth output is to a predefined address\n// [ ] the coupon must be applied as the last input\n//\n// * Limit one per transaction.\n//\n// Note: this contract is designed to run as part of an integrated\n// multi-contract system. It's not in itself sufficient to assure \n// an advisory doesn't claim all coupons instantly for no cost.\n//\n// ... If there is no time or monetary cost to spend every coupon, \n// it should be expected that they will all be cleaned at once.\n//\n\ncontract Coupon(\n\n  // Minimum spent (sats) to claim each coupon utxo.\n  int amount,\n  \n  // Destination for the zeroth (constraining) output.\n  bytes lock\n\n){\n\n  function apply() {\n    \n    // assure at the minium amount is sent as the first output\n    require(tx.outputs[0].value >= amount);\n\n    // Check that the first output sends to the intended recipient. \n    require(tx.outputs[0].lockingBytecode == lock);\n  \n    // The coupon must be spent as the last input, \n    //   therefore only coupon may be spent at a time.\n    require(this.activeInputIndex+1 == tx.inputs.length);\n\n  }\n\n}\n",
  "debug": {
    "bytecode": "00cc517aa26900cd517a8769c05193c39c",
    "sourceMap": "42:23:42:24;:12::31;:35::41;;:12:::1;:4::43;45:23:45:24:0;:12::41;:45::49;;:12:::1;:4::51;49:12:49:33:0;:34::35;:12:::1;:39::55:0;:12:::1",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": ""
}