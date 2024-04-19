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
      "name": "placeOrRedeem",
      "inputs": [
        {
          "name": "isRedeem",
          "type": "bool"
        }
      ]
    }
  ],
  "bytecode": "OP_0 OP_UTXOTOKENAMOUNT OP_0 OP_OUTPUTTOKENAMOUNT OP_SUB OP_3 OP_ROLL OP_IF OP_OVER OP_BIN2NUM OP_CHECKLOCKTIMEVERIFY OP_DROP OP_1 OP_UTXOTOKENCATEGORY OP_3 OP_PICK OP_EQUALVERIFY OP_0 OP_UTXOTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOVALUE OP_OVER OP_GREATERTHANOREQUAL OP_VERIFY OP_ELSE OP_0 OP_UTXOTOKENCATEGORY OP_3 OP_PICK OP_EQUALVERIFY OP_1 OP_UTXOTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_0 OP_OUTPUTVALUE OP_OVER OP_GREATERTHANOREQUAL OP_VERIFY OP_ENDIF OP_0 OP_OUTPUTBYTECODE aa20 OP_ACTIVEBYTECODE OP_HASH256 OP_CAT 87 OP_CAT OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUAL OP_NIP OP_NIP OP_NIP",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-17\n\n// Future BCH fungible token vault\n//\n//  Flow:\n//\n//  inputs              outputs\n//  [0] contract    ->  [0] contract\n//  [1] userPkh     =>  [1] userPkh\n//  [2] coupon?     ^\n//\n\ncontract Vault(bytes4 locktime, bytes32 tokenCategory) {\n\n    function placeOrRedeem(bool isRedeem) {\n\n        // If Is Redeem\n        // enforce BIP65 timelocks and the direction of the swap \n        // tokens may be redeemed in any amount after the future has matured\n        int deltaToken = tx.inputs[0].tokenAmount - tx.outputs[0].tokenAmount;\n        if(isRedeem){\n          require(tx.time >= int(locktime));\n          // Check this is the correct token and not a random token\n          require(tx.inputs[1].tokenCategory == tokenCategory);\n\n          // Check the transaction took no tokens from the contract\n          require(tx.inputs[0].tokenAmount == 0);\n\n          // Check the user isn't taking more sats than tokens placed\n          require(tx.inputs[0].value >= deltaToken);\n        } \n        // else Placement\n        else{\n          // Check this is the correct token and not a random token\n          require(tx.inputs[0].tokenCategory == tokenCategory);\n          \n          // The user input may not contain tokens in placement\n          require(tx.inputs[1].tokenAmount == 0);\n\n          // Check the user isn't taking more tokens than value placed\n          require(tx.outputs[0].value >= deltaToken);\n          \n        }\n\n        // Make sure this contract is the the first output, \n        // and by extension from the next require, the first input\n        require(tx.outputs[0].lockingBytecode == new LockingBytecodeP2SH32(hash256(this.activeBytecode)));\n\n        // Enforce that this contract lives on\n        require(\n          tx.outputs[this.activeInputIndex].lockingBytecode \n          == \n          tx.inputs[this.activeInputIndex].lockingBytecode\n          );\n\n        require(\n          tx.inputs[this.activeInputIndex].tokenAmount + \n          tx.inputs[this.activeInputIndex].value \n          == \n          tx.outputs[this.activeInputIndex].tokenAmount + \n          tx.outputs[this.activeInputIndex].value\n         );\n    }\n\n    // shard or split\n    // \n}\n",
  "debug": {
    "bytecode": "00d000d394537a63517981b17551ce5379876900d0009c6900c65179a2696700ce5379876951d0009c6900cc5179a2696800cd02aa20c1aa7e01877e8769c0cdc0c78769c0d0c0c693c0d3c0cc939c777777",
    "sourceMap": "22:35:22:36;:25::49;:63::64;:52::77;:25:::1;23:11:23:19:0;;:20:33:9;24:33:24:41;;:29::42:1;:10::44;;26:28:26:29:0;:18::44;:48::61;;:18:::1;:10::63;29:28:29:29:0;:18::42;:46::47;:18:::1;:10::49;32:28:32:29:0;:18::36;:40::50;;:18:::1;:10::52;35:12:45:9:0;37:28:37:29;:18::44;:48::61;;:18:::1;:10::63;40:28:40:29:0;:18::42;:46::47;:18:::1;:10::49;43:29:43:30:0;:18::37;:41::51;;:18:::1;:10::53;35:12:45:9;49:27:49:28:0;:16::45;:49::104;:83::102;:75::103:1;:49::104:0;;;:16:::1;:8::106;53:21:53:42:0;:10::59;55:20:55:41;:10::58;53::::1;52:8:56:12;59:20:59:41:0;:10::54;60:20:60:41;:10::48;59::::1;62:21:62:42:0;:10::55;63:21:63:42;:10::49;62::::1;59;17:4:65:5;;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-19T18:30:44.536Z"
}