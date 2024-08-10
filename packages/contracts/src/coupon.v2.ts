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
  "bytecode": "OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_SUB OP_LESSTHANOREQUAL OP_VERIFY OP_0 OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_1ADD OP_TXINPUTCOUNT OP_NUMEQUAL",
  "source": "pragma cashscript ^0.10.0;\n\n// Coupon - apply* utxo coupons by spending at least <amount> on <lock>\n//\n// 2024-06-05\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// Allow anyone to use an unspent output (utxo) in a transaction ...\n//\n// ... given:\n//\n// [ ] the zeroth inflow value exceeds a predefined amount \n// [ ] the zeroth input is to a predefined address\n// [ ] the coupon must be applied as the last input\n//\n// * Limit one per transaction.\n//\n// Note: This contract is designed to run as part of an integrated\n// multi-contract system. It's not in itself sufficient to assure \n// an advisory doesn't claim all coupons instantly for no cost.\n//\n// Also note: This instance is designed where the `lock`, or destination, \n// is the first input and output. If the locks isn't spendable, or not the first\n// input, coupons will no be redeemable.\n//\n// ... If there is no time or monetary cost to spend every coupon, \n// it should be expected that they will all be cleaned at once.\n//\n\ncontract Coupon(\n  // Minimum spent (sats) to claim each coupon utxo.\n  int amount,\n  \n  // Contract holding the logic.\n  bytes lock\n){\n\n  function apply() {\n    \n    // assure at the minium amount is sent to the intended contract\n    // OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_SUB OP_1 OP_ROLL OP_GREATERTHANOREQUAL OP_VERIFY\n    require((tx.outputs[0].value - tx.inputs[0].value) >= amount);\n\n\n    // Check that the Coupon is interacting with an existing Vault instance \n    // OP_0 OP_UTXOBYTECODE OP_1 OP_ROLL OP_EQUAL OP_VERIFY\n    require(tx.inputs[0].lockingBytecode == lock);\n\n    // The coupon must be spent as the last input, \n    //   therefore only coupon may be spent at a time.\n    // OP_INPUTINDEX OP_1 OP_ADD OP_TXINPUTCOUNT OP_NUMEQUAL\n    require(this.activeInputIndex+1 == tx.inputs.length);\n  }\n\n}\n",
  "debug": {
    "bytecode": "00cc00c694517aa26900c7517a8769c05193c39c",
    "sourceMap": "45:24:45:25;:13::32;:45::46;:35::53;:13:::1;:58::64:0;;:12:::1;:4::66;50:22:50:23:0;:12::40;:44::48;;:12:::1;:4::50;55:12:55:33:0;:34::35;:12:::1;:39::55:0;:12:::1",
    "logs": [],
    "requires": [
      {
        "ip": 10,
        "line": 45
      },
      {
        "ip": 16,
        "line": 50
      },
      {
        "ip": 22,
        "line": 55
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.048Z"
}