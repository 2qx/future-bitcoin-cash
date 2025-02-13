// Automatically Generated
export const artifact = {
  "contractName": "SmallIndex",
  "constructorInputs": [
    {
      "name": "key",
      "type": "bytes"
    }
  ],
  "abi": [
    {
      "name": "drop",
      "inputs": []
    }
  ],
  "bytecode": "OP_SIZE OP_NIP OP_0 OP_GREATERTHANOREQUAL OP_VERIFY OP_INPUTINDEX OP_UTXOVALUE OP_CHECKSEQUENCEVERIFY OP_DROP OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY OP_0 OP_OUTPUTVALUE OP_0 OP_NUMEQUALVERIFY OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY OP_0 OP_OUTPUTBYTECODE 6a OP_EQUAL",
  "source": "pragma cashscript 0.10.0;\n\n// Small Index \n// \n// A subscription based key-value index \n//\n\ncontract SmallIndex(bytes key) {\n    \n    // Secure outputs with data in token commitments for a given key.\n    // \n    // All entries pay a fixed storage fee of 1 satoshi per block. \n    //\n    // If an entry has expired, miners may drop it.\n    //\n    // Miners can drop many expired entires at once.\n    //\n\n    function drop() {\n\n        // Use the key.\n        // OP_SIZE OP_NIP OP_VERIFY\n        require(key.length >= 0);\n\n        // Require each input age be higher than the utxo value\n        // OP_INPUTINDEX OP_UTXOVALUE OP_CHECKSEQUENCEVERIFY OP_DROP\n        require(tx.age >= tx.inputs[this.activeInputIndex].value);\n\n        // See TokenBurner - Dagur Valberg Johannsson\n        //\n        // Require a single output\n        // OP_TXOUTPUTCOUNT OP_1 OP_NUMEQUALVERIFY \n        require(tx.outputs.length == 1);\n\n        // Without BCH\n        // OP_0 OP_OUTPUTVALUE OP_0 OP_NUMEQUALVERIFY\n        require(tx.outputs[0].value == 0);\n\n        // Without tokens\n        // OP_0 OP_OUTPUTTOKENCATEGORY OP_0 OP_EQUALVERIFY\n        require(tx.outputs[0].tokenCategory == 0x);\n\n        // As an empty OP_RETURN\n        // OP_0 OP_OUTPUTBYTECODE 6a OP_EQUAL\n        require(tx.outputs[0].lockingBytecode == 0x6a);\n    }\n    \n}",
  "debug": {
    "bytecode": "007a827700a269c0c6b275c4519c6900cc009c6900d100876900cd016a87",
    "sourceMap": "23:16:23:19;;:::26;;:30::31;:16:::1;:8::33;27:36:27:57:0;:26::64;:8::66:1;;33:16:33:33:0;:37::38;:16:::1;:8::40;37:27:37:28:0;:16::35;:39::40;:16:::1;:8::42;41:27:41:28:0;:16::43;:47::49;:16:::1;:8::51;45:27:45:28:0;:16::45;:49::53;:16:::1",
    "logs": [],
    "requires": [
      {
        "ip": 7,
        "line": 23
      },
      {
        "ip": 10,
        "line": 27
      },
      {
        "ip": 15,
        "line": 33
      },
      {
        "ip": 20,
        "line": 37
      },
      {
        "ip": 25,
        "line": 41
      },
      {
        "ip": 30,
        "line": 45
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2025-01-31T20:18:39.563Z"
}