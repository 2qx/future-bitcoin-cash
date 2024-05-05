// Automatically Generated
export const artifact = {
  "contractName": "metadata",
  "constructorInputs": [],
  "abi": [
    {
      "name": "test01",
      "inputs": []
    }
  ],
  "bytecode": "6a 534d5030 OP_SIZE OP_SWAP OP_CAT OP_CAT 1000 OP_SIZE OP_SWAP OP_CAT OP_CAT 74424348 OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT 7465737420424348 OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT OP_1 OP_OUTPUTBYTECODE OP_EQUALVERIFY 6a 534d5030 OP_SIZE OP_SWAP OP_CAT OP_CAT 1000 OP_SIZE OP_SWAP OP_CAT OP_CAT 74424348 OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT OP_0 OP_UTXOTOKENCOMMITMENT OP_SIZE OP_DUP 4b OP_GREATERTHAN OP_IF 4c OP_SWAP OP_CAT OP_ENDIF OP_SWAP OP_CAT OP_CAT OP_8 OP_SIZE OP_SWAP OP_CAT OP_CAT OP_2 OP_OUTPUTBYTECODE OP_EQUAL",
  "source": "pragma cashscript ^0.10.0;\n\n\ncontract metadata() {\n    function test01() {\n        bytes fungible = new LockingBytecodeNullData([\n            0x534D5030,\n            0x1000,\n            bytes('tBCH'),\n            bytes('test BCH')\n        ]);\n        require(tx.outputs[1].lockingBytecode == fungible);\n\n        bytes tokenCommitment = new LockingBytecodeNullData([\n            0x534D5030,\n            0x1000,\n            bytes('tBCH'),\n            tx.inputs[0].nftCommitment,\n            0x08\n        ]);\n        require(tx.outputs[2].lockingBytecode == tokenCommitment);\n    }\n}\n\n",
  "debug": {
    "bytecode": "016a04534d5030827c7e7e021000827c7e7e04744243488276014ba063014c7c7e687c7e7e0874657374204243488276014ba063014c7c7e687c7e7e51cd517a8769016a04534d5030827c7e7e021000827c7e7e04744243488276014ba063014c7c7e687c7e7e00cf8276014ba063014c7c7e687c7e7e58827c7e7e52cd517a87",
    "sourceMap": "6:25:11:10;7:12:7:22;;;;;8::8:18;;;;;9:18:9:24;:12::25;;;;;;;;;;;;10:18:10:28;:12::29;;;;;;;;;;;;12:27:12:28;:16::45;:49::57;;:16:::1;:8::59;14:32:20:10:0;15:12:15:22;;;;;16::16:18;;;;;17:18:17:24;:12::25;;;;;;;;;;;;18:22:18:23;:12::38;;;;;;;;;;;;;19::19:16;;;;;21:27:21:28;:16::45;:49::64;;:16:::1",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  }
}