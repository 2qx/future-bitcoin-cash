// Automatically Generated
export const artifact = {
  "contractName": "Gantry",
  "constructorInputs": [
    {
      "name": "step",
      "type": "int"
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
  "bytecode": "OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTVALUE OP_INPUTINDEX OP_UTXOVALUE 3421 OP_SUB OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_3 OP_PICK OP_ADD OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_DUP OP_ROT OP_DIV OP_10 OP_MOD OP_0 OP_NUMEQUAL OP_IF OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_ELSE OP_DUP OP_SIZE OP_NIP OP_OVER OP_CAT OP_2 OP_PICK OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_2 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_2 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_3 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_3 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_4 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_4 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_5 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_5 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_6 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_6 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_7 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_7 OP_OUTPUTVALUE e803 OP_NUMEQUALVERIFY OP_8 OP_OUTPUTBYTECODE 6a0446424348 OP_4 OP_PICK OP_SIZE OP_NIP OP_CAT OP_4 OP_PICK OP_CAT OP_EQUALVERIFY OP_8 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_8 OP_OUTPUTVALUE OP_0 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_9 OP_NUMEQUALVERIFY OP_2DROP OP_ENDIF OP_2DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// Gantry - Create vault contracts with fungible tokens in a uniform way. \n//\n// 2024-06-05\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// NFT commentment stores the next series locktime in 32-bit LE\n//\n// [ ] Require the minting baton in the input\n// [ ] Get the current step increment for the chain of futures\n// [ ] Get the current vault locktime to be printed.\n//\n//   either\n// [ ] Mint an array of FT utxos, \n// [ ] send them off to a Vault\n//\n//   or\n// [ ] skip every 10th print.\n//\n// [ ] increment locktime height value stored on NFT baton\n// [ ] assure NFT baton is returned\n//\n//\n//  Gantry i/o Flow:\n//\n//  Inputs              Outputs\n//  [0] NFT mintBaton   ->  [0] NFT mintBaton\n//  [1] topup sats?     =>  [1] FTs Vault\n//                      =>  [2] FTs Vault\n//                      =>  [3] FTs Vault\n//                      =>  [4] FTs Vault\n//                      =>  [5] FTs Vault\n//                      =>  [6] FTs Vault\n//                      =>  [7] FTs Vault\n//                          [8] OP_RETURN FBCH <locktime>\n//  \n//  ... but skip every 10th token print, \n//   which will be printed by the gantry of the next order.\n//  [0] NFT mintBaton   =>  [0] NFT mintBaton\n//\n\n\ncontract Gantry(\n    int step, \n    bytes vaultUnlockingBytecode\n    ) {\n\n    function execute() {\n\n        // Gantry covenant and the associated NFT baton must be spent as index 0\n        // input and passed on to index 0 output, funded with some dust BCH in order\n        // to avoid griefing by someone with access to hashrate\n        require(this.activeInputIndex == 0);\n        require(tx.inputs[this.activeInputIndex].lockingBytecode == \n        tx.outputs[this.activeInputIndex].lockingBytecode);\n        require(tx.inputs[this.activeInputIndex].tokenCategory ==\n            tx.outputs[this.activeInputIndex].tokenCategory);\n        require(tx.outputs[this.activeInputIndex].value == tx.inputs[this.activeInputIndex].value - 8500);\n\n        int locktime = int(tx.inputs[this.activeInputIndex].nftCommitment);\n\n        // Locktime stored in mutable NFT commitment MUST be incremented by <step>\n        // and stored as bytes4 LE uint again.\n        require(tx.outputs[this.activeInputIndex].nftCommitment ==\n            bytes4(locktime + step));\n\n        // Every 10th step, skip creating Vault and just increment the commitment\n        if((locktime / step) % 10 == 0) { \n            require(tx.outputs.length == 1);\n        } else {\n            // Construct redeem bytecode for the Vault instance being created\n            bytes theVault = \n                bytes(bytes(locktime).length) + bytes(locktime) + // int locktime\n                vaultUnlockingBytecode;\n            // Construct P2SH32 locking bytecode from redeem bytecode\n            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;\n\n            // Verify creation of Vault genesis outputs\n            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);\n            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[1].nftCommitment == 0x);\n            require(tx.outputs[1].tokenAmount == 2100000000000000);\n            require(tx.outputs[1].value == 1000);\n\n            require(tx.outputs[2].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[2].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[2].nftCommitment == 0x);\n            require(tx.outputs[2].tokenAmount == 2100000000000000);     \n            require(tx.outputs[2].value == 1000);\n\n            require(tx.outputs[3].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[3].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[3].nftCommitment == 0x);\n            require(tx.outputs[3].tokenAmount == 2100000000000000);     \n            require(tx.outputs[3].value == 1000);\n\n            require(tx.outputs[4].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[4].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[4].nftCommitment == 0x);\n            require(tx.outputs[4].tokenAmount == 2100000000000000);     \n            require(tx.outputs[4].value == 1000);\n\n            require(tx.outputs[5].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[5].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[5].nftCommitment == 0x);\n            require(tx.outputs[5].tokenAmount == 2100000000000000);     \n            require(tx.outputs[5].value == 1000);\n\n            require(tx.outputs[6].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[6].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[6].nftCommitment == 0x);\n            require(tx.outputs[6].tokenAmount == 2100000000000000);     \n            require(tx.outputs[6].value == 1000);\n\n            require(tx.outputs[7].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[7].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[7].nftCommitment == 0x);\n            require(tx.outputs[7].tokenAmount == 2100000000000000);     \n            require(tx.outputs[7].value == 1000);\n\n\n            // Tag FT metadata for indexers \n            //\n            // 6a              OP_RETURN\n            // 04 46 42 43 48  FBCH\n            // 03 90 05 10     <locktime>\n            require(tx.outputs[8].lockingBytecode == 0x6a0446424348 +\n                                  bytes(bytes(locktime).length) +  bytes(locktime));\n            require(tx.outputs[8].tokenCategory == 0x);\n            require(tx.outputs[8].value == 0);\n\n            // Ensure no other outputs can be created\n            require(tx.outputs.length == 9);  \n\n        }     \n        \n    }\n}",
  "debug": {
    "bytecode": "c0009c69c0c7c0cd8769c0cec0d18769c0ccc0c6023421949c69c0cf81c0d25179537993548087690079527a965a97009c63c4519c69670079827751797e52797e02aa205179aa7e01877e51cd5179876951d100c8876951d200876951d3070040075af075079c6951cc02e8039c6952cd5179876952d100c8876952d200876952d3070040075af075079c6952cc02e8039c6953cd5179876953d100c8876953d200876953d3070040075af075079c6953cc02e8039c6954cd5179876954d100c8876954d200876954d3070040075af075079c6954cc02e8039c6955cd5179876955d100c8876955d200876955d3070040075af075079c6955cc02e8039c6956cd5179876956d100c8876956d200876956d3070040075af075079c6956cc02e8039c6957cd5179876957d100c8876957d200876957d3070040075af075079c6957cc02e8039c6958cd066a0446424348547982777e54797e876958d100876958cc009c69c4599c69757568517777",
    "sourceMap": "57:16:57:37;:41::42;:16:::1;:8::44;58:26:58:47:0;:16::64;59:19:59:40;:8::57;58:16:::1;:8::59;60:26:60:47:0;:16::62;61:23:61:44;:12::59;60:16:::1;:8::61;62:27:62:48:0;:16::55;:69::90;:59::97;:100::104;:59:::1;:16;:8::106;64:37:64:58:0;:27::73;:23::74:1;68:27:68:48:0;:16::63;69:19:69:27;;:30::34;;:19:::1;:12::35;;68:16;:8::37;72:12:72:20:0;;:23::27;;:12:::1;:31::33:0;:11:::1;:37::38:0;:11:::1;:40:74:9:0;73:20:73:37;:41::42;:20:::1;:12::44;74:15:139:9:0;77:28:77:36;;:22::44;;:54::62;;:16::63:1;78::78:38:0;;77::::1;80:41:80:47:0;:58::66;;:50::67:1;:41;:70::74:0;:41:::1;83:31:83:32:0;:20::49;:53::73;;:20:::1;:12::75;84:31:84:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;85:31:85:32:0;:20::47;:51::53;:20:::1;:12::55;86:31:86:32:0;:20::45;:49::65;:20:::1;:12::67;87:31:87:32:0;:20::39;:43::47;:20:::1;:12::49;89:31:89:32:0;:20::49;:53::73;;:20:::1;:12::75;90:31:90:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;91:31:91:32:0;:20::47;:51::53;:20:::1;:12::55;92:31:92:32:0;:20::45;:49::65;:20:::1;:12::67;93:31:93:32:0;:20::39;:43::47;:20:::1;:12::49;95:31:95:32:0;:20::49;:53::73;;:20:::1;:12::75;96:31:96:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;97:31:97:32:0;:20::47;:51::53;:20:::1;:12::55;98:31:98:32:0;:20::45;:49::65;:20:::1;:12::67;99:31:99:32:0;:20::39;:43::47;:20:::1;:12::49;101:31:101:32:0;:20::49;:53::73;;:20:::1;:12::75;102:31:102:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;103:31:103:32:0;:20::47;:51::53;:20:::1;:12::55;104:31:104:32:0;:20::45;:49::65;:20:::1;:12::67;105:31:105:32:0;:20::39;:43::47;:20:::1;:12::49;107:31:107:32:0;:20::49;:53::73;;:20:::1;:12::75;108:31:108:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;109:31:109:32:0;:20::47;:51::53;:20:::1;:12::55;110:31:110:32:0;:20::45;:49::65;:20:::1;:12::67;111:31:111:32:0;:20::39;:43::47;:20:::1;:12::49;113:31:113:32:0;:20::49;:53::73;;:20:::1;:12::75;114:31:114:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;115:31:115:32:0;:20::47;:51::53;:20:::1;:12::55;116:31:116:32:0;:20::45;:49::65;:20:::1;:12::67;117:31:117:32:0;:20::39;:43::47;:20:::1;:12::49;119:31:119:32:0;:20::49;:53::73;;:20:::1;:12::75;120:31:120:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;121:31:121:32:0;:20::47;:51::53;:20:::1;:12::55;122:31:122:32:0;:20::45;:49::65;:20:::1;:12::67;123:31:123:32:0;:20::39;:43::47;:20:::1;:12::49;131:31:131:32:0;:20::49;:53::67;132:46:132:54;;:40::62;;131:53::63:1;132:73::81:0;;131:53::82:1;:20;:12::84;133:31:133:32:0;:20::47;:51::53;:20:::1;:12::55;134:31:134:32:0;:20::39;:43::44;:20:::1;:12::46;137:20:137:37:0;:41::42;:20:::1;:12::44;74:15:139:9;;;52:4:141:5;;",
    "logs": [],
    "requires": [
      {
        "ip": 5,
        "line": 57
      },
      {
        "ip": 11,
        "line": 58
      },
      {
        "ip": 17,
        "line": 60
      },
      {
        "ip": 25,
        "line": 62
      },
      {
        "ip": 39,
        "line": 68
      },
      {
        "ip": 53,
        "line": 73
      },
      {
        "ip": 77,
        "line": 83
      },
      {
        "ip": 83,
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
        "ip": 104,
        "line": 89
      },
      {
        "ip": 110,
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
        "ip": 131,
        "line": 95
      },
      {
        "ip": 137,
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
        "ip": 158,
        "line": 101
      },
      {
        "ip": 164,
        "line": 102
      },
      {
        "ip": 169,
        "line": 103
      },
      {
        "ip": 174,
        "line": 104
      },
      {
        "ip": 179,
        "line": 105
      },
      {
        "ip": 185,
        "line": 107
      },
      {
        "ip": 191,
        "line": 108
      },
      {
        "ip": 196,
        "line": 109
      },
      {
        "ip": 201,
        "line": 110
      },
      {
        "ip": 206,
        "line": 111
      },
      {
        "ip": 212,
        "line": 113
      },
      {
        "ip": 218,
        "line": 114
      },
      {
        "ip": 223,
        "line": 115
      },
      {
        "ip": 228,
        "line": 116
      },
      {
        "ip": 233,
        "line": 117
      },
      {
        "ip": 239,
        "line": 119
      },
      {
        "ip": 245,
        "line": 120
      },
      {
        "ip": 250,
        "line": 121
      },
      {
        "ip": 255,
        "line": 122
      },
      {
        "ip": 260,
        "line": 123
      },
      {
        "ip": 273,
        "line": 131
      },
      {
        "ip": 278,
        "line": 133
      },
      {
        "ip": 283,
        "line": 134
      },
      {
        "ip": 287,
        "line": 137
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.038Z"
}