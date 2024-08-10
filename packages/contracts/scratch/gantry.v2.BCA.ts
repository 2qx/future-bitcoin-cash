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
  "bytecode": "OP_INPUTINDEX OP_0 OP_NUMEQUALVERIFY OP_INPUTINDEX OP_UTXOBYTECODE OP_INPUTINDEX OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_3 OP_PICK OP_ADD OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_DUP OP_ROT OP_DIV OP_10 OP_MOD OP_0 OP_NUMEQUAL OP_IF OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_ELSE OP_DUP OP_SIZE OP_NIP OP_OVER OP_4 OP_NUM2BIN OP_CAT OP_2 OP_PICK OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTVALUE 2003 OP_GREATERTHAN OP_VERIFY 6a044642434804 OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_CAT OP_2 OP_OUTPUTBYTECODE OP_OVER OP_EQUALVERIFY OP_2 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_2 OP_OUTPUTVALUE OP_0 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_3 OP_NUMEQUALVERIFY OP_2DROP OP_DROP OP_ENDIF OP_2DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\ncontract Gantry(\n    int step, \n    bytes vaultUnlockingBytecode\n    ) {\n    function execute(){\n        // Gantry covenant and the associated NFT baton must be spent as index 0\n        // input and passed on to index 0 output, funded with some dust BCH in order\n        // to avoid griefing by someone with access to hashrate\n        require(this.activeInputIndex == 0);\n        require(tx.inputs[this.activeInputIndex].lockingBytecode == tx.outputs[this.activeInputIndex].lockingBytecode);\n        require(tx.inputs[this.activeInputIndex].tokenCategory == tx.outputs[this.activeInputIndex].tokenCategory);\n        require(tx.outputs[this.activeInputIndex].value > 800);\n\n        // Read a bytes4 LE commitment and convert to script number\n        int locktime = int(tx.inputs[this.activeInputIndex].nftCommitment);\n\n        // Locktime stored in mutable NFT commitment MUST be incremented by <step>\n        // and stored as bytes4 LE uint again.\n        require(tx.outputs[this.activeInputIndex].nftCommitment == bytes4(locktime+step));\n\n        // Every 10th step, skip creating Vault and just increment the commitment\n        if((locktime/step)%10==0){ \n            require(tx.outputs.length == 1);\n        } else {\n            // Construct redeem bytecode for the Vault instance being created\n            bytes theVault = \n                bytes(bytes(locktime).length) + bytes4(locktime) +     // locktime\n                vaultUnlockingBytecode;\n            // Construct P2SH32 locking bytecode from redeem bytecode\n            bytes vaultLockingBytecode = 0xaa20 + hash256(theVault) + 0x87;\n\n            // Verify creation of exactly one Vault genesis output\n            require(tx.outputs[1].lockingBytecode == vaultLockingBytecode);       \n            require(tx.outputs[1].tokenCategory == tx.inputs[0].outpointTransactionHash);\n            require(tx.outputs[1].tokenAmount == 2100000000000000);     \n            require(tx.outputs[1].value > 800);\n\n            // Tag this FT mint for indexers \n            //\n            // 6a              OP_RETURN\n            // 04 46 42 43 48  <'FBCH'>\n            // 04 90 05 10 00  <locktime>\n            bytes announcement = 0x6a044642434804 + tx.inputs[this.activeInputIndex].nftCommitment;\n            require(tx.outputs[2].lockingBytecode == announcement);\n            require(tx.outputs[2].tokenCategory == 0x);\n            require(tx.outputs[2].value == 0);\n\n            // Ensure no other outputs can be created\n            require(tx.outputs.length == 3);\n        }           \n    }\n}",
  "debug": {
    "bytecode": "c0009c69c0c7c0cd8769c0cec0d18769c0cc022003a069c0cf81c0d25179537993548087690079527a965a97009c63c4519c696700798277517954807e52797e02aa205179aa7e01877e51cd5179876951d100c8876951d3070040075af075079c6951cc022003a069076a044642434804c0cf7e52cd5179876952d100876952cc009c69c4539c6975757568517777",
    "sourceMap": "11:16:11:37;:41::42;:16:::1;:8::44;12:26:12:47:0;:16::64;:79::100;:68::117;:16:::1;:8::119;13:26:13:47:0;:16::62;:77::98;:66::113;:16:::1;:8::115;14:27:14:48:0;:16::55;:58::61;:16:::1;:8::63;17:37:17:58:0;:27::73;:23::74:1;21:27:21:48:0;:16::63;:74::82;;:83::87;;:74:::1;:67::88;;:16;:8::90;24:12:24:20:0;;:21::25;;:12:::1;:27::29:0;:11:::1;:31::32:0;:11:::1;:33:26:9:0;25:20:25:37;:41::42;:20:::1;:12::44;26:15:52:9:0;29:28:29:36;;:22::44;;:55::63;;:48::64:1;;:16;30::30:38:0;;29::::1;32:41:32:47:0;:58::66;;:50::67:1;:41;:70::74:0;:41:::1;35:31:35:32:0;:20::49;:53::73;;:20:::1;:12::75;36:31:36:32:0;:20::47;:61::62;:51::87;:20:::1;:12::89;37:31:37:32:0;:20::45;:49::65;:20:::1;:12::67;38:31:38:32:0;:20::39;:42::45;:20:::1;:12::47;45:33:45:49:0;:62::83;:52::98;:33:::1;46:31:46:32:0;:20::49;:53::65;;:20:::1;:12::67;47:31:47:32:0;:20::47;:51::53;:20:::1;:12::55;48:31:48:32:0;:20::39;:43::44;:20:::1;:12::46;51:20:51:37:0;:41::42;:20:::1;:12::44;26:15:52:9;;;;7:4:53:5;;",
    "logs": [],
    "requires": [
      {
        "ip": 5,
        "line": 11
      },
      {
        "ip": 11,
        "line": 12
      },
      {
        "ip": 17,
        "line": 13
      },
      {
        "ip": 22,
        "line": 14
      },
      {
        "ip": 36,
        "line": 21
      },
      {
        "ip": 50,
        "line": 25
      },
      {
        "ip": 76,
        "line": 35
      },
      {
        "ip": 82,
        "line": 36
      },
      {
        "ip": 87,
        "line": 37
      },
      {
        "ip": 92,
        "line": 38
      },
      {
        "ip": 102,
        "line": 46
      },
      {
        "ip": 107,
        "line": 47
      },
      {
        "ip": 112,
        "line": 48
      },
      {
        "ip": 116,
        "line": 51
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.358Z"
}