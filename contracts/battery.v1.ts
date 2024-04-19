// Automatically Generated
export const artifact = {
  "contractName": "Battery",
  "constructorInputs": [
    {
      "name": "start",
      "type": "int"
    },
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
    },
    {
      "name": "allowance",
      "type": "int"
    }
  ],
  "abi": [
    {
      "name": "execute",
      "inputs": []
    }
  ],
  "bytecode": "OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_0 OP_EQUAL OP_IF OP_ELSE OP_TXINPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_OVER OP_3 OP_PICK OP_5 OP_PICK OP_WITHIN OP_DUP OP_IF OP_0 OP_UTXOTOKENCATEGORY OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2 OP_PICK OP_10 OP_MUL OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_3 OP_PICK OP_4 OP_NUM2BIN OP_CAT OP_8 OP_PICK OP_CAT OP_7 OP_PICK OP_CAT a914 OP_OVER OP_SHA256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DUP OP_2 OP_EQUALVERIFY OP_2 OP_PICK OP_2 OP_EQUALVERIFY OP_OVER OP_4 OP_PICK OP_EQUALVERIFY OP_2DROP OP_2DROP OP_DROP OP_ELSE OP_ENDIF OP_0 OP_UTXOVALUE OP_0 OP_OUTPUTVALUE OP_1 OP_OUTPUTVALUE OP_ADD OP_SUB OP_9 OP_PICK OP_LESSTHAN OP_VERIFY OP_5 OP_PICK OP_CHECKLOCKTIMEVERIFY OP_2DROP OP_2DROP OP_ENDIF OP_2DROP OP_2DROP OP_2DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-01\n\n// A Battery of Gantries to deploy Vaults.\n//                   \n// A Battery makes a series of Gantries at different powers of 10 that go on to create Futures Vaults at various intervals.\n//\n// Given a minting NFT with the data 0xA0000000, \n// mint a sequence of NFTs with minting capibility\n// sending those NFTs to the corresponting Gantry \n//\n//  execute():\n//\n//  inputs                           outputs\n//  [0] Battery + NFT 0xA0000000     ->  [0] Gantary02 + NFT* 0x64000000<startTime>\n//                                   =>  [1] Battery   + NFT  0x64000000\n//\n//  [0] Battery + NFT 0x64000000     ->  [0] Gantary03 + NFT* 0xE8030000<startTime>\n//                                   =>  [1] Battery   + NFT  0xE8030000\n//\n//  ... 10270000 10e5\n//  ... A0860100 10e6\n//  ...\n//\n//  [0] Battery + NFT 0x<end>        ->  [0] Battery   + NFT  0x6a // burn NFT, sats are unencumbered.\n//\n// \n\ncontract Battery(\n\n    // power of 10 for shortest expiry series, \n    //   i.e. 10^3, every 1000 blocks, weeklies \n    int start, \n\n    // power of 10 for longest expiry series\n    //   i.e. 10^6, every 1,000,000 blocks, 20.8 years\n    int end,\n\n    // starting block height\n    int startTime,\n\n    // sha256 hash of gantry unlocking bytecode \n    bytes gantryUnlockingBytecode,\n\n    // sha256 hash of vault unlocking bytecode \n    bytes vaultUnlockingBytecode,\n\n    // \n    int allowance\n    ) {\n\n    function execute(){\n\n\n        // If this is pure BCH UTXO\n        if (tx.inputs[this.activeInputIndex].tokenCategory == 0x) { \n            //\n            // Only the output carrying the Gantry minting NFT is pertinent. \n            //\n         }\n        // Else check whether the UTXO is a valid Battery instance.\n        else {\n\n            // We allow only 1 input, creator must provide enough BCH \n            // when they make the Battery UTXO.\n            require(tx.inputs.length == 1);\n        \n\n            // There is something fishy going on here with the log stack\n            // and the new debug tools. re-test behavior after rkalis' patch.\n            int step = int(tx.inputs[0].nftCommitment);\n            int step2 = int(tx.inputs[0].nftCommitment);\n            console.log(step, \"step\");\n            console.log(step2, \"step2\");\n            \n            bool gantryInRange = within(step, start, end);\n            if(gantryInRange){\n                    // Minting NFT must be passed on\n                    // to outputs[0] in any case.\n                    require(\n                        tx.inputs[0].tokenCategory\n                        == tx.outputs[1].tokenCategory\n                    );\n\n                    // Battery NFT must be passed on\n                    // to outputs[0] in any case.\n                    require(\n                        tx.inputs[0].lockingBytecode\n                        == tx.outputs[1].lockingBytecode\n                    );\n\n                    // Minting NFT commitment MUST increase magnitude by 10.\n                    require(\n                        bytes4(step * 10) == tx.outputs[1].nftCommitment\n                    );\n\n                    // Get the redeem bytecode of the gantry instance\n                    bytes gantryRedeemBytecode = tx.inputs[0].tokenCategory +  // This tokenCategory\n                                                bytes4(step) + // stepBytes\n                                                vaultUnlockingBytecode +\n                                                gantryUnlockingBytecode;    \n\n                    require(\n                        0xa914 + sha256(gantryRedeemBytecode) + 0x87\n                        == tx.outputs[1].lockingBytecode\n                    );\n\n\n                    bytes gantryCategory, bytes gantryCapability = tx.outputs[1].tokenCategory.split(32);\n                    bytes batteryCategory, bytes batteryCapability = tx.inputs[0].tokenCategory.split(32);\n\n                    // assure a minting token is sent\n                    require(batteryCapability == 0x02);\n\n                    // assure a minting token is sent\n                    require(gantryCapability == 0x02);\n\n                    // Require the Gantry category to match the Battery.\n                    require(batteryCategory == gantryCategory);\n\n\n            }else{\n                // burn minting NFT\n            }\n            require((tx.inputs[0].value - (tx.outputs[0].value + tx.outputs[1].value)) < allowance);\n            require(tx.time >= int(startTime));\n        }\n    }\n}\n\n        ",
  "debug": {
    "bytecode": "c0ce00876367c3519c6900cf8100cf81517953795579a500796300ce51d1876900c751cd876952795a95548051d2876900ce537954807e58797e57797e02a9145179a87e01877e51cd876951d101207f00ce01207f007952876952795287695179547987697575757575676800c600cc51cc939459799f695579b1757575756851777777777777",
    "sourceMap": "57:22:57:43;:12::58;:62::64;:12:::1;:66:61:10:0;63:13:128:9;67:20:67:36;:40::41;:20:::1;:12::43;72:37:72:38:0;:27::53;:23::54:1;73:38:73:39:0;:28::54;:24::55:1;77:40:77:44:0;;:46::51;;:53::56;;:33::57:1;78:15:78:28:0;;:29:123:13;82:34:82:35;:24::50;83:38:83:39;:27::54;82:24:::1;81:20:84:22;89:34:89:35:0;:24::52;90:38:90:39;:27::56;89:24:::1;88:20:91:22;95:31:95:35:0;;:38::40;:31:::1;:24::41;;:56::57:0;:45::72;:24:::1;94:20:96:22;99:59:99:60:0;:49::75;100:55:100:59;;:48::60:1;;99:49;101:48:101:70:0;;99:49:::1;102:48:102:71:0;;99:49:::1;105:24:105:30:0;:40::60;;:33::61:1;:24;:64::68:0;:24:::1;106:38:106:39:0;:27::56;105:24:::1;104:20:107:22;110:78:110:79:0;:67::94;:101::103;:67::104:1;111:79:111:80:0;:69::95;:102::104;:69::105:1;114:28:114:45:0;;:49::53;:28:::1;:20::55;117:28:117:44:0;;:48::52;:28:::1;:20::54;120:28:120:43:0;;:47::61;;:28:::1;:20::63;78:29:123:13;;;;;123:17:125::0;::::1;126:31:126:32:0;:21::39;:54::55;:43::62;:76::77;:65::84;:43:::1;:21::85;:89::98:0;;:20:::1;:12::100;127:35:127:44:0;;:12::47:1;;63:13:128:9;;;;53:4:129:5;;;;;;",
    "logs": [
      {
        "ip": 22,
        "line": 74,
        "data": [
          {
            "stackIndex": 1,
            "type": "int"
          },
          "step"
        ]
      },
      {
        "ip": 22,
        "line": 75,
        "data": [
          {
            "stackIndex": 0,
            "type": "int"
          },
          "step2"
        ]
      }
    ],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-19T18:30:44.519Z"
}