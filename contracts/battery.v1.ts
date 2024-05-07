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
  "bytecode": "OP_OVER OP_CHECKLOCKTIMEVERIFY OP_DROP OP_TXINPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_0 OP_UTXOTOKENCOMMITMENT OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_DUP OP_3 OP_ROLL OP_GREATERTHAN OP_IF OP_2 OP_PICK OP_3 OP_PICK OP_2 OP_PICK OP_MOD OP_SUB OP_OVER OP_ADD OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_EQUALVERIFY OP_5 OP_PICK OP_SIZE OP_NIP OP_6 OP_PICK OP_CAT OP_4 OP_CAT OP_3 OP_PICK OP_CAT 20 OP_CAT OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_CAT OP_5 OP_PICK OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY 20 OP_SPLIT OP_DUP OP_BIN2NUM OP_0 OP_NUMEQUALVERIFY OP_OVER OP_0 OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_EQUALVERIFY OP_0 OP_UTXOVALUE OP_0 OP_OUTPUTVALUE OP_1 OP_OUTPUTVALUE OP_ADD OP_SUB e803 OP_LESSTHAN OP_VERIFY OP_4 OP_PICK OP_10 OP_DIV OP_4 OP_NUM2BIN OP_0 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_0 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_2DROP OP_2DROP OP_ELSE OP_0 OP_OUTPUTBYTECODE 6a OP_EQUALVERIFY OP_1 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_TXOUTPUTCOUNT OP_2 OP_NUMEQUALVERIFY OP_ENDIF OP_2DROP OP_2DROP OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-23\n\n// Battery - Spawn an array of vault deploying gantries from a single utxo.\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// A Battery releases a series of Gantries at different powers of 10 that \n// go on to create Futures Vaults on those respective intervals.\n//\n// Given a minting NFT with the commitment containing a power of 10, \n// mint a sequence of NFTs with minting capability\n// sending mutable batons NFTs to the corresponting Gantry.\n//\n//  execute():\n//\n//  inputs                           outputs\n//  [0] Battery + NFT 0x40420F00 10ᴇ6 ->  [0] Battery    + NFT  0xA0860100\n//                                    =>  [1] Gantry10ᴇ6 + NFT* <startTime>\n//\n//  [0] Battery + NFT 0xA0860100 10ᴇ5 ->  [0] Battery    + NFT  0x10270000\n//                                    =>  [1] Gantry     + NFT* <startTime>\n//\n//  ... 0x10270000 10ᴇ4 ... 0xE8030000 10ᴇ3 ... 0x64000000 10ᴇ2\n//\n//  [0] Battery + NFT 0x<end>        ->  [0] Battery   + NFT  0x6a // burn NFT, sats are unencumbered.\n//\n// \n\ncontract Battery(\n\n    // \n    // The highest series power of 10 is set in the minting NFT baton commitment.\n\n    // The end is the lowest power to print a series for\n    int end,\n\n    // Starting block height (approximate)\n    int startTime,\n\n    // Unlocking bytecode of the gantry contracts\n    bytes gantryUnlockingBytecode,\n\n    // Unlocking bytecode of the vault contracts\n    bytes vaultUnlockingBytecode,\n\n    ) {\n\n    function execute(){\n\n        require(tx.time >= int(startTime));\n        \n        // We allow only 1 input, creator must provide enough BCH \n        // when they make the Battery UTXO.\n        require(tx.inputs.length == 1);\n    \n        // Get the commitment \n        bytes4 stepBytes = bytes4(tx.inputs[0].nftCommitment);\n        int step = int(tx.inputs[0].nftCommitment);\n\n        if(step > end) {\n\n            // Set the gantry commitment to a block on increment in the near future.\n            bytes4 gantryStart = bytes4(startTime - (startTime % step) + step);\n            require(tx.outputs[1].nftCommitment == gantryStart);\n\n            // Get the redeem bytecode of the gantry instance\n            bytes gantryRedeemBytecode = bytes(vaultUnlockingBytecode.length) + vaultUnlockingBytecode +\n                                        0x04 + stepBytes                                +  // stepBytes\n                                        0x20 + tx.inputs[0].tokenCategory.split(32)[0]  +  // This tokenCategory\n                                        gantryUnlockingBytecode;    \n\n            require(\n                // The second output is the gantry lockingBytecode\n                0xaa20 + hash256(gantryRedeemBytecode) + 0x87\n                == tx.outputs[1].lockingBytecode\n            );\n\n            bytes gantryCategory, bytes gantryCapability = tx.outputs[1].tokenCategory.split(32);\n\n            // Assure the gantry baton is a non-minting NFT\n            require(int(gantryCapability) == 0);\n            \n            // Assure the gantry category matches the battery category\n            require(gantryCategory == tx.inputs[0].tokenCategory.split(32)[0]);\n\n            // Prevent all the value from being cleared off\n            require((tx.inputs[0].value - (tx.outputs[0].value + tx.outputs[1].value)) < 1000);\n\n            // Increment the baton by an order of magnitude\n            require(bytes4(step / 10) == tx.outputs[0].nftCommitment);\n            // then pass it \n            require(tx.inputs[0].tokenCategory == tx.outputs[0].tokenCategory);\n            require(tx.inputs[0].lockingBytecode == tx.outputs[0].lockingBytecode);\n\n        } else {\n            // Burn the minting baton, allow value to be taken\n            require(tx.outputs[0].lockingBytecode == 0x6a);\n            require(tx.outputs[1].tokenCategory == 0x);\n            require(tx.outputs.length==2);\n        }\n        \n    }\n}\n\n        ",
  "debug": {
    "bytecode": "5179b175c3519c6900cf00cf810079537aa0635279537952799794517993548051d2517987695579827756797e547e53797e01207e00ce01207f757e55797e02aa205179aa7e01877e51cd876951d101207f007981009c69517900ce01207f75876900c600cc51cc939402e8039f6954795a96548000d2876900ce00d1876900c700cd8769757575756700cd016a876951d1008769c4529c6968517777777777",
    "sourceMap": "54:31:54:40;;:8::43:1;;58:16:58:32:0;:36::37;:16:::1;:8::39;61:44:61:45:0;:34::60;62:33:62:34;:23::49;:19::50:1;64:11:64:15:0;;:18::21;;:11:::1;:23:99:9:0;67:40:67:49;;:53::62;;:65::69;;:53:::1;:40::70;:73::77:0;;:40:::1;:33::78;;68:31:68:32:0;:20::47;:51::62;;:20:::1;:12::64;71:47:71:69:0;;:::76;;:80::102;;:41:::1;72:40:72:44:0;71:41:::1;72:47::56:0;;71:41:::1;73:40:73:44:0;71:41:::1;73:57::58:0;:47::73;:80::82;:47::83:1;:::86;71:41;74:40:74:63:0;;71:41:::1;78:16:78:22:0;:33::53;;:25::54:1;:16;:57::61:0;:16:::1;79:30:79:31:0;:19::48;78:16:::1;76:12:80:14;82:70:82:71:0;:59::86;:93::95;:59::96:1;85:24:85:40:0;;:20::41:1;:45::46:0;:20:::1;:12::48;88:20:88:34:0;;:48::49;:38::64;:71::73;:38::74:1;:::77;:20;:12::79;91:31:91:32:0;:21::39;:54::55;:43::62;:76::77;:65::84;:43:::1;:21::85;:89::93:0;:20:::1;:12::95;94:27:94:31:0;;:34::36;:27:::1;:20::37;;:52::53:0;:41::68;:20:::1;:12::70;96:30:96:31:0;:20::46;:61::62;:50::77;:20:::1;:12::79;97:30:97:31:0;:20::48;:63::64;:52::81;:20:::1;:12::83;64:23:99:9;;;;99:15:104::0;101:31:101:32;:20::49;:53::57;:20:::1;:12::59;102:31:102:32:0;:20::47;:51::53;:20:::1;:12::55;103:20:103:37:0;:39::40;:20:::1;:12::42;99:15:104:9;52:4:106:5;;;;;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": ""
}