// Automatically Generated
export const artifact = {
  "contractName": "Battery",
  "constructorInputs": [
    {
      "name": "endStep",
      "type": "int"
    },
    {
      "name": "baseTime",
      "type": "int"
    },
    {
      "name": "gantryReedemBytecodeTail",
      "type": "bytes"
    },
    {
      "name": "vaultReedemBytecodeTail",
      "type": "bytes"
    }
  ],
  "abi": [
    {
      "name": "execute",
      "inputs": []
    }
  ],
  "bytecode": "OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_2 OP_PICK OP_3 OP_ROLL OP_2 OP_PICK OP_MOD OP_SUB OP_OVER OP_ADD OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_3 OP_PICK OP_SIZE OP_NIP OP_4 OP_ROLL OP_CAT OP_OVER OP_SIZE OP_NIP OP_CAT OP_OVER OP_CAT OP_3 OP_ROLL OP_CAT aa20 OP_SWAP OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_1 OP_CAT OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_TXOUTPUTCOUNT OP_2 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTVALUE 2003 OP_NUMEQUALVERIFY OP_0 OP_OUTPUTVALUE OP_INPUTINDEX OP_UTXOVALUE 0807 OP_SUB OP_GREATERTHAN OP_VERIFY OP_DUP OP_ROT OP_GREATERTHAN OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_10 OP_DIV OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_ELSE OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_ENDIF OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n// Battery - Spawn an array of vault deploying gantries from a single utxo.\n//\n// [Alpha] 2024-05-25\n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n// A Battery releases a series of Gantries at different powers of 10 that \n// go on to create Futures Vaults on those respective intervals.\n//\n// Given a minting NFT with the commitment containing a power of 10, \n// mint a sequence of NFTs with minting capability\n// sending mutable batons NFTs to the corresponting Gantry.\n//\n//  execute():\n//\n//  inputs                           outputs\n//  [0] Battery + NFT 0x40420F00 10ᴇ6 ->  [0] Battery    + NFT  0xA0860100\n//                                    =>  [1] Gantry10ᴇ6 + NFT* <startTime>\n//\n//  [0] Battery + NFT 0xA0860100 10ᴇ5 ->  [0] Battery    + NFT  0x10270000\n//                                    =>  [1] Gantry10ᴇ5 + NFT* <startTime>\n//\n//  ... 0x10270000 10ᴇ4 ... 0xE8030000 10ᴇ3 ... 0x64000000 10ᴇ2\n//\n//  [0] Battery + NFT 0x<end>        ->  [0] Battery   + NFT  0x // burn NFT, sats are unencumbered.\n//\n// \n\ncontract Battery(\n\n    // Correct contract initialization will have minting NFT's commitment\n    // set to bytes4(step), which will be the step set for 1st minted gantry,\n    // and will then get decremented for the next one until end step is reached.\n\n    // The end is the lowest step to create a Gantry for.\n    int endStep,\n\n    // Base time from which to calculate each Gantry's starting point, e.g.:\n    // --| baseTime\n    //   |------------------------------------| gantry 0 start\n    //   |------------| gantry 1 start\n    //   |----| gantry 2 start\n    int baseTime,\n\n    // Redeem bytecode tail of the gantry contracts\n    bytes gantryReedemBytecodeTail,\n\n    // Redeem bytecode tail of the vault contracts\n    bytes vaultReedemBytecodeTail,\n\n) {\n\n    function execute() {\n\n        // Get the current step, we will mint a Gantry for this step\n        bytes stepBytes = tx.inputs[this.activeInputIndex].nftCommitment;\n        int step = int(stepBytes);\n\n        // Set the gantry's starting time at correct offset from baseTime\n        bytes4 gantryStart = bytes4(baseTime - (baseTime % step) + step);\n        require(tx.outputs[1].nftCommitment == gantryStart);\n\n        // Construct the full redeem bytecode for the Gantry instance\n        bytes gantryRedeemBytecode =\n            bytes(vaultReedemBytecodeTail.length) + vaultReedemBytecodeTail +\n            bytes(bytes(step).length)             + bytes(step)   + \n            gantryReedemBytecodeTail;\n\n        require(\n            // The second output must have the P2SH32 of the gantry redeem bytecode\n            0xaa20 + hash256(gantryRedeemBytecode) + 0x87\n            == tx.outputs[1].lockingBytecode\n        );\n\n        // Ensure that Gantry inherits a mutable NFT so that it may update the\n        // commitment as it mints its Vaults.\n        bytes gantryCategory =\n            tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] +\n            0x01;\n        require(tx.outputs[1].tokenCategory == gantryCategory);\n\n        // Exactly 2 outputs, so token state or BCH can't leak out.\n        require(tx.outputs.length == 2);\n\n        // Enforce exact dust amount on the Gantry so that remainder must go\n        // back into Battery or pure BCH change at index 0.\n        require(tx.outputs[1].value == 800);\n\n        // Fee allowance = 1000\n        require(tx.outputs[0].value >\n            tx.inputs[this.activeInputIndex].value -\n            1800);\n\n        if(step > endStep) {\n            // Calculate and enforce next baton's step,\n            require(tx.outputs[0].nftCommitment == bytes4(step / 10));\n            // token category & capability (pass on minting NFT),\n            require(tx.outputs[0].tokenCategory ==\n                tx.inputs[this.activeInputIndex].tokenCategory);\n            // and contract code.\n            require(tx.outputs[0].lockingBytecode ==\n                tx.inputs[this.activeInputIndex].lockingBytecode);\n        } else {\n            // Burn the minting baton while allowing any remaining BCH\n            // to be extracted to output 0.\n            require(tx.outputs[0].tokenCategory == 0x);\n\n            // Note: output 1 still mints a Gantry in this same TX,\n            // and it will be the last one to get minted.\n        }\n    }\n}",
  "debug": {
    "bytecode": "c0cf007a815279537a52799794517993548051d2517a876953798277547a7e517982777e51797e537a7e02aa20517aaa7e01877e51cd8769c0ce01207f75517e51d1517a8769c4529c6951cc0220039c6900ccc0c602080794a0690079527aa06300d251795a965480876900d1c0ce876900cdc0c787696700d1008769685177",
    "sourceMap": "60:36:60:57;:26::72;61:23:61:32;;:19::33:1;64:36:64:44:0;;:48::56;;:59::63;;:48:::1;:36::64;:67::71:0;;:36:::1;:29::72;;65:27:65:28:0;:16::43;:47::58;;:16:::1;:8::60;69:18:69:41:0;;:::48;;:52::75;;:12:::1;70:24:70:28:0;;:18::36;;69:12::37:1;70:58::62:0;;69:12::63:1;71::71:36:0;;69::::1;75::75:18:0;:29::49;;:21::50:1;:12;:53::57:0;:12:::1;76:26:76:27:0;:15::44;75:12:::1;73:8:77:10;82:22:82:43:0;:12::58;:65::67;:12::68:1;:::71;83::83:16:0;82::::1;84:27:84:28:0;:16::43;:47::61;;:16:::1;:8::63;87:16:87:33:0;:37::38;:16:::1;:8::40;91:27:91:28:0;:16::35;:39::42;:16:::1;:8::44;94:27:94:28:0;:16::35;95:22:95:43;:12::50;96::96:16;95::::1;94:16;:8::18;98:11:98:15:0;;:18::25;;:11:::1;:27:107:9:0;100:31:100:32;:20::47;:58::62;;:65::67;:58:::1;:51::68;;:20;:12::70;102:31:102:32:0;:20::47;103:26:103;:16::62;102:20:::1;:12::64;105:31:105:32:0;:20::49;106:26:106:47;:16::64;105:20:::1;:12::66;107:15:114:9:0;110:31:110:32;:20::47;:51::53;:20:::1;:12::55;107:15:114:9;57:4:115:5;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": ""
}