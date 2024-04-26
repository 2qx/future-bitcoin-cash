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
  "bytecode": "OP_OVER OP_CHECKLOCKTIMEVERIFY OP_DROP OP_TXINPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_3 OP_PICK OP_4 OP_ROLL OP_2 OP_PICK OP_MOD OP_SUB OP_OVER OP_ADD OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_4 OP_PICK OP_SIZE OP_NIP OP_5 OP_ROLL OP_CAT OP_4 OP_CAT OP_ROT OP_CAT 20 OP_CAT OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_CAT OP_3 OP_ROLL OP_CAT aa20 OP_SWAP OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_BIN2NUM OP_0 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOVALUE OP_0 OP_OUTPUTVALUE OP_1 OP_OUTPUTVALUE OP_ADD OP_SUB e803 OP_LESSTHAN OP_VERIFY OP_DUP OP_ROT OP_GREATERTHAN OP_IF OP_DUP OP_10 OP_DIV OP_4 OP_NUM2BIN OP_0 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_0 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_ELSE OP_0 OP_UTXOTOKENCATEGORY OP_0 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_OUTPUTBYTECODE 6a OP_EQUALVERIFY OP_ENDIF OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-23\n\n// Battery - Spawn an array of vault deploying gantries from a single utxo.\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// A Battery releases a series of Gantries at different powers of 10 that \n// go on to create Futures Vaults on those respective intervals.\n//\n// Given a minting NFT with the commitment containing a power of 10, \n// mint a sequence of NFTs with minting capability\n// sending mutable batons NFTs to the corresponting Gantry.\n//\n//  execute():\n//\n//  inputs                           outputs\n//  [0] Battery + NFT 0x40420F00     ->  [0] Battery   + NFT  0xA0860100\n//                                   =>  [1] Gantryᴇ6  + NFT* <startTime>\n//\n//  [0] Battery + NFT 0xA0860100     ->  [0] Battery   + NFT  0x10270000\n//                                   =>  [1] Gantryᴇ5  + NFT* <startTime>\n//\n//  ... 0x10270000 ᴇ4 ... 0xE8030000 ᴇ3 ... 0x64000000 ᴇ2\n//\n//  [0] Battery + NFT 0x<end>        ->  [0] Battery   + NFT  0x6a // burn NFT, sats are unencumbered.\n//\n// \n\ncontract Battery(\n\n    // \n    // The highest series power of 10 is set in the minting NFT baton commitment.\n\n    // The end is the lowest power to print a series for\n    int end,\n\n    // Starting block height (approximate)\n    int startTime,\n\n    // Unlocking bytecode of the gantry contracts\n    bytes gantryUnlockingBytecode,\n\n    // Unlocking bytecode of the vault contracts\n    bytes vaultUnlockingBytecode,\n\n    ) {\n\n    function execute(){\n\n        require(tx.time >= int(startTime));\n        \n        // We allow only 1 input, creator must provide enough BCH \n        // when they make the Battery UTXO.\n        require(tx.inputs.length == 1);\n    \n        // Get the commitment \n        bytes4 stepBytes = bytes4(tx.inputs[0].nftCommitment);\n        int step = int(tx.inputs[0].nftCommitment);\n\n        // Set the gantry commitment to a block on increment in the near future.\n        bytes4 gantryStart = bytes4(startTime - (startTime % step) + step);\n        require(tx.outputs[1].nftCommitment == gantryStart);\n\n        // Get the redeem bytecode of the gantry instance\n        bytes gantryRedeemBytecode = bytes(vaultUnlockingBytecode.length) + vaultUnlockingBytecode +\n                                     0x04 + stepBytes                                +  // stepBytes\n                                     0x20 + tx.inputs[0].tokenCategory.split(32)[0]  +  // This tokenCategory\n                                     gantryUnlockingBytecode;    \n\n        require(\n            // The second output is the gantry lockingBytecode\n            0xaa20 + hash256(gantryRedeemBytecode) + 0x87\n            == tx.outputs[1].lockingBytecode\n        );\n\n        bytes gantryCategory, bytes gantryCapability = tx.outputs[1].tokenCategory.split(32);\n\n        // Assure the gantry baton is a non-minting NFT\n        require(int(gantryCapability) == 0);\n        \n        // Assure the gantry category matches the battery category\n        require(gantryCategory == tx.inputs[0].tokenCategory.split(32)[0]);\n\n        // Prevent all the value from being cleared off\n        require((tx.inputs[0].value - (tx.outputs[0].value + tx.outputs[1].value)) < 1000);\n        \n        if(step > end) {\n\n            // Increment the baton by an order of magnitude\n            require(bytes4(step / 10) == tx.outputs[0].nftCommitment);\n            // then pass it \n            require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);\n            require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode);\n\n        } else {\n            // Burn the minting baton\n            require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);\n            require(tx.outputs[0].lockingBytecode == 0x6a);\n        }\n        \n    }\n}\n\n        ",
  "debug": {
    "bytecode": "5179b175c3519c6900cf00cf815379547a52799794517993548051d2517a876954798277557a7e547e527a7e01207e00ce01207f757e537a7e02aa20517aaa7e01877e51cd876951d101207f007a81009c69007a00ce01207f75876900c600cc51cc939402e8039f690079527aa06300795a96548000d2876900ce00d1876900c700cd87696700ce00d1876900cd016a8769685177",
    "sourceMap": "54:31:54:40;;:8::43:1;;58:16:58:32:0;:36::37;:16:::1;:8::39;61:44:61:45:0;:34::60;62:33:62:34;:23::49;:19::50:1;65:36:65:45:0;;:49::58;;:61::65;;:49:::1;:36::66;:69::73:0;;:36:::1;:29::74;;66:27:66:28:0;:16::43;:47::58;;:16:::1;:8::60;69:43:69:65:0;;:::72;;:76::98;;:37:::1;70::70:41:0;69::::1;70:44::53:0;;69:37:::1;71::71:41:0;69::::1;71:54::55:0;:44::70;:77::79;:44::80:1;:::83;69:37;72::72:60:0;;69::::1;76:12:76:18:0;:29::49;;:21::50:1;:12;:53::57:0;:12:::1;77:26:77:27:0;:15::44;76:12:::1;74:8:78:10;80:66:80:67:0;:55::82;:89::91;:55::92:1;83:20:83:36:0;;:16::37:1;:41::42:0;:16:::1;:8::44;86:16:86:30:0;;:44::45;:34::60;:67::69;:34::70:1;:::73;:16;:8::75;89:27:89:28:0;:17::35;:50::51;:39::58;:72::73;:61::80;:39:::1;:17::81;:85::89:0;:16:::1;:8::91;91:11:91:15:0;;:18::21;;:11:::1;:23:99:9:0;94:27:94:31;;:34::36;:27:::1;:20::37;;:52::53:0;:41::68;:20:::1;:12::70;96:30:96:31:0;:20::46;:61::62;:50::77;:20:::1;:12::79;97:30:97:31:0;:20::48;:63::64;:52::81;:20:::1;:12::83;99:15:103:9:0;101:30:101:31;:20::46;:61::62;:50::77;:20:::1;:12::79;102:31:102:32:0;:20::49;:53::57;:20:::1;:12::59;99:15:103:9;52:4:105:5;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-26T00:44:18.126Z"
}