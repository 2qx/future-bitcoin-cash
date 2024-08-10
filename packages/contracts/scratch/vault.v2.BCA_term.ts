// Automatically Generated
export const artifact = {
  "contractName": "Vault",
  "constructorInputs": [
    {
      "name": "locktime",
      "type": "int"
    },
    {
      "name": "maxSupply",
      "type": "int"
    }
  ],
  "abi": [
    {
      "name": "SwapOrTerminate",
      "inputs": []
    }
  ],
  "bytecode": "OP_INPUTINDEX OP_OUTPUTBYTECODE 6a OP_EQUAL OP_IF OP_DUP OP_CHECKLOCKTIMEVERIFY OP_DROP OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_2 OP_PICK OP_NUMEQUALVERIFY OP_ELSE OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_SUB OP_0 OP_GREATERTHAN OP_DUP OP_IF OP_OVER OP_CHECKLOCKTIMEVERIFY OP_DROP OP_ENDIF OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUALVERIFY OP_DROP OP_ENDIF OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUAL OP_NIP OP_NIP",
  "source": "contract Vault(int locktime, int maxSupply) {\n\n    function SwapOrTerminate() {\n\n        if (tx.outputs[this.activeInputIndex].lockingBytecode == 0x6a) {\n\n            // If the vault is being terminated then\n            // locktime must be expired...\n            require(tx.time >= locktime);\n            // ...and the exact amount of tokens returned to\n            // the Vault instance which is getting burned.\n            require(tx.outputs[this.activeInputIndex].tokenAmount ==\n                maxSupply);\n\n        } else {\n\n            // If tokens are being redeemed to the vault\n            // tokens may be redeemed in any amount after the future has matured\n            bool tokensRedeemed = (\n            tx.outputs[this.activeInputIndex].tokenAmount \n            - tx.inputs[this.activeInputIndex].tokenAmount\n            ) > 0;\n\n            // Restrict redemption unil after locktime\n            if(tokensRedeemed){\n                // enforce a BIP65 timelock \n                require(tx.time >= locktime);\n            } \n\n            // Pass on the contract and bch+token balance\n            require(tx.outputs[this.activeInputIndex].lockingBytecode == \n                tx.inputs[this.activeInputIndex].lockingBytecode);\n            require(tx.inputs[this.activeInputIndex].tokenAmount +\n                tx.inputs[this.activeInputIndex].value == \n                tx.outputs[this.activeInputIndex].tokenAmount + \n                tx.outputs[this.activeInputIndex].value);\n        }\n        // Pass on the token category & capability in any case\n        require(tx.inputs[this.activeInputIndex].tokenCategory ==\n            tx.outputs[this.activeInputIndex].tokenCategory);\n    }\n}\n",
  "debug": {
    "bytecode": "c0cd016a87630079b175c0d352799c6967c0d3c0d09400a00079635179b17568c0cdc0c78769c0d0c0c693c0d3c0cc939c697568c0cec0d1877777",
    "sourceMap": "5:23:5:44;:12::61;:65::69;:12:::1;:71:15:9:0;9:31:9:39;;:12::41:1;;12:31:12:52:0;:20::65;13:16:13:25;;12:20:::1;:12::27;15:15:37:9:0;20:23:20:44;:12::57;21:24:21:45;:14::58;20:12:::1;22:16:22:17:0;19:34:::1;25:15:25:29:0;;:30:28:13;27:35:27:43;;:16::45:1;;25:30:28:13;31:31:31:52:0;:20::69;32:26:32:47;:16::64;31:20:::1;:12::66;33:30:33:51:0;:20::64;34:26:34:47;:16::54;33:20:::1;35:27:35:48:0;:16::61;36:27:36:48;:16::55;35::::1;33:20;:12::57;15:15:37:9;;39:26:39:47:0;:16::62;40:23:40:44;:12::59;39:16:::1;3:4:41:5;",
    "logs": [],
    "requires": [
      {
        "ip": 9,
        "line": 9
      },
      {
        "ip": 16,
        "line": 12
      },
      {
        "ip": 30,
        "line": 27
      },
      {
        "ip": 38,
        "line": 31
      },
      {
        "ip": 50,
        "line": 33
      },
      {
        "ip": 58,
        "line": 39
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.123Z"
}