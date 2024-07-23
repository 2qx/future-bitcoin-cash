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
  "bytecode": "OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_DUP OP_TXLOCKTIME OP_LESSTHANOREQUAL OP_IF OP_TXLOCKTIME OP_2 OP_PICK OP_DIV OP_1ADD OP_2 OP_PICK OP_MUL OP_NIP OP_ENDIF OP_2DUP OP_ADD OP_DUP 0065cd1d OP_LESSTHAN OP_VERIFY OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_SWAP OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_DUP OP_ROT OP_DIV OP_10 OP_MOD OP_0 OP_NUMEQUAL OP_IF OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_ELSE OP_DUP OP_SIZE OP_NIP OP_OVER OP_CAT OP_2 OP_PICK OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_2 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_2 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_3 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_3 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_3 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_4 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_4 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_4 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_5 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_5 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_5 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_6 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_6 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_6 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_7 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUALVERIFY OP_7 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_7 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY 6a044642434804 OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_CAT OP_8 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_8 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_8 OP_OUTPUTVALUE OP_0 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_9 OP_NUMEQUALVERIFY OP_2DROP OP_DROP OP_ENDIF OP_2DROP OP_1",
  "source": "contract Gantry(\n    int step, \n    bytes vaultUnlockingBytecode\n) {\n    function execute() {\n        // Gantry covenant and the associated NFT baton must be spent as index 0\n        // input and passed on to index 0 output, funded with some dust BCH in order\n        // to avoid griefing by someone with access to hashrate\n        require(this.activeInputIndex == 0);\n        require(tx.inputs[this.activeInputIndex].lockingBytecode ==\n            tx.outputs[this.activeInputIndex].lockingBytecode);\n        require(tx.inputs[this.activeInputIndex].tokenCategory ==\n            tx.outputs[this.activeInputIndex].tokenCategory);\n        require(tx.outputs[this.activeInputIndex].value > 800);\n\n        // Read a bytes4 LE commitment and convert to script number\n        int locktime = int(tx.inputs[this.activeInputIndex].nftCommitment);\n\n        // Allow time-skip in case Vault to be minted has already expired\n        if (locktime <= tx.locktime) {\n            locktime = (tx.locktime / step + 1) * step;\n        }\n\n        int nextLocktime = locktime + step;\n\n        // Prevent the spender from rolling over from height-based timelock\n        // to timestamp-based timelock.\n        require(nextLocktime < 500000000);\n\n        // Locktime stored in mutable NFT commitment MUST be incremented by <step>\n        // and stored as bytes4 LE uint again.\n        require(tx.outputs[this.activeInputIndex].nftCommitment ==\n            bytes4(nextLocktime));\n\n        // Every 10th step, skip creating Vault and just increment the commitment\n        if((locktime / step) % 10 == 0) { \n            require(tx.outputs.length == 1);\n        } else {\n            // Construct redeem bytecode for the Vault instance being created\n            bytes theVault = \n                bytes(bytes(locktime).length) + bytes(locktime) + // int locktime\n                vaultUnlockingBytecode;\n            // Construct P2SH32 locking bytecode from redeem bytecode\n            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;\n\n            // Verify creation of Vault genesis outputs\n\n            // [1]\n            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);\n            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[1].nftCommitment == 0x);\n            require(tx.outputs[1].tokenAmount == 2100000000000000);\n            require(tx.outputs[1].value > 800);\n\n            // [2]\n            require(tx.outputs[2].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[2].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[2].nftCommitment == 0x);\n            require(tx.outputs[2].tokenAmount == 2100000000000000);     \n            require(tx.outputs[2].value > 800);\n\n            // [3]\n            require(tx.outputs[3].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[3].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[3].nftCommitment == 0x);\n            require(tx.outputs[3].tokenAmount == 2100000000000000);     \n            require(tx.outputs[3].value > 800);\n\n            // [4]\n            require(tx.outputs[4].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[4].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[4].nftCommitment == 0x);\n            require(tx.outputs[4].tokenAmount == 2100000000000000);     \n            require(tx.outputs[4].value > 800);\n\n            // [5]\n            require(tx.outputs[5].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[5].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[5].nftCommitment == 0x);\n            require(tx.outputs[5].tokenAmount == 2100000000000000);     \n            require(tx.outputs[5].value > 800);\n\n            // [6]\n            require(tx.outputs[6].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[6].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[6].nftCommitment == 0x);\n            require(tx.outputs[6].tokenAmount == 2100000000000000);     \n            require(tx.outputs[6].value > 800);\n\n            // [7]\n            require(tx.outputs[7].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[7].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[7].nftCommitment == 0x);\n            require(tx.outputs[7].tokenAmount == 2100000000000000);     \n            require(tx.outputs[7].value > 800);\n\n            // Tag this FT mint for indexers \n            //\n            // 6a              OP_RETURN\n            // 04 46 42 43 48  <'FBCH'>\n            // 04 90 05 10 00  <locktime>\n            bytes announcement = \n                0x6a044642434804 + \n                tx.inputs[this.activeInputIndex].nftCommitment;\n            require(tx.outputs[8].lockingBytecode == announcement);\n            require(tx.outputs[8].tokenCategory == 0x);\n            require(tx.outputs[8].value == 0);\n\n            // Ensure no other outputs can be created\n            require(tx.outputs.length == 9);\n        }           \n    }\n}",
  "debug": {
    "bytecode": "c0009c69c0c7c0cd8769c0cec0d18769c0cc022003a069c0cf810079c5a163c55279965193527995517a756800795279930079040065cd1d9f69c0d2517a548087690079527a965a97009c63c4519c69670079827751797e52797e02aa205179aa7e01877e51cd5179876951d100c8876951d200876951d3070040075af075079c6951cc022003a06952cd5179876952d100c8876952d200876952d3070040075af075079c6952cc022003a06953cd5179876953d100c8876953d200876953d3070040075af075079c6953cc022003a06954cd5179876954d100c8876954d200876954d3070040075af075079c6954cc022003a06955cd5179876955d100c8876955d200876955d3070040075af075079c6955cc022003a06956cd5179876956d100c8876956d200876956d3070040075af075079c6956cc022003a06957cd5179876957d100c8876957d200876957d3070040075af075079c6957cc022003a069076a044642434804c0cf7e58cd5179876958d100876958cc009c69c4599c6975757568517777",
    "sourceMap": "9:16:9:37;:41::42;:16:::1;:8::44;10:26:10:47:0;:16::64;11:23:11:44;:12::61;10:16:::1;:8::63;12:26:12:47:0;:16::62;13:23:13:44;:12::59;12:16:::1;:8::61;14:27:14:48:0;:16::55;:58::61;:16:::1;:8::63;17:37:17:58:0;:27::73;:23::74:1;20:12:20:20:0;;:24::35;:12:::1;:37:22:9:0;21:24:21:35;:38::42;;:24:::1;:45::46:0;:24:::1;:50::54:0;;:23:::1;:12::55:0;;;20:37:22:9:1;24:27:24:35:0;;:38::42;;:27:::1;28:16:28:28:0;;:31::40;:16:::1;:8::42;32:27:32:48:0;:16::63;33:19:33:31;;:12::32:1;;32:16;:8::34;36:12:36:20:0;;:23::27;;:12:::1;:31::33:0;:11:::1;:37::38:0;:11:::1;:40:38:9:0;37:20:37:37;:41::42;:20:::1;:12::44;38:15:111:9:0;41:28:41:36;;:22::44;;:54::62;;:16::63:1;42::42:38:0;;41::::1;44:41:44:47:0;:58::66;;:50::67:1;:41;:70::74:0;:41:::1;49:31:49:32:0;:20::49;:53::73;;:20:::1;:12::75;50:31:50:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;51:31:51:32:0;:20::47;:51::53;:20:::1;:12::55;52:31:52:32:0;:20::45;:49::65;:20:::1;:12::67;53:31:53:32:0;:20::39;:42::45;:20:::1;:12::47;56:31:56:32:0;:20::49;:53::73;;:20:::1;:12::75;57:31:57:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;58:31:58:32:0;:20::47;:51::53;:20:::1;:12::55;59:31:59:32:0;:20::45;:49::65;:20:::1;:12::67;60:31:60:32:0;:20::39;:42::45;:20:::1;:12::47;63:31:63:32:0;:20::49;:53::73;;:20:::1;:12::75;64:31:64:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;65:31:65:32:0;:20::47;:51::53;:20:::1;:12::55;66:31:66:32:0;:20::45;:49::65;:20:::1;:12::67;67:31:67:32:0;:20::39;:42::45;:20:::1;:12::47;70:31:70:32:0;:20::49;:53::73;;:20:::1;:12::75;71:31:71:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;72:31:72:32:0;:20::47;:51::53;:20:::1;:12::55;73:31:73:32:0;:20::45;:49::65;:20:::1;:12::67;74:31:74:32:0;:20::39;:42::45;:20:::1;:12::47;77:31:77:32:0;:20::49;:53::73;;:20:::1;:12::75;78:31:78:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;79:31:79:32:0;:20::47;:51::53;:20:::1;:12::55;80:31:80:32:0;:20::45;:49::65;:20:::1;:12::67;81:31:81:32:0;:20::39;:42::45;:20:::1;:12::47;84:31:84:32:0;:20::49;:53::73;;:20:::1;:12::75;85:31:85:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;86:31:86:32:0;:20::47;:51::53;:20:::1;:12::55;87:31:87:32:0;:20::45;:49::65;:20:::1;:12::67;88:31:88:32:0;:20::39;:42::45;:20:::1;:12::47;91:31:91:32:0;:20::49;:53::73;;:20:::1;:12::75;92:31:92:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;93:31:93:32:0;:20::47;:51::53;:20:::1;:12::55;94:31:94:32:0;:20::45;:49::65;:20:::1;:12::67;95:31:95:32:0;:20::39;:42::45;:20:::1;:12::47;103:16:103:32:0;104:26:104:47;:16::62;103::::1;105:31:105:32:0;:20::49;:53::65;;:20:::1;:12::67;106:31:106:32:0;:20::47;:51::53;:20:::1;:12::55;107:31:107:32:0;:20::39;:43::44;:20:::1;:12::46;110:20:110:37:0;:41::42;:20:::1;:12::44;38:15:111:9;;;;5:4:112:5;;",
    "logs": [],
    "requires": [
      {
        "ip": 5,
        "line": 9
      },
      {
        "ip": 11,
        "line": 10
      },
      {
        "ip": 17,
        "line": 12
      },
      {
        "ip": 22,
        "line": 14
      },
      {
        "ip": 53,
        "line": 28
      },
      {
        "ip": 61,
        "line": 32
      },
      {
        "ip": 75,
        "line": 37
      },
      {
        "ip": 99,
        "line": 49
      },
      {
        "ip": 105,
        "line": 50
      },
      {
        "ip": 110,
        "line": 51
      },
      {
        "ip": 115,
        "line": 52
      },
      {
        "ip": 120,
        "line": 53
      },
      {
        "ip": 126,
        "line": 56
      },
      {
        "ip": 132,
        "line": 57
      },
      {
        "ip": 137,
        "line": 58
      },
      {
        "ip": 142,
        "line": 59
      },
      {
        "ip": 147,
        "line": 60
      },
      {
        "ip": 153,
        "line": 63
      },
      {
        "ip": 159,
        "line": 64
      },
      {
        "ip": 164,
        "line": 65
      },
      {
        "ip": 169,
        "line": 66
      },
      {
        "ip": 174,
        "line": 67
      },
      {
        "ip": 180,
        "line": 70
      },
      {
        "ip": 186,
        "line": 71
      },
      {
        "ip": 191,
        "line": 72
      },
      {
        "ip": 196,
        "line": 73
      },
      {
        "ip": 201,
        "line": 74
      },
      {
        "ip": 207,
        "line": 77
      },
      {
        "ip": 213,
        "line": 78
      },
      {
        "ip": 218,
        "line": 79
      },
      {
        "ip": 223,
        "line": 80
      },
      {
        "ip": 228,
        "line": 81
      },
      {
        "ip": 234,
        "line": 84
      },
      {
        "ip": 240,
        "line": 85
      },
      {
        "ip": 245,
        "line": 86
      },
      {
        "ip": 250,
        "line": 87
      },
      {
        "ip": 255,
        "line": 88
      },
      {
        "ip": 261,
        "line": 91
      },
      {
        "ip": 267,
        "line": 92
      },
      {
        "ip": 272,
        "line": 93
      },
      {
        "ip": 277,
        "line": 94
      },
      {
        "ip": 282,
        "line": 95
      },
      {
        "ip": 292,
        "line": 105
      },
      {
        "ip": 297,
        "line": 106
      },
      {
        "ip": 302,
        "line": 107
      },
      {
        "ip": 306,
        "line": 110
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-07-01T18:05:28.027Z"
}