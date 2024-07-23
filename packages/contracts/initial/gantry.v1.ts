// Automatically Generated
export const artifact = {
  "contractName": "Gantry",
  "constructorInputs": [
    {
      "name": "tokenCategory",
      "type": "bytes32"
    },
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
  "bytecode": "OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_0 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_BIN2NUM OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_0 OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_3 OP_PICK OP_ADD OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_SWAP OP_DIV OP_10 OP_MOD OP_0 OP_NUMEQUAL OP_IF OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_ELSE 20 OP_0 OP_OUTPOINTTXHASH OP_CAT OP_4 OP_CAT OP_0 OP_UTXOTOKENCOMMITMENT OP_CAT OP_OVER OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY OP_2 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY OP_3 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY OP_4 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY OP_5 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY OP_6 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY OP_7 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENAMOUNT 00c06e31d91001 OP_NUMEQUALVERIFY 6a 534d5030 OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT 1000 OP_SIZE OP_SWAP OP_CAT OP_CAT 46424348 OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT OP_8 OP_SIZE OP_SWAP OP_CAT OP_CAT OP_8 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_8 OP_OUTPUTVALUE OP_0 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_9 OP_NUMEQUALVERIFY OP_2DROP OP_DROP OP_ENDIF OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n//\n// Gantry - Create vault contracts with fungible tokens in a uniform way. \n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// NFT commentment stores the next series locktime in 32-bit LE\n//\n// [ ] Require the minting baton in the input\n// [ ] Get the current step increment for the chain of futures\n// [ ] Get the current vault locktime to be printed.\n//\n//   either\n// [ ] Mint an array of FT utxos, \n// [ ] send them off to a Vault\n//\n//   or\n// [ ] skip every 10th print.\n//\n// [ ] increment locktime height value stored on NFT baton\n// [ ] assure NFT baton is returned\n//\n//\n//  Gantry i/o Flow:\n//\n//  Inputs              Outputs\n//  [0] NFT mintBaton   ->  [0] NFT mintBaton\n//  [1] topup sats?     =>  [1] FTs Vault\n//                          [2] FTs Vault\n//                          [3] FTs Vault\n//                          [4] FTs Vault\n//                          [5] FTs Vault\n//                          [6] FTs Vault\n//                          [7] FTs Vault\n//                          [8] OP_RETURN SMP0 1000 FBCH <locktime>\n//                          \n//  \n//  ... but skip every 10th token print, \n//   which will be printed by the gantry of the next order.\n//  [0] NFT mintBaton   =>  [0] NFT mintBaton\n//\n\n\ncontract Gantry(\n    bytes32 tokenCategory, \n    bytes4 stepBytes, \n    bytes vaultUnlockingBytecode\n    ) {\n\n    function execute(){\n        \n        // Gantry covenant must be passed on\n        // in first outputs[0] in any case.\n        require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode);\n\n        // Verify mutable NFT baton is correct\n        require(tx.inputs[0].tokenCategory.split(32)[0] == tokenCategory);\n\n        // Return mutable NFT baton\n        // to outputs[0] in any case.\n        require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);\n        \n        // simply return the NFT baton without minting FTs\n        require(tx.outputs[0].tokenAmount == 0);\n\n        int step = int(stepBytes);\n        int locktime = int(bytes4(tx.inputs[0].nftCommitment));\n\n        // Height stored in mutable NFT commitment MUST be incremented by <step>.\n        require(tx.outputs[0].nftCommitment == bytes4(locktime+step));\n\n        // if not a 10th step, mint tokens\n        if((locktime/step)%10==0){ \n            require(tx.outputs.length == 1);\n        } else {\n            // Get the redeem bytecode of the vault instance\n            bytes theVault = \n                0x20 + tx.inputs[0].outpointTransactionHash +   // new fungible category\n                0x04 + bytes4(tx.inputs[0].nftCommitment) +     // locktime\n                vaultUnlockingBytecode;    \n\n            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;\n\n            // shard out tokens across seven UTXOs\n            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[1].tokenAmount == 300000000000000);     \n\n            require(tx.outputs[2].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[2].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[2].tokenAmount == 300000000000000);  \n\n            require(tx.outputs[3].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[3].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[3].tokenAmount == 300000000000000);  \n\n            require(tx.outputs[4].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[4].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[4].tokenAmount == 300000000000000);  \n\n            require(tx.outputs[5].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[5].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[5].tokenAmount == 300000000000000);  \n\n            require(tx.outputs[6].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[6].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[6].tokenAmount == 300000000000000);  \n\n            require(tx.outputs[7].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[7].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[7].tokenAmount == 300000000000000);  \n\n            // Tag this FT mint for indexers \n            //\n            // 6a              OP_RETURN\n            // 04 46 42 43 48  SMP0\n            // 02 10 00        minted ticker from input 0\n            // 04 46 42 43 48  FBCH\n            // 04 90 05 10 00  <locktime>\n            bytes announcement = new LockingBytecodeNullData([\n                bytes('SMP0'),\n                0x1000,\n                bytes('FBCH'),\n                tx.inputs[0].nftCommitment,\n                0x08\n                ]);\n            require(tx.outputs[8].lockingBytecode == announcement);\n\n            // Is this check necessary if the op_return is used?\n            require(tx.outputs[8].value == 0);\n            require(int(tx.outputs.length) == 9);  \n\n        }     \n        \n    }\n}",
  "debug": {
    "bytecode": "00c700cd876900ce01207f75517a876900ce00d1876900d3009c69007a8100cf8100d2517953799354808769007a517a965a97009c63c4519c6967012000c87e547e00cf7e51797e02aa205179aa7e01877e51cd5179876951d100c8876951d30700c06e31d910019c6952cd5179876952d100c8876952d30700c06e31d910019c6953cd5179876953d100c8876953d30700c06e31d910019c6954cd5179876954d100c8876954d30700c06e31d910019c6955cd5179876955d100c8876955d30700c06e31d910019c6956cd5179876956d100c8876956d30700c06e31d910019c6957cd5179876957d100c8876957d30700c06e31d910019c69016a04534d50308276014ba063014c7c7e687c7e7e021000827c7e7e04464243488276014ba063014c7c7e687c7e7e00cf8276014ba063014c7c7e687c7e7e58827c7e7e58cd5179876958cc009c69c4599c69757575685177",
    "sourceMap": "57:26:57:27;:16::44;:59::60;:48::77;:16:::1;:8::79;60:26:60:27:0;:16::42;:49::51;:16::52:1;:::55;:59::72:0;;:16:::1;:8::74;64:26:64:27:0;:16::42;:57::58;:46::73;:16:::1;:8::75;67:27:67:28:0;:16::41;:45::46;:16:::1;:8::48;69:23:69:32:0;;:19::33:1;70:44:70:45:0;:34::60;:23::62:1;73:27:73:28:0;:16::43;:54::62;;:63::67;;:54:::1;:47::68;;:16;:8::70;76:12:76:20:0;;:21::25;;:12:::1;:27::29:0;:11:::1;:31::32:0;:11:::1;:33:78:9:0;77:20:77:37;:41::42;:20:::1;:12::44;78:15:136:9:0;81:16:81:20;:33::34;:23::59;:16:::1;82::82:20:0;81::::1;82:40::41:0;:30::56;81:16::57:1;83::83:38:0;;81::::1;85:41:85:47:0;:58::66;;:50::67:1;:41;:70::74:0;:41:::1;88:31:88:32:0;:20::49;:53::73;;:20:::1;:12::75;89:31:89:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;90:31:90:32:0;:20::45;:49::64;:20:::1;:12::66;92:31:92:32:0;:20::49;:53::73;;:20:::1;:12::75;93:31:93:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;94:31:94:32:0;:20::45;:49::64;:20:::1;:12::66;96:31:96:32:0;:20::49;:53::73;;:20:::1;:12::75;97:31:97:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;98:31:98:32:0;:20::45;:49::64;:20:::1;:12::66;100:31:100:32:0;:20::49;:53::73;;:20:::1;:12::75;101:31:101:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;102:31:102:32:0;:20::45;:49::64;:20:::1;:12::66;104:31:104:32:0;:20::49;:53::73;;:20:::1;:12::75;105:31:105:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;106:31:106:32:0;:20::45;:49::64;:20:::1;:12::66;108:31:108:32:0;:20::49;:53::73;;:20:::1;:12::75;109:31:109:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;110:31:110:32:0;:20::45;:49::64;:20:::1;:12::66;112:31:112:32:0;:20::49;:53::73;;:20:::1;:12::75;113:31:113:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;114:31:114:32:0;:20::45;:49::64;:20:::1;:12::66;123:33:129:18:0;124:22:124:28;:16::29;;;;;;;;;;;;125::125:22;;;;;126:22:126:28;:16::29;;;;;;;;;;;;127:26:127:27;:16::42;;;;;;;;;;;;;128::128:20;;;;;130:31:130:32;:20::49;:53::65;;:20:::1;:12::67;133:31:133:32:0;:20::39;:43::44;:20:::1;:12::46;134:24:134:41:0;:46::47;:20:::1;:12::49;78:15:136:9;;;;53:4:138:5;",
    "logs": [],
    "requires": [
      {
        "ip": 8,
        "line": 57
      },
      {
        "ip": 17,
        "line": 60
      },
      {
        "ip": 23,
        "line": 64
      },
      {
        "ip": 28,
        "line": 67
      },
      {
        "ip": 45,
        "line": 73
      },
      {
        "ip": 59,
        "line": 77
      },
      {
        "ip": 85,
        "line": 88
      },
      {
        "ip": 91,
        "line": 89
      },
      {
        "ip": 96,
        "line": 90
      },
      {
        "ip": 102,
        "line": 92
      },
      {
        "ip": 108,
        "line": 93
      },
      {
        "ip": 113,
        "line": 94
      },
      {
        "ip": 119,
        "line": 96
      },
      {
        "ip": 125,
        "line": 97
      },
      {
        "ip": 130,
        "line": 98
      },
      {
        "ip": 136,
        "line": 100
      },
      {
        "ip": 142,
        "line": 101
      },
      {
        "ip": 147,
        "line": 102
      },
      {
        "ip": 153,
        "line": 104
      },
      {
        "ip": 159,
        "line": 105
      },
      {
        "ip": 164,
        "line": 106
      },
      {
        "ip": 170,
        "line": 108
      },
      {
        "ip": 176,
        "line": 109
      },
      {
        "ip": 181,
        "line": 110
      },
      {
        "ip": 187,
        "line": 112
      },
      {
        "ip": 193,
        "line": 113
      },
      {
        "ip": 198,
        "line": 114
      },
      {
        "ip": 255,
        "line": 130
      },
      {
        "ip": 260,
        "line": 133
      },
      {
        "ip": 264,
        "line": 134
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-07-01T18:05:28.066Z"
}