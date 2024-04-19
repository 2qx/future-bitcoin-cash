// Automatically Generated
export const artifact = {
  "contractName": "Gantry",
  "constructorInputs": [
    {
      "name": "tokenCategory",
      "type": "bytes"
    },
    {
      "name": "stepBytes",
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
  "bytecode": "OP_SWAP OP_BIN2NUM OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_1NEGATE OP_OVER OP_3 OP_PICK OP_DIV OP_10 OP_MOD OP_0 OP_NUMNOTEQUAL OP_IF OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY 20 OP_0 OP_OUTPOINTTXHASH OP_CAT OP_4 OP_CAT OP_2 OP_PICK OP_4 OP_NUM2BIN OP_CAT OP_5 OP_PICK OP_CAT aa20 OP_OVER OP_HASH256 OP_CAT 87 OP_CAT OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_ROT OP_DROP OP_NIP OP_ELSE OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_DROP OP_0 OP_ENDIF OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_3 OP_ROLL OP_ADD OP_OVER OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_OVER OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_SWAP OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_ROT OP_EQUAL OP_NIP OP_NIP",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-05\n//\n// [ ] Require the minting baton in the input\n// [ ] Get the current step increment for the chain of futures\n// [ ] Get the current vault locktime to be printed.\n//\n//   either\n// [ ] Mint FTs, \n// [ ] send them off to a Vault\n//   or\n// [ ] skip every 10th print.\n//\n// [ ] increment locktime height value stored on NFT baton\n// [ ] assure NFT baton is returned\n//\n// // The Gantry baton NFT commentment carries the highest locktime printed for the chain\n//\n//  Gantry i/o Flow:\n//\n//  Inputs              Outputs\n//  [0] NFT mintBaton   ->  [0] FTs Vault\n//  [1] topup-sats?     =>  [1] NFT mintBaton\n//\n//  \n//  ... but skip every 10th token print\n//  [0] NFT mintBaton   =>  [0] NFT mintBaton\n//\n\n\ncontract Gantry(\n    bytes tokenCategory, \n    bytes stepBytes, \n    bytes vaultUnlockingBytecode\n    ) {\n\n    function execute(){\n\n\n        int step = int(stepBytes);\n\n        // check step\n        //   mint Fts\n        int locktime = int(tx.inputs[0].nftCommitment);\n\n        int baton = -1;\n        // if not a 10th step, mint tokens\n        if((locktime/step)%10!=0){\n            // Send FTs onward to vault\n            require(\n                tx.outputs[0].tokenCategory \n                == tx.inputs[0].outpointTransactionHash\n                );\n            require(tx.outputs[0].tokenAmount == 2100000000000000);\n           \n            // Get the redeem bytecode of the vault instance\n            bytes vaultRedeemBytecode = \n                0x20 + tx.inputs[0].outpointTransactionHash +   // new fungible category\n                0x04 + bytes4(locktime) +     // locktime\n                vaultUnlockingBytecode;    \n\n            // verify p2sh32 vault address\n            require(\n                0xaa20 + hash256(vaultRedeemBytecode) + 0x87\n                == tx.outputs[0].lockingBytecode\n            );\n            baton = 1;\n            \n        }else{\n            // simply return the NFT baton without minting FTs\n            require(tx.outputs[0].tokenAmount == 0);\n            baton = 0;\n        }\n        \n        // 6a 46 42 43 48 04 <locktime>\n        // OP_RETURN FBCH <locktime>\n\n        // Height stored in Minting NFT commitment MUST be incremented by <step>.\n        require(\n            bytes(int(tx.inputs[0].nftCommitment)+step) == tx.outputs[baton].nftCommitment\n        );\n        \n        // Return Minting NFT baton\n        // to outputs[0] in any case.\n        require(\n            tx.inputs[0].tokenCategory\n            == tx.outputs[baton].tokenCategory\n        );\n\n        // Gantry covenant must be passed on\n        // to outputs[0] in any case.\n        require(\n            tx.inputs[0].lockingBytecode\n            == tx.outputs[baton].lockingBytecode\n        );\n\n        // verify minting baton is correct\n        require(\n            tx.inputs[0].tokenCategory\n            == tokenCategory\n        );\n        \n    }\n}",
  "debug": {
    "bytecode": "517a8100cf814f51795379965a97009e6300d100c8876900d3070040075af075079c69012000c87e547e527954807e55797e02aa205179aa7e01877e00cd876951527a757c756700d3009c6900517a756800cf81537a935179d2876900ce5179d1876900c7517acd876900ce527a877777",
    "sourceMap": "41:23:41:32;;:19::33:1;45:37:45:38:0;:27::53;:23::54:1;47:20:47:22:0;49:12:49:20;;:21::25;;:12:::1;:27::29:0;:11:::1;:31::32:0;:11:::1;:33:70:9:0;52:27:52:28;:16::43;53:29:53:30;:19::55;52:16:::1;51:12:54:18;55:31:55:32:0;:20::45;:49::65;:20:::1;:12::67;59:16:59:20:0;:33::34;:23::59;:16:::1;60::60:20:0;59::::1;60:30::38:0;;:23::39:1;;59:16;61::61:38:0;;59::::1;65::65:22:0;:33::52;;:25::53:1;:16;:56::60:0;:16:::1;66:30:66:31:0;:19::48;65:16:::1;64:12:67:14;68:20:68:21:0;:12::22;;;;49:33:70:9:1;70:13:74::0;72:31:72:32;:20::45;:49::50;:20:::1;:12::52;73:20:73:21:0;:12::22;;;70:13:74:9:1;81:32:81:33:0;:22::48;:18::49:1;:50::54:0;;:18:::1;:70::75:0;;:59::90;:12:::1;80:8:82:10;87:22:87:23:0;:12::38;88:26:88:31;;:15::46;87:12:::1;86:8:89:10;94:22:94:23:0;:12::40;95:26:95:31;;:15::48;94:12:::1;93:8:96:10;100:22:100:23:0;:12::38;101:15:101:28;;100:12:::1;38:4:104:5;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-19T18:30:44.531Z"
}