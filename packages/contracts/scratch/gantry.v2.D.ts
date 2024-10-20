// Automatically Generated
export const artifact = {
  "contractName": "Gantry",
  "constructorInputs": [
    {
      "name": "stepBytes",
      "type": "bytes4"
    },
    {
      "name": "vaultUnlockingBytecode",
      "type": "bytes"
    }
  ],
  "abi": [
    {
      "name": "execute",
      "inputs": []
    }
  ],
  "bytecode": "OP_TXINPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_0 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE 8813 OP_SUB OP_NUMEQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_BIN2NUM OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_0 OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_3 OP_PICK OP_ADD OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_SWAP OP_DIV OP_10 OP_MOD OP_0 OP_NUMEQUAL OP_IF OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_ELSE OP_4 OP_0 OP_UTXOTOKENCOMMITMENT OP_CAT OP_OVER OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT 00c05773a57c02 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_1 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_2 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT 00c05773a57c02 OP_NUMEQUALVERIFY OP_2 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_2 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_3 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT 00c05773a57c02 OP_NUMEQUALVERIFY OP_3 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_3 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_4 OP_NUMEQUALVERIFY OP_2DROP OP_ENDIF OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n//\n// DETERMISTIC Gantry - Create vault contracts with fungible tokens in a uniform way. \n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// NFT commentment stores the next series locktime in 32-bit LE\n//\n// [ ] Require the minting baton in the input\n// [ ] Get the current step increment for the chain of futures\n// [ ] Get the current vault locktime to be printed.\n//\n//   either\n// [ ] Mint an array of FT utxos, \n// [ ] send them off to a Vault\n//\n//   or\n// [ ] skip every 10th print.\n//\n// [ ] increment locktime height value stored on NFT baton\n// [ ] assure NFT baton is returned\n//\n//\n//  Gantry i/o Flow:\n//\n//  Inputs              Outputs\n//  [0] NFT mintBaton   ->  [0] NFT mintBaton\n//  [1] topup sats?     =>  [1] FTs Vault\n//                          [2] FTs Vault\n//                          [3] FTs Vault\n//                          \n//  \n//  ... but skip every 10th token print, \n//   which will be printed by the gantry of the next order.\n//  [0] NFT mintBaton   =>  [0] NFT mintBaton\n//\n\n\ncontract Gantry(\n    bytes4 stepBytes, \n    bytes vaultUnlockingBytecode\n    ) {\n\n    function execute(){\n        \n        // All from a single input\n        require(tx.inputs.length == 1);\n        \n        // Gantry covenant must be passed on\n        // in first outputs[0] in any case.\n        require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode);\n\n        // Return mutable NFT baton\n        // to outputs[0] in any case.\n        require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);\n\n        // Allow 5k sats for all expenditures\n        require(tx.outputs[0].value == (tx.inputs[0].value - 5000));     \n\n        // simply return the NFT baton without minting FTs\n        require(tx.outputs[0].tokenAmount == 0);\n\n        int step = int(stepBytes);\n        int locktime = int(tx.inputs[0].nftCommitment);\n\n        // Height stored in mutable NFT commitment MUST be incremented by <step>.\n        require(tx.outputs[0].nftCommitment == bytes4(locktime+step));\n\n        // if not a 10th step, mint tokens\n        if((locktime/step)%10==0){ \n            require(tx.outputs.length == 1);\n        } else {\n            // Get the redeem bytecode of the vault instance\n            bytes theVault = \n                0x04 + bytes4(tx.inputs[0].nftCommitment) +     // locktime\n                vaultUnlockingBytecode;    \n\n            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;\n\n            // Shard out tokens across three UTXOs\n            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[1].tokenAmount == 700000000000000);     \n            require(tx.outputs[1].nftCommitment == 0x);    \n            require(tx.outputs[1].value == 1000);     \n\n            require(tx.outputs[2].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[2].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[2].tokenAmount == 700000000000000);  \n            require(tx.outputs[2].nftCommitment == 0x); \n            require(tx.outputs[2].value == 1000);  \n\n            require(tx.outputs[3].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[3].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[3].tokenAmount == 700000000000000); \n            require(tx.outputs[3].nftCommitment == 0x); \n            require(tx.outputs[3].value == 1000);   \n\n            require(tx.outputs.length == 4);  \n\n        }     \n        \n    }\n}",
  "debug": {
    "bytecode": "c3519c6900c700cd876900ce00d1876900cc00c6028813949c6900d3009c69007a8100cf8100d2517953799354808769007a517a965a97009c63c4519c69675400cf7e51797e02aa205179aa7e01877e51cd5179876951d100c8876951d30700c05773a57c029c6951d200876951cc02e8039c6952cd5179876952d100c8876952d30700c05773a57c029c6952d200876952cc02e8039c6953cd5179876953d100c8876953d30700c05773a57c029c6953d200876953cc02e8039c69c4549c697575685177",
    "sourceMap": "50:16:50:32;:36::37;:16:::1;:8::39;54:26:54:27:0;:16::44;:59::60;:48::77;:16:::1;:8::79;58:26:58:27:0;:16::42;:57::58;:46::73;:16:::1;:8::75;61:27:61:28:0;:16::35;:50::51;:40::58;:61::65;:40:::1;:16::66;:8::68;64:27:64:28:0;:16::41;:45::46;:16:::1;:8::48;66:23:66:32:0;;:19::33:1;67:37:67:38:0;:27::53;:23::54:1;70:27:70:28:0;:16::43;:54::62;;:63::67;;:54:::1;:47::68;;:16;:8::70;73:12:73:20:0;;:21::25;;:12:::1;:27::29:0;:11:::1;:31::32:0;:11:::1;:33:75:9:0;74:20:74:37;:41::42;:20:::1;:12::44;75:15:104:9:0;78:16:78:20;:40::41;:30::56;:16::57:1;79::79:38:0;;78::::1;81:41:81:47:0;:58::66;;:50::67:1;:41;:70::74:0;:41:::1;84:31:84:32:0;:20::49;:53::73;;:20:::1;:12::75;85:31:85:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;86:31:86:32:0;:20::45;:49::64;:20:::1;:12::66;87:31:87:32:0;:20::47;:51::53;:20:::1;:12::55;88:31:88:32:0;:20::39;:43::47;:20:::1;:12::49;90:31:90:32:0;:20::49;:53::73;;:20:::1;:12::75;91:31:91:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;92:31:92:32:0;:20::45;:49::64;:20:::1;:12::66;93:31:93:32:0;:20::47;:51::53;:20:::1;:12::55;94:31:94:32:0;:20::39;:43::47;:20:::1;:12::49;96:31:96:32:0;:20::49;:53::73;;:20:::1;:12::75;97:31:97:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;98:31:98:32:0;:20::45;:49::64;:20:::1;:12::66;99:31:99:32:0;:20::47;:51::53;:20:::1;:12::55;100:31:100:32:0;:20::39;:43::47;:20:::1;:12::49;102:20:102:37:0;:41::42;:20:::1;:12::44;75:15:104:9;;;47:4:106:5;",
    "logs": [],
    "requires": [
      {
        "ip": 5,
        "line": 50
      },
      {
        "ip": 11,
        "line": 54
      },
      {
        "ip": 17,
        "line": 58
      },
      {
        "ip": 25,
        "line": 61
      },
      {
        "ip": 30,
        "line": 64
      },
      {
        "ip": 47,
        "line": 70
      },
      {
        "ip": 61,
        "line": 74
      },
      {
        "ip": 82,
        "line": 84
      },
      {
        "ip": 88,
        "line": 85
      },
      {
        "ip": 93,
        "line": 86
      },
      {
        "ip": 98,
        "line": 87
      },
      {
        "ip": 103,
        "line": 88
      },
      {
        "ip": 109,
        "line": 90
      },
      {
        "ip": 115,
        "line": 91
      },
      {
        "ip": 120,
        "line": 92
      },
      {
        "ip": 125,
        "line": 93
      },
      {
        "ip": 130,
        "line": 94
      },
      {
        "ip": 136,
        "line": 96
      },
      {
        "ip": 142,
        "line": 97
      },
      {
        "ip": 147,
        "line": 98
      },
      {
        "ip": 152,
        "line": 99
      },
      {
        "ip": 157,
        "line": 100
      },
      {
        "ip": 161,
        "line": 102
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.317Z"
}