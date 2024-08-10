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
  "bytecode": "OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_DUP OP_0 OP_EQUAL OP_NOT OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUAL OP_BOOLAND OP_IF OP_OVER OP_CHECKLOCKTIMEVERIFY OP_DROP OP_ELSE OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_EQUALVERIFY OP_ENDIF OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_SUB OP_SWAP OP_0 OP_EQUAL OP_NOTIF OP_DUP OP_0 OP_LESSTHAN OP_VERIFY OP_ELSE OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_ENDIF OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUAL OP_NIP OP_NIP",
  "source": "contract Vault(int locktime) {\n\n    function swap() {\n\n        // redeemsDisabled state can either be passed on or irreversibly switched\n        // to enabled after locktime expires.\n        bytes redeemsDisabled = tx.inputs[this.activeInputIndex].nftCommitment;\n        if (redeemsDisabled != 0x && tx.outputs[this.activeInputIndex].nftCommitment == 0x) {\n            // If attempting to enable redeems, the TX must satisfy locktime\n            require(tx.time >= locktime);\n        } else {\n            // Else, just pass it on as it is\n            require(tx.outputs[this.activeInputIndex].nftCommitment == redeemsDisabled);\n        }\n\n        // Mint or redeem, depending on this Vault's NFT state\n        int tokensRedeemed = tx.outputs[this.activeInputIndex].tokenAmount -\n            tx.inputs[this.activeInputIndex].tokenAmount;\n        if (redeemsDisabled != 0x) {\n            require(tokensRedeemed < 0);\n        } else {\n            require(tokensRedeemed > 0);\n        }\n\n        // \n        // Inspired by wrapped.cash c.Nov 2023\n        // Author: Dagur Valberg Johannsson <dagurval@pvv.ntnu.no> \n        // License: MIT\n        //\n        require(\n          tx.inputs[this.activeInputIndex].tokenCategory \n          == \n          tx.outputs[this.activeInputIndex].tokenCategory\n          );\n\n        // Enforce that this contract lives on\n        require(\n          tx.outputs[this.activeInputIndex].lockingBytecode \n          == \n          tx.inputs[this.activeInputIndex].lockingBytecode\n          );\n\n        require(\n          tx.inputs[this.activeInputIndex].tokenAmount + \n          tx.inputs[this.activeInputIndex].value \n          == \n          tx.outputs[this.activeInputIndex].tokenAmount + \n          tx.outputs[this.activeInputIndex].value\n         );\n    }\n\n}\n",
  "debug": {
    "bytecode": "c0cf0079008791c0d200879a635179b17567c0d25179876968c0d3c0d094517a008791630079009f6967007900a06968c0cec0d18769c0cdc0c78769c0d0c0c693c0d3c0cc939c7777",
    "sourceMap": "7:42:7:63;:32::78;8:12:8:27;;:31::33;:12:::1;;:48::69:0;:37::84;:88::90;:37:::1;:12;:92:11:9:0;10:31:10:39;;:12::41:1;;11:15:14:9:0;13:31:13:52;:20::67;:71::86;;:20:::1;:12::88;11:15:14:9;17:40:17:61:0;:29::74;18:22:18:43;:12::56;17:29:::1;19:12:19:27:0;;:31::33;:12:::1;;:35:21:9:0;20:20:20:34;;:37::38;:20:::1;:12::40;21:15:23:9:0;22:20:22:34;;:37::38;:20:::1;:12::40;21:15:23:9;31:20:31:41:0;:10::56;33:21:33:42;:10::57;31::::1;30:8:34:12;38:21:38:42:0;:10::59;40:20:40:41;:10::58;38::::1;37:8:41:12;44:20:44:41:0;:10::54;45:20:45:41;:10::48;44::::1;47:21:47:42:0;:10::55;48:21:48:42;:10::49;47::::1;44;3:4:50:5;",
    "logs": [],
    "requires": [
      {
        "ip": 16,
        "line": 10
      },
      {
        "ip": 24,
        "line": 13
      },
      {
        "ip": 41,
        "line": 20
      },
      {
        "ip": 47,
        "line": 22
      },
      {
        "ip": 54,
        "line": 30
      },
      {
        "ip": 60,
        "line": 37
      },
      {
        "ip": 72,
        "line": 43
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.103Z"
}