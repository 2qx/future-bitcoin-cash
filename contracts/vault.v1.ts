// Automatically Generated
export const artifact = {
  "contractName": "Vault",
  "constructorInputs": [
    {
      "name": "locktime",
      "type": "bytes4"
    },
    {
      "name": "tokenCategory",
      "type": "bytes32"
    }
  ],
  "abi": [
    {
      "name": "swap",
      "inputs": []
    }
  ],
  "bytecode": "OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_SUB OP_0 OP_GREATERTHAN OP_INPUTINDEX OP_OUTPUTBYTECODE aa20 OP_ACTIVEBYTECODE OP_HASH256 OP_CAT 87 OP_CAT OP_EQUAL OP_BOOLAND OP_IF OP_DUP OP_BIN2NUM OP_CHECKLOCKTIMEVERIFY OP_DROP OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_2 OP_PICK OP_EQUALVERIFY OP_ENDIF OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUAL OP_NIP OP_NIP",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-17\n\n// Future BCH fungible token vault\n//\n//  Flow:\n//\n//  inputs              outputs\n//  [0] contract    ->  [0] contract\n//  [1] coupon?     =>  [1] userPkh\n//  [2] .. userPkh     ^\n//\n\ncontract Vault(bytes4 locktime, bytes32 tokenCategory) {\n\n    function swap() {\n        \n        // If tokens are being redeemed to the vault\n        // tokens may be redeemed in any amount after the future has matured\n        bool tokensRedeemed = (tx.outputs[this.activeInputIndex].tokenAmount - tx.inputs[this.activeInputIndex].tokenAmount) > 0;\n        bool toVault = tx.outputs[this.activeInputIndex].lockingBytecode == new LockingBytecodeP2SH32(hash256(this.activeBytecode));\n\n        if(tokensRedeemed && toVault){\n          \n            // enforce BIP65 timelocks and the direction of the swap \n            require(tx.time >= int(locktime));\n            require(tx.outputs[this.activeInputIndex].tokenCategory == tokenCategory);\n        } \n\n        // \n        // Inspired by wrapped.cash\n        // Dagur Valberg 2023\n        // License: MIT\n        //\n        require(\n          tx.inputs[this.activeInputIndex].tokenCategory \n          == \n          tx.outputs[this.activeInputIndex].tokenCategory\n          );\n\n        // Enforce that this contract lives on\n        require(\n          tx.outputs[this.activeInputIndex].lockingBytecode \n          == \n          tx.inputs[this.activeInputIndex].lockingBytecode\n          );\n\n        require(\n          tx.inputs[this.activeInputIndex].tokenAmount + \n          tx.inputs[this.activeInputIndex].value \n          == \n          tx.outputs[this.activeInputIndex].tokenAmount + \n          tx.outputs[this.activeInputIndex].value\n         );\n    }\n\n    // shard or split\n    // \n}\n",
  "debug": {
    "bytecode": "c0d3c0d09400a0c0cd02aa20c1aa7e01877e87517a517a9a63007981b175c0d15279876968c0cec0d18769c0cdc0c78769c0d0c0c693c0d3c0cc939c7777",
    "sourceMap": "21:42:21:63;:31::76;:89::110;:79::123;:31:::1;:127::128:0;:30:::1;22:34:22:55:0;:23::72;:76::131;:110::129;:102::130:1;:76::131:0;;;:23:::1;24:11:24:25:0;;:29::36;;:11:::1;:37:29:9:0;27:35:27:43;;:31::44:1;:12::46;;28:31:28:52:0;:20::67;:71::84;;:20:::1;:12::86;24:37:29:9;37:20:37:41:0;:10::56;39:21:39:42;:10::57;37::::1;36:8:40:12;44:21:44:42:0;:10::59;46:20:46:41;:10::58;44::::1;43:8:47:12;50:20:50:41:0;:10::54;51:20:51:41;:10::48;50::::1;53:21:53:42:0;:10::55;54:21:54:42;:10::49;53::::1;50;17:4:56:5;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-25T14:23:34.069Z"
}