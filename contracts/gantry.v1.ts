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
  "bytecode": "OP_0 OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_BIN2NUM OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_1NEGATE OP_OVER OP_3 OP_PICK OP_DIV OP_10 OP_MOD OP_0 OP_NUMNOTEQUAL OP_IF OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_OUTPOINTTXHASH OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT 0040075af07507 OP_NUMEQUALVERIFY OP_OVER OP_0 OP_UTXOTOKENCATEGORY OP_CAT OP_4 OP_PICK OP_CAT a914 OP_OVER OP_SHA256 OP_CAT 87 OP_CAT OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_1 OP_ROT OP_DROP OP_NIP OP_ELSE OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENAMOUNT OP_0 OP_NUMEQUALVERIFY OP_DROP OP_0 OP_ENDIF OP_0 OP_UTXOTOKENCOMMITMENT OP_BIN2NUM OP_3 OP_ROLL OP_ADD OP_OVER OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_0 OP_UTXOTOKENCATEGORY OP_OVER OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_UTXOBYTECODE OP_SWAP OP_OUTPUTBYTECODE OP_EQUAL OP_NIP OP_NIP",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-04-05\n//\n// [ ] Require the minting baton in the input\n// [ ] Get the current step increment for the chain of futures\n// [ ] Get the current vault locktime to be printed.\n//\n//   either\n// [ ] Mint FTs, \n// [ ] send them off to a Vault\n//   or\n// [ ] skip every 10th print.\n//\n// [ ] increment locktime height value stored on NFT baton\n// [ ] assure NFT baton is returned\n//\n// // The Gantry baton NFT commentment carries the highest locktime printed for the chain\n//\n//  Gantry i/o Flow:\n//\n//  Inputs              Outputs\n//  [0] NFT mintBaton   ->  [0] FTs Vault\n//  [1] topup-sats?     =>  [1] NFT mintBaton\n//\n//  \n//  ... but skip every 10th token print\n//  [0] NFT mintBaton   =>  [1] NFT mintBaton\n//\n\n\ncontract Gantry(\n    bytes tokenCategory, \n    bytes stepBytes, \n    bytes vaultUnlockingBytecode\n    ) {\n\n    function execute(){\n\n        // verify minting baton is correct\n        require(\n            tx.inputs[0].tokenCategory\n            == tokenCategory\n        );\n        int step = int(stepBytes);\n\n        // check step\n        //   mint Fts\n        int locktime = int(tx.inputs[0].nftCommitment);\n\n        int baton = -1;\n        // if not a 10th step, mint tokens\n        if((locktime/step)%10!=0){\n            // Send FTs onward to vault\n            require(\n                tx.outputs[0].tokenCategory \n                == tx.inputs[0].outpointTransactionHash\n                );\n            require(tx.outputs[0].tokenAmount == 2100000000000000);\n           \n            // Get the redeem bytecode of the vault instance\n            bytes vaultRedeemBytecode = \n                bytes(locktime) +     // locktime\n                tx.inputs[0].tokenCategory +   // category\n                vaultUnlockingBytecode;    \n\n            // verify p2sh32 vault address\n            require(\n                0xa914 + sha256(vaultRedeemBytecode) + 0x87\n                == tx.outputs[0].lockingBytecode\n            );\n            baton = 1;\n            \n        }else{\n            // Send FTs onward to vault\n            require(tx.outputs[0].tokenCategory == 0x);\n            require(tx.outputs[0].tokenAmount == 0);\n            baton = 0;\n        }\n        \n        \n        // Height stored in Minting NFT commitment MUST be incremented by <step>.\n        require(\n            bytes(int(tx.inputs[0].nftCommitment)+step) == tx.outputs[baton].nftCommitment\n        );\n        \n        // Return Minting NFT baton\n        // to outputs[0] in any case.\n        require(\n            tx.inputs[0].tokenCategory\n            == tx.outputs[baton].tokenCategory\n        );\n\n\n        // Gantry covenant must be passed on\n        // to outputs[0] in any case.\n        require(\n            tx.inputs[0].lockingBytecode\n            == tx.outputs[baton].lockingBytecode\n        );\n\n        \n    }\n}",
  "debug": {
    "bytecode": "00ce517a8769007a8100cf814f51795379965a97009e6300d100c8876900d3070040075af075079c69517900ce7e54797e02a9145179a87e01877e00cd876951527a757c756700d100876900d3009c6900517a756800cf81537a935179d2876900ce5179d1876900c7517acd877777",
    "sourceMap": "42:22:42:23;:12::38;43:15:43:28;;42:12:::1;41:8:44:10;45:23:45:32:0;;:19::33:1;49:37:49:38:0;:27::53;:23::54:1;51:20:51:22:0;53:12:53:20;;:21::25;;:12:::1;:27::29:0;:11:::1;:31::32:0;:11:::1;:33:74:9:0;56:27:56:28;:16::43;57:29:57:30;:19::55;56:16:::1;55:12:58:18;59:31:59:32:0;:20::45;:49::65;:20:::1;:12::67;63:22:63:30:0;;64:26:64:27;:16::42;63::::1;65::65:38:0;;63::::1;69::69:22:0;:32::51;;:25::52:1;:16;:55::59:0;:16:::1;70:30:70:31:0;:19::48;69:16:::1;68:12:71:14;72:20:72:21:0;:12::22;;;;53:8:79:9;74:13;76:31:76:32;:20::47;:51::53;:20:::1;:12::55;77:31:77:32:0;:20::45;:49::50;:20:::1;:12::52;78:20:78:21:0;:12::22;;;74:13:79:9:1;84:32:84:33:0;:22::48;:18::49:1;:50::54:0;;:18:::1;:70::75:0;;:59::90;:12:::1;83:8:85:10;90:22:90:23:0;:12::38;91:26:91:31;;:15::46;90:12:::1;89:8:92:10;98:22:98:23:0;:12::40;99:26:99:31;;:15::48;98:12:::1;38:4:103:5;",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.3"
  },
  "updatedAt": "2024-04-14T00:25:46.261Z"
}