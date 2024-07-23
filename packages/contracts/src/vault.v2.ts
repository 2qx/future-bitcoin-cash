// Automatically Generated
export const artifact = {
  "contractName": "Vault",
  "constructorInputs": [
    {
      "name": "locktime",
      "type": "int"
    }
  ],
  "abi": [
    {
      "name": "swap",
      "inputs": []
    }
  ],
  "bytecode": "OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_GREATERTHAN OP_IF OP_DUP OP_CHECKLOCKTIMEVERIFY OP_DROP OP_ENDIF OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUAL OP_NIP",
  "source": "pragma cashscript ^0.10.0;\n\n// Vault - Store coins locked for tokens until maturation date. \n//\n// 2024-06-05\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n//     If redeeming tokens for coins in the vault: \n// [ ]   enforce the timelock is met.\n//\n// [ ] Assure the utxo token category matches that of the output.\n// [ ] Assure the the utxo and output lock match per in the transaction.\n// [ ] Assure an equal amounts of coins are exchanged for tokens\n//\n//\n//  inputs              outputs\n//  [0] contract    ->  [0] contract\n//  [1] userPkh     =>  [1] userPkh\n//  [2] coupon?     -^\n//\n\ncontract Vault(int locktime) {\n\n    function swap() {\n        \n        // If tokens are flowing back into this contract\n        // OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_GREATERTHAN OP_IF \n        if(tx.outputs[this.activeInputIndex].tokenAmount > tx.inputs[this.activeInputIndex].tokenAmount){\n        \n\n            // Enforce a BIP65 timelock \n            // Note, intended for use with block height based locks \n            // (where:  locktime < 500M).\n            // OP_0 OP_PICK OP_CHECKLOCKTIMEVERIFY OP_DROP\n            require(tx.time >= locktime);\n\n\n        } // OP_ENDIF \n         \n        // \n        // Inspired by wrapped.cash c. Nov 2023\n        // Author: Dagur Valberg Johannsson <dagurval@pvv.ntnu.no> \n        // License: MIT\n        //\n        // ensure the token in and out matches\n        // OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUAL OP_VERIFY \n        require(\n          tx.inputs[this.activeInputIndex].tokenCategory \n          == \n          tx.outputs[this.activeInputIndex].tokenCategory\n          );\n\n\n        // Enforce that this contract lives on\n        // OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUAL OP_VERIFY\n        require(\n          tx.outputs[this.activeInputIndex].lockingBytecode \n          == \n          tx.inputs[this.activeInputIndex].lockingBytecode\n          );\n\n\n        // ensure the sum of sats and tokens in \n        // matches the sum of sats and tokens out.\n        // OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD\n        // OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD \n        // OP_NUMEQUAL\n        // OP_NIP        \n        require(\n          tx.inputs[this.activeInputIndex].tokenAmount + \n          tx.inputs[this.activeInputIndex].value \n          == \n          tx.outputs[this.activeInputIndex].tokenAmount + \n          tx.outputs[this.activeInputIndex].value\n         );\n\n    }\n\n}\n",
  "debug": {
    "bytecode": "c0d3c0d0a0630079b17568c0cec0d18769c0cdc0c78769c0d0c0c693c0d3c0cc939c77",
    "sourceMap": "31:22:31:43;:11::56;:69::90;:59::103;:11:::1;:104:41:9:0;38:31:38:39;;:12::41:1;;31:104:41:9;51:20:51:41:0;:10::56;53:21:53:42;:10::57;51::::1;50:8:54:12;60:21:60:42:0;:10::59;62:20:62:41;:10::58;60::::1;59:8:63:12;73:20:73:41:0;:10::54;74:20:74:41;:10::48;73::::1;76:21:76:42:0;:10::55;77:21:77:42;:10::49;76::::1;73;27:4:80:5",
    "logs": [],
    "requires": [
      {
        "ip": 9,
        "line": 38
      },
      {
        "ip": 17,
        "line": 50
      },
      {
        "ip": 23,
        "line": 59
      },
      {
        "ip": 35,
        "line": 72
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-07-01T18:05:27.873Z"
}