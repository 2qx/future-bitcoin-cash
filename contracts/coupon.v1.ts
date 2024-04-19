// Automatically Generated
export const artifact = {
  "contractName": "Coupon",
  "constructorInputs": [
    {
      "name": "destinationLockingBytecode",
      "type": "bytes"
    },
    {
      "name": "descretAmount",
      "type": "int"
    }
  ],
  "abi": [
    {
      "name": "apply",
      "inputs": []
    }
  ],
  "bytecode": "OP_0 OP_OUTPUTVALUE OP_ROT OP_NUMEQUALVERIFY OP_0 OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_TXINPUTCOUNT OP_3 OP_NUMEQUAL",
  "source": "pragma cashscript ^0.10.0;\n\n// [WIP] 2024-03-01\n\n// Allow anyone to use an unspent output in a transactoin.\n// Given:\n//  - The zeroth output is to a preconfigured address, \n//  - The zeroth output value matches a predefined amount.\n//  - There are no more than three inputs\n//\n// This contract is designed to run as the third input\n//   for a transaction. This logic only pertains to \n//   coupon spending. It's not suffecent to secure \n//   a complete transaction.\n//\n// If used as a template in a different context, the destination\n// MUST assure funds cannot be withdrawn immediately \n// in the same transaction\n\ncontract Coupon(\n  // Locking bytecode the coupon will be applied to\n  bytes destinationLockingBytecode,\n\n  // Amount required as first output to claim the coupon.\n  int descretAmount\n){\n  function apply() {\n\n    // assure at the entire amount sent to the contract exceeds some threshold\n    require(tx.outputs[0].value == descretAmount);\n\n    // Check that the first output \n    // sends to the intended recipient. \n    require(\n      tx.outputs[0].lockingBytecode \n      == destinationLockingBytecode\n    );\n\n    // This contract may be spent in a transaction with exactly three inputs\n    require(tx.inputs.length == 3);\n\n\n  }\n}\n",
  "debug": {
    "bytecode": "00cc527a9c6900cd517a8769c3539c",
    "sourceMap": "30:23:30:24;:12::31;:35::48;;:12:::1;:4::50;35:17:35:18:0;:6::35;36:9:36;;35:6:::1;34:4:37:6;40:12:40:28:0;:32::33;:12:::1",
    "logs": [],
    "requireMessages": []
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.4"
  },
  "updatedAt": "2024-04-19T18:30:44.523Z"
}