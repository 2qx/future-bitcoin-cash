// Automatically Generated
export const artifact = {
  "contractName": "flatSwap",
  "constructorInputs": [
    {
      "name": "funderPk",
      "type": "pubkey"
    }
  ],
  "abi": [
    {
      "name": "trade",
      "inputs": []
    },
    {
      "name": "redeem",
      "inputs": [
        {
          "name": "funderSig",
          "type": "sig"
        }
      ]
    }
  ],
  "bytecode": "OP_OVER OP_0 OP_NUMEQUAL OP_IF OP_2 OP_TXVERSION OP_NUMEQUALVERIFY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTVALUE d007 OP_SUB OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_MUL OP_INPUTINDEX OP_UTXOVALUE OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_MUL OP_GREATERTHANOREQUAL OP_NIP OP_NIP OP_ELSE OP_SWAP OP_1 OP_NUMEQUALVERIFY OP_CHECKSIG OP_ENDIF",
  "source": "pragma cashscript >= 0.8.0;\n\n// COMPLETELY UNTESTED - NOT FOR USE\n//\n// Just testing size of a small automatic swap.\n\ncontract flatSwap(pubkey funderPk) {\n\n    function trade(){\n        require(2 ==tx.version);\n        require(\n            tx.outputs[this.activeInputIndex].tokenCategory ==\n            tx.inputs[this.activeInputIndex].tokenCategory\n        );\n        require(\n            tx.inputs[this.activeInputIndex].lockingBytecode ==\n            tx.outputs[this.activeInputIndex].lockingBytecode\n        );\n\n        // int fee = (abs(\n        //    tx.outputs[this.activeInputIndex].value -\n        //    tx.inputs[this.activeInputIndex].value) \n        //    * 3) / 1000 ;\n        int effectiveK = (tx.outputs[this.activeInputIndex].value - 2000) * \n                           tx.outputs[this.activeInputIndex].tokenAmount;\n        int K = tx.inputs[this.activeInputIndex].value *\n                tx.inputs[this.activeInputIndex].tokenAmount;\n        require(effectiveK >= K);\n    }\n\n    function redeem(sig funderSig){\n        require(checkSig(funderSig, funderPk));\n    }   \n}\n\n",
  "debug": {
    "bytecode": "5179009c6352c29c69c0d1c0ce8769c0c7c0cd8769c0cc02d00794c0d395c0c6c0d095517a517aa2777767517a519c69517a517aac68",
    "sourceMap": "9:4:29:5;;;;;10:16:10:17;:20::30;:16:::1;:8::32;12:23:12:44:0;:12::59;13:22:13:43;:12::58;12::::1;11:8:14:10;16:22:16:43:0;:12::60;17:23:17:44;:12::61;16::::1;15:8:18:10;24:37:24:58:0;:26::65;:68::72;:26:::1;25:38:25:59:0;:27::72;24:25:::1;26:26:26:47:0;:16::54;27:26:27:47;:16::60;26::::1;28::28:26:0;;:30::31;;:16:::1;9:4:29:5;;;31::33::0;;;;;32:25:32:34;;:36::44;;:16::45:1;7:0:34:1",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": ""
}