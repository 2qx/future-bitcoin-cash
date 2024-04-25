// Automatically Generated
export const artifact = {
  "contractName": "Battery",
  "constructorInputs": [
    {
      "name": "end",
      "type": "int"
    },
    {
      "name": "startTime",
      "type": "int"
    },
    {
      "name": "gantryUnlockingBytecode",
      "type": "bytes"
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
  "bytecode": "OP_SWAP OP_CHECKLOCKTIMEVERIFY OP_DROP OP_TXINPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_4 OP_PICK OP_SIZE OP_NIP OP_5 OP_ROLL OP_CAT OP_4 OP_CAT OP_ROT OP_CAT 20 OP_CAT OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_CAT OP_3 OP_ROLL OP_CAT aa20 OP_SWAP OP_HASH256 OP_CAT 87 OP_CAT OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_2 OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_BIN2NUM OP_0 OP_NUMEQUALVERIFY OP_EQUALVERIFY OP_0 OP_UTXOVALUE OP_0 OP_OUTPUTVALUE OP_1 OP_OUTPUTVALUE OP_ADD OP_SUB e803 OP_LESSTHAN OP_VERIFY OP_DUP OP_ROT OP_LESSTHAN OP_IF OP_DUP OP_10 OP_MUL OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_ELSE OP_0 OP_OUTPUTBYTECODE 6a OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_0 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_ENDIF OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-23\n\n// A Battery of Gantries to deploy Vaults.\n//                   \n// A Battery makes a series of Gantries at different powers of 10 that go on to create Futures Vaults at various intervals.\n//\n// Given a minting NFT with the data 0xA0000000, \n// mint a sequence of NFTs with minting capability\n// sending those NFTs to the corresponting Gantry \n//\n//  execute():\n//\n//  inputs                           outputs\n//  [0] Battery + NFT 0xA0000000     ->  [0] Gantry02  + NFT* 0x64000000<startTime>\n//                                   =>  [1] Battery   + NFT  0x64000000\n//\n//  [0] Battery + NFT 0x64000000     ->  [0] Gantry03  + NFT* 0xE8030000<startTime>\n//                                   =>  [1] Battery   + NFT  0xE8030000\n//\n//  ... 10270000 10e5\n//  ... A0860100 10e6\n//  ...\n//\n//  [0] Battery + NFT 0x<end>        ->  [0] Battery   + NFT  0x6a // burn NFT, sats are unencumbered.\n//\n// \n\ncontract Battery(\n\n    // \n    // int start, // is set in NFT mint.\n\n    // final step increment of longest gantry interval for expiry series\n    //   i.e. 10^6, every 1,000,000 blocks, 20.8 years\n    int end,\n\n    // starting block height\n    int startTime,\n\n    // sha256 hash of gantry unlocking bytecode \n    bytes gantryUnlockingBytecode,\n\n    // sha256 hash of vault unlocking bytecode \n    bytes vaultUnlockingBytecode,\n\n    ) {\n\n    function execute(){\n\n        require(tx.time >= int(startTime));\n        \n        // We allow only 1 input, creator must provide enough BCH \n        // when they make the Battery UTXO.\n        require(tx.inputs.length == 1);\n    \n\n        // There is something fishy going on here with the log stack\n        // and the new debug tools. re-test behavior after rkalis' patch.\n        bytes4 stepBytes = bytes4(tx.inputs[0].nftCommitment);\n        int step = int(tx.inputs[0].nftCommitment);\n\n        // Get the redeem bytecode of the gantry instance\n        bytes gantryRedeemBytecode = bytes(vaultUnlockingBytecode.length) + vaultUnlockingBytecode +\n                                     0x04 + stepBytes                   +  // stepBytes\n                                     0x20 + tx.inputs[0].tokenCategory.split(32)[0]  +  // This tokenCategory\n                                     gantryUnlockingBytecode;    \n\n        require(\n            0xaa20 + hash256(gantryRedeemBytecode) + 0x87\n            == tx.outputs[0].lockingBytecode\n        );\n\n        bytes batteryCategory, bytes batteryCapability = tx.inputs[0].tokenCategory.split(32);\n\n        // assure a mutable token is set\n        require(batteryCapability == 0x02);\n\n        bytes gantryCategory, bytes gantryCapability = tx.outputs[0].tokenCategory.split(32);\n        // assure a minting token is set\n        require(int(gantryCapability) == 0);\n\n        // Require the Gantry category to match the Battery.\n        require(batteryCategory == gantryCategory);\n\n        require((tx.inputs[0].value - (tx.outputs[0].value + tx.outputs[1].value)) < 1000);\n        \n        if(step < end) {\n\n            // Minting NFT commitment MUST increase magnitude by 10.\n            require(\n                bytes4(step * 10) == tx.outputs[1].nftCommitment\n            );\n\n            // Minting NFT must be passed on\n            // to outputs[0] in any case.\n            require(\n                tx.inputs[0].tokenCategory\n                == tx.outputs[1].tokenCategory\n            );\n        \n            // Battery NFT must be passed on\n            // to outputs[1] in any case.\n            require(\n                tx.inputs[0].lockingBytecode\n                == tx.outputs[1].lockingBytecode\n            );\n        }else{\n            // Battery NFT must be passed on\n            // to outputs[0] in any case.\n            require(\n                tx.outputs[0].lockingBytecode == 0x6a\n            );\n            // Burn minting baton NFT\n            require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);\n        }\n            \n        \n    }\n}\n\n        ",
  "debug": {
    "bytecode": "517ab175c3519c6900cf00cf8154798277557a7e547e527a7e01207e00ce01207f757e537a7e02aa20517aaa7e01877e00cd876900ce01207f007a52876900d101207f007a81009c69517a517a876900c600cc51cc939402e8039f690079527a9f6300795a95548051d2876900ce51d1876900c751cd87696700cd016a876900ce00d18769685177",
    "sourceMap": "52:31:52:40;;:8::43:1;;56:16:56:32:0;:36::37;:16:::1;:8::39;61:44:61:45:0;:34::60;62:33:62:34;:23::49;:19::50:1;65:43:65:65:0;;:::72;;:76::98;;:37:::1;66::66:41:0;65::::1;66:44::53:0;;65:37:::1;67::67:41:0;65::::1;67:54::55:0;:44::70;:77::79;:44::80:1;:::83;65:37;68::68:60:0;;65::::1;71:12:71:18:0;:29::49;;:21::50:1;:12;:53::57:0;:12:::1;72:26:72:27:0;:15::44;71:12:::1;70:8:73:10;75:67:75:68:0;:57::83;:90::92;:57::93:1;78:16:78:33:0;;:37::41;:16:::1;:8::43;80:66:80:67:0;:55::82;:89::91;:55::92:1;82:20:82:36:0;;:16::37:1;:41::42:0;:16:::1;:8::44;85:16:85:31:0;;:35::49;;:16:::1;:8::51;87:27:87:28:0;:17::35;:50::51;:39::58;:72::73;:61::80;:39:::1;:17::81;:85::89:0;:16:::1;:8::91;89:11:89:15:0;;:18::21;;:11:::1;:23:109:9:0;93::93:27;;:30::32;:23:::1;:16::33;;:48::49:0;:37::64;:16:::1;92:12:94:14;99:26:99:27:0;:16::42;100:30:100:31;:19::46;99:16:::1;98:12:101:14;106:26:106:27:0;:16::44;107:30:107:31;:19::48;106:16:::1;105:12:108:14;109:13:117:9:0;113:27:113:28;:16::45;:49::53;:16:::1;112:12:114:14;116:30:116:31:0;:20::46;:61::62;:50::77;:20:::1;:12::79;109:13:117:9;50:4:120:5;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-25T14:23:34.049Z"
}