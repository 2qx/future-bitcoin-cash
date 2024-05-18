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
  "source": "pragma cashscript ^0.10.0;\n\n// Vault - Store coins locked for tokens until maturation date. \n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n//     If redeeming tokens for coins in the vault: \n// [ ]   enforce the timelock is met.\n//\n// [ ] Assure the utxo token category matches that of the output.\n// [ ] Assure the the utxo and output lock match per in the transaction.\n// [ ] Assure an equal amounts of coins are exchanged for tokens\n//\n// [WIP] 2024-04-25\n//\n//  inputs              outputs\n//  [0] contract    ->  [0] contract\n//  [1] userPkh     =>  [1] userPkh\n//  [2] coupon?     -^\n//\n\ncontract Vault(int locktime) {\n\n    function swap() {\n        \n        // If tokens are flowing back into this contract\n        if(tx.outputs[this.activeInputIndex].tokenAmount > tx.inputs[this.activeInputIndex].tokenAmount){\n            // enforce a BIP65 timelock \n            require(tx.time >= locktime);\n        } \n\n        // \n        // Inspired by wrapped.cash c. Nov 2023\n        // Author: Dagur Valberg Johannsson <dagurval@pvv.ntnu.no> \n        // License: MIT\n        //\n        require(\n          tx.inputs[this.activeInputIndex].tokenCategory \n          == \n          tx.outputs[this.activeInputIndex].tokenCategory\n          );\n\n        // Enforce that this contract lives on\n        require(\n          tx.outputs[this.activeInputIndex].lockingBytecode \n          == \n          tx.inputs[this.activeInputIndex].lockingBytecode\n          );\n\n        require(\n          tx.inputs[this.activeInputIndex].tokenAmount + \n          tx.inputs[this.activeInputIndex].value \n          == \n          tx.outputs[this.activeInputIndex].tokenAmount + \n          tx.outputs[this.activeInputIndex].value\n         );\n    }\n\n}\n",
  "debug": {
    "bytecode": "c0d3c0d0a0630079b17568c0cec0d18769c0cdc0c78769c0d0c0c693c0d3c0cc939c77",
    "sourceMap": "29:22:29:43;:11::56;:69::90;:59::103;:11:::1;:104:32:9:0;31:31:31:39;;:12::41:1;;29:104:32:9;40:20:40:41:0;:10::56;42:21:42:42;:10::57;40::::1;39:8:43:12;47:21:47:42:0;:10::59;49:20:49:41;:10::58;47::::1;46:8:50:12;53:20:53:41:0;:10::54;54:20:54:41;:10::48;53::::1;56:21:56:42:0;:10::55;57:21:57:42;:10::49;56::::1;53;26:4:59:5",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": ""
}