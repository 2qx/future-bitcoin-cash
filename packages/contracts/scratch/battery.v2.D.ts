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
  "bytecode": "OP_OVER OP_CHECKLOCKTIMEVERIFY OP_DROP OP_TXINPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_TXOUTPUTCOUNT OP_2 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_DUP OP_ROT OP_LESSTHAN OP_IF OP_3 OP_PICK OP_SIZE OP_NIP OP_4 OP_PICK OP_CAT OP_4 OP_CAT OP_OVER OP_4 OP_NUM2BIN OP_CAT OP_3 OP_PICK OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_9 OP_MUL OP_10 OP_DIV e803 OP_SUB OP_NUMEQUALVERIFY OP_2 OP_PICK OP_2OVER OP_MOD OP_SUB OP_2 OP_PICK OP_ADD OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DUP 00 OP_EQUALVERIFY OP_OVER OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_OUTPUTBYTECODE OP_0 OP_UTXOBYTECODE OP_EQUALVERIFY OP_0 OP_OUTPUTVALUE OP_0 OP_UTXOVALUE OP_10 OP_DIV OP_NUMEQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_0 OP_OUTPUTTOKENCOMMITMENT OP_5 OP_PICK OP_10 OP_MUL OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_2DROP OP_2DROP OP_ELSE OP_0 OP_OUTPUTBYTECODE 6a OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_ENDIF OP_2DROP OP_2DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-05-18\n\n// DETERMISTIC(?) Battery - Spawn an array of vault deploying gantries from a single utxo.\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// A Battery releases a series of Gantries at different powers of 10 that \n// go on to create Futures Vaults on those respective intervals.\n//\n// Given a minting NFT with the commitment containing a power of 10, \n// mint a sequence of NFTs with minting capability\n// sending mutable batons NFTs to the corresponting Gantry.\n//\n//  execute():\n//\n//  inputs                           outputs\n//  [0] Battery + NFT 0x40420F00 10ᴇ6 ->  [0] Battery    + NFT  0xA0860100\n//                                    =>  [1] Gantry10ᴇ6 + NFT* <startTime>\n//\n//  [0] Battery + NFT 0xA0860100 10ᴇ5 ->  [0] Battery    + NFT  0x10270000\n//                                    =>  [1] Gantry10ᴇ5 + NFT* <startTime>\n//\n//  ... 0x10270000 10ᴇ4 ... 0xE8030000 10ᴇ3 ... 0x64000000 10ᴇ2\n//\n//  [0] Battery + NFT 0x<end>        ->  [0] Battery   + NFT  0x6a // burn NFT, sats are unencumbered.\n//\n// \n\ncontract Battery(\n\n    // \n    // The highest series power of 10 is set in the minting NFT baton commitment.\n\n    // The end is the lowest power to print a series for\n    int end,\n\n    // Starting block height (approximate)\n    int startTime,\n\n    // Unlocking bytecode of the gantry contracts\n    bytes gantryUnlockingBytecode,\n\n    // Unlocking bytecode of the vault contracts\n    bytes vaultUnlockingBytecode,\n\n    ) {\n\n    function execute(){\n\n        require(tx.time >= startTime);\n        \n        // We allow only 1 input, creator must provide enough BCH \n        // when they make the Battery UTXO.\n        require(tx.inputs.length == 1);\n        require(tx.outputs.length == 2);\n\n        // Get the commitment \n        int step = int(tx.inputs[0].nftCommitment);\n\n        if(step < end) {\n\n            // Get the redeem bytecode of the gantry instance\n            bytes gantryRedeemBytecode = bytes(vaultUnlockingBytecode.length) + vaultUnlockingBytecode +\n                                        0x04 + bytes4(step)                      +  // stepBytes\n                                        gantryUnlockingBytecode;    \n\n            require(\n                // The second output is the gantry lockingBytecode\n                0xaa20 + hash256(gantryRedeemBytecode) + 0x87\n                == tx.outputs[1].lockingBytecode\n            );\n\n            // Fund the gantry in full\n            require(tx.outputs[1].value == (tx.inputs[0].value*9/10) - 1000);   \n\n\n            // Set the gantry commitment to a block on increment in the near future.\n            bytes4 gantryStart = bytes4(startTime - (startTime % step) + step);\n            require(tx.outputs[1].nftCommitment == gantryStart);\n            require(tx.outputs[1].tokenAmount == 0);  \n\n            bytes gantryCategory, bytes gantryCapability = tx.outputs[1].tokenCategory.split(32);\n\n            // Assure the gantry baton is a non-minting NFT\n            require(gantryCapability == 0x0);\n            \n            // Assure the gantry category matches the battery category\n            require(gantryCategory == tx.inputs[0].tokenCategory.split(32)[0]);\n\n\n            // then pass the baton back \n            require(tx.outputs[0].lockingBytecode == tx.inputs[0].lockingBytecode);\n\n            // with exaclty one 10th the value\n            require(tx.outputs[0].value == tx.inputs[0].value/10);\n\n            require(tx.outputs[0].tokenCategory == tx.inputs[0].tokenCategory);\n            require(tx.outputs[0].tokenAmount == 0);  \n\n            // Increment the baton by an order of magnitude\n            require(tx.outputs[0].nftCommitment == bytes4(step * 10)); \n\n\n\n\n        } else {\n            // Burn the minting baton, allow value to be taken\n            require(tx.outputs[0].lockingBytecode == 0x6a);\n\n            // The output gleening sats cannot have an NFT\n            require(tx.outputs[1].tokenCategory == 0x);\n\n            // The balance is free\n        }\n        \n    }\n}\n\n        ",
  "debug": {
    "bytecode": "5179b175c3519c69c4529c6900cf810079527a9f635379827754797e547e517954807e53797e02aa205179aa7e01877e51cd876951cc00c659955a9602e803949c695279537953799794527993548051d25179876951d3009c6951d101207f007901008769517900ce01207f75876900cd00c7876900cc00c65a969c6900d100ce876900d3009c6900d255795a9554808769757575756700cd016a876951d1008769685177777777",
    "sourceMap": "54:27:54:36;;:8::38:1;;58:16:58:32:0;:36::37;:16:::1;:8::39;59:16:59:33:0;:37::38;:16:::1;:8::40;62:33:62:34:0;:23::49;:19::50:1;64:11:64:15:0;;:18::21;;:11:::1;:23:110:9:0;67:47:67:69;;:::76;;:80::102;;:41:::1;68:40:68:44:0;67:41:::1;68:54::58:0;;:47::59:1;;67:41;69:40:69:63:0;;67:41:::1;73:16:73:22:0;:33::53;;:25::54:1;:16;:57::61:0;:16:::1;74:30:74:31:0;:19::48;73:16:::1;71:12:75:14;78:31:78:32:0;:20::39;:54::55;:44::62;:63::64;:44:::1;:65::67:0;:44:::1;:71::75:0;:43:::1;:20;:12::77;82:40:82:49:0;;:53::62;;:65::69;;:53:::1;:40::70;:73::77:0;;:40:::1;:33::78;;83:31:83:32:0;:20::47;:51::62;;:20:::1;:12::64;84:31:84:32:0;:20::45;:49::50;:20:::1;:12::52;86:70:86:71:0;:59::86;:93::95;:59::96:1;89:20:89:36:0;;:40::43;:20:::1;:12::45;92:20:92:34:0;;:48::49;:38::64;:71::73;:38::74:1;:::77;:20;:12::79;96:31:96:32:0;:20::49;:63::64;:53::81;:20:::1;:12::83;99:31:99:32:0;:20::39;:53::54;:43::61;:62::64;:43:::1;:20;:12::66;101:31:101:32:0;:20::47;:61::62;:51::77;:20:::1;:12::79;102:31:102:32:0;:20::45;:49::50;:20:::1;:12::52;105:31:105:32:0;:20::47;:58::62;;:65::67;:58:::1;:51::68;;:20;:12::70;64:23:110:9;;;;110:15:118::0;112:31:112:32;:20::49;:53::57;:20:::1;:12::59;115:31:115:32:0;:20::47;:51::53;:20:::1;:12::55;110:15:118:9;52:4:120:5;;;;",
    "logs": [],
    "requires": [
      {
        "ip": 6,
        "line": 54
      },
      {
        "ip": 11,
        "line": 58
      },
      {
        "ip": 15,
        "line": 59
      },
      {
        "ip": 52,
        "line": 71
      },
      {
        "ip": 64,
        "line": 78
      },
      {
        "ip": 83,
        "line": 83
      },
      {
        "ip": 88,
        "line": 84
      },
      {
        "ip": 97,
        "line": 89
      },
      {
        "ip": 106,
        "line": 92
      },
      {
        "ip": 112,
        "line": 96
      },
      {
        "ip": 120,
        "line": 99
      },
      {
        "ip": 126,
        "line": 101
      },
      {
        "ip": 131,
        "line": 102
      },
      {
        "ip": 141,
        "line": 105
      },
      {
        "ip": 151,
        "line": 112
      },
      {
        "ip": 156,
        "line": 115
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-07-01T18:05:28.041Z"
}