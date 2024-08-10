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
  "bytecode": "OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_DUP OP_BIN2NUM OP_3 OP_PICK OP_4 OP_ROLL OP_2 OP_PICK OP_MOD OP_SUB OP_OVER OP_ADD OP_4 OP_NUM2BIN OP_1 OP_OUTPUTTOKENCOMMITMENT OP_EQUALVERIFY OP_4 OP_PICK OP_SIZE OP_NIP OP_5 OP_ROLL OP_CAT OP_4 OP_CAT OP_ROT OP_CAT OP_3 OP_ROLL OP_CAT aa20 OP_SWAP OP_HASH256 OP_CAT 87 OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENCATEGORY 20 OP_SPLIT OP_DROP OP_1 OP_CAT OP_1 OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_TXOUTPUTCOUNT OP_2 OP_NUMEQUALVERIFY OP_1 OP_OUTPUTVALUE 2003 OP_NUMEQUALVERIFY OP_0 OP_OUTPUTVALUE OP_INPUTINDEX OP_UTXOVALUE 0807 OP_SUB OP_GREATERTHAN OP_VERIFY OP_DUP OP_ROT OP_GREATERTHAN OP_IF OP_0 OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_10 OP_DIV OP_4 OP_NUM2BIN OP_EQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_EQUALVERIFY OP_0 OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_ELSE OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_ENDIF OP_DROP OP_1",
  "source": "contract Battery(\n\n    // Correct contract initialization will have minting NFT's commitment\n    // set to bytes4(step), which will be the step set for 1st minted gantry,\n    // and will then get decremented for the next one until end step is reached.\n\n    // The end is the lowest step to create a Gantry for.\n    int endStep,\n\n    // Base time from which to calculate each Gantry's starting point, e.g.:\n    // --| baseTime\n    //   |------------------------------------| gantry 0 start\n    //   |------------| gantry 1 start\n    //   |----| gantry 2 start\n    int baseTime,\n\n    // Redeem bytecode tail of the gantry contracts\n    bytes gantryReedemBytecodeTail,\n\n    // Redeem bytecode tail of the vault contracts\n    bytes vaultReedemBytecodeTail,\n\n) {\n\n    function execute() {\n\n        // Get the current step, we will mint a Gantry for this step\n        bytes stepBytes = tx.inputs[this.activeInputIndex].nftCommitment;\n        int step = int(stepBytes);\n\n        // Set the gantry's starting time at correct offset from baseTime\n        bytes4 gantryStart = bytes4(baseTime - (baseTime % step) + step);\n        require(tx.outputs[1].nftCommitment == gantryStart);\n\n        // Construct the full redeem bytecode for the Gantry instance\n        bytes gantryRedeemBytecode =\n            bytes(vaultReedemBytecodeTail.length) + vaultReedemBytecodeTail +\n            0x04 + stepBytes +\n            gantryReedemBytecodeTail;\n\n        require(\n            // The second output must have the P2SH32 of the gantry redeem bytecode\n            0xaa20 + hash256(gantryRedeemBytecode) + 0x87\n            == tx.outputs[1].lockingBytecode\n        );\n\n        // Ensure that Gantry inherits a mutable NFT so that it may update the\n        // commitment as it mints its Vaults.\n        bytes gantryCategory =\n            tx.inputs[this.activeInputIndex].tokenCategory.split(32)[0] +\n            0x01;\n        require(tx.outputs[1].tokenCategory == gantryCategory);\n\n        // Exactly 2 outputs, so token state or BCH can't leak out.\n        require(tx.outputs.length == 2);\n\n        // Enforce exact dust amount on the Gantry so that remainder must go\n        // back into Battery or pure BCH change at index 0.\n        require(tx.outputs[1].value == 800);\n\n        // Fee allowance = 1000\n        require(tx.outputs[0].value >\n            tx.inputs[this.activeInputIndex].value -\n            1800);\n\n        if(step > endStep) {\n            // Calculate and enforce next baton's step,\n            require(tx.outputs[0].nftCommitment == bytes4(step / 10));\n            // token category & capability (pass on minting NFT),\n            require(tx.outputs[0].tokenCategory ==\n                tx.inputs[this.activeInputIndex].tokenCategory);\n            // and contract code.\n            require(tx.outputs[0].lockingBytecode ==\n                tx.inputs[this.activeInputIndex].lockingBytecode);\n        } else {\n            // Burn the minting baton while allowing any remaining BCH\n            // to be extracted to output 0.\n            require(tx.outputs[0].tokenCategory == 0x);\n\n            // Note: output 1 still mints a Gantry in this same TX,\n            // and it will be the last one to get minted.\n        }\n    }\n}",
  "debug": {
    "bytecode": "c0cf0079815379547a52799794517993548051d2517a876954798277557a7e547e527a7e537a7e02aa20517aaa7e01877e51cd8769c0ce01207f75517e51d1517a8769c4529c6951cc0220039c6900ccc0c602080794a0690079527aa06300d251795a965480876900d1c0ce876900cdc0c787696700d1008769685177",
    "sourceMap": "28:36:28:57;:26::72;29:23:29:32;;:19::33:1;32:36:32:44:0;;:48::56;;:59::63;;:48:::1;:36::64;:67::71:0;;:36:::1;:29::72;;33:27:33:28:0;:16::43;:47::58;;:16:::1;:8::60;37:18:37:41:0;;:::48;;:52::75;;:12:::1;38::38:16:0;37::::1;38:19::28:0;;37:12:::1;39::39:36:0;;37::::1;43::43:18:0;:29::49;;:21::50:1;:12;:53::57:0;:12:::1;44:26:44:27:0;:15::44;43:12:::1;41:8:45:10;50:22:50:43:0;:12::58;:65::67;:12::68:1;:::71;51::51:16:0;50::::1;52:27:52:28:0;:16::43;:47::61;;:16:::1;:8::63;55:16:55:33:0;:37::38;:16:::1;:8::40;59:27:59:28:0;:16::35;:39::42;:16:::1;:8::44;62:27:62:28:0;:16::35;63:22:63:43;:12::50;64::64:16;63::::1;62:16;:8::18;66:11:66:15:0;;:18::25;;:11:::1;:27:75:9:0;68:31:68:32;:20::47;:58::62;;:65::67;:58:::1;:51::68;;:20;:12::70;70:31:70:32:0;:20::47;71:26:71;:16::62;70:20:::1;:12::64;73:31:73:32:0;:20::49;74:26:74:47;:16::64;73:20:::1;:12::66;75:15:82:9:0;78:31:78:32;:20::47;:51::53;:20:::1;:12::55;75:15:82:9;25:4:83:5;",
    "logs": [],
    "requires": [
      {
        "ip": 27,
        "line": 33
      },
      {
        "ip": 53,
        "line": 41
      },
      {
        "ip": 66,
        "line": 52
      },
      {
        "ip": 70,
        "line": 55
      },
      {
        "ip": 75,
        "line": 59
      },
      {
        "ip": 83,
        "line": 62
      },
      {
        "ip": 99,
        "line": 68
      },
      {
        "ip": 105,
        "line": 70
      },
      {
        "ip": 111,
        "line": 73
      },
      {
        "ip": 117,
        "line": 78
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2024-08-09T21:12:02.509Z"
}