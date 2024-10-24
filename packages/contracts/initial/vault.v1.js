// Automatically Generated
export const artifact = {
    "contractName": "Vault",
    "constructorInputs": [
        {
            "name": "locktime",
            "type": "bytes4"
        },
        {
            "name": "tokenCategory",
            "type": "bytes32"
        }
    ],
    "abi": [
        {
            "name": "swap",
            "inputs": []
        }
    ],
    "bytecode": "OP_2 OP_TXVERSION OP_NUMEQUALVERIFY OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_SUB OP_0 OP_GREATERTHAN OP_INPUTINDEX OP_OUTPUTBYTECODE aa20 OP_ACTIVEBYTECODE OP_HASH256 OP_CAT 87 OP_CAT OP_EQUAL OP_SWAP OP_BOOLAND OP_IF OP_DUP OP_BIN2NUM OP_CHECKLOCKTIMEVERIFY OP_DROP OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_2 OP_PICK OP_EQUALVERIFY OP_ENDIF OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUALVERIFY OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUAL OP_NIP OP_NIP",
    "source": "pragma cashscript ^0.10.0;\n\n// Vault - Store coins locked for tokens until maturation date. \n//\n// From: Future Bitcoin Cash\n//\n// Author: 2qx <2qx_in_the_future@small.neomailbox.ch>\n//\n//     If redeeming tokens for coins in the vault: \n// [ ]   enforce the timelock is met.\n// [ ]   enforce the token category matches.\n//\n// [ ] Assure the utxo token category matches that of the output.\n// [ ] Assure the the utxo and output lock match per in the transaction.\n// [ ] Assure an equal amounts of coins are exchanged for tokens\n//\n// [WIP] 2024-04-25\n//\n//  inputs              outputs\n//  [0] contract    ->  [0] contract\n//  [1] userPkh     =>  [1] userPkh\n//  [2] coupon?     -^\n//\n\ncontract Vault(bytes4 locktime, bytes32 tokenCategory) {\n\n    function swap() {\n\n        require(2 == tx.version);\n        \n        // If tokens are being redeemed to the vault\n        // tokens may be redeemed in any amount after the future has matured\n        bool tokensRedeemed = (\n          tx.outputs[this.activeInputIndex].tokenAmount \n          - tx.inputs[this.activeInputIndex].tokenAmount\n          ) > 0;\n        bool toVault = tx.outputs[this.activeInputIndex].lockingBytecode \n                 == new LockingBytecodeP2SH32(hash256(this.activeBytecode));\n\n        // Restrict redemption unil after locktime\n        if(toVault && tokensRedeemed){\n          \n            // enforce a BIP65 timelock \n            require(tx.time >= int(locktime));\n\n            // of the correct category.\n            require(tx.outputs[this.activeInputIndex].tokenCategory == tokenCategory);\n        } \n\n        // \n        // Inspired by wrapped.cash c.Nov 2023\n        // Author: Dagur Valberg Johannsson <dagurval@pvv.ntnu.no> \n        // License: MIT\n        //\n        require(\n          tx.inputs[this.activeInputIndex].tokenCategory \n          == \n          tx.outputs[this.activeInputIndex].tokenCategory\n          );\n\n        // Enforce that this contract lives on\n        require(\n          tx.outputs[this.activeInputIndex].lockingBytecode \n          == \n          tx.inputs[this.activeInputIndex].lockingBytecode\n          );\n\n        require(\n          tx.inputs[this.activeInputIndex].tokenAmount + \n          tx.inputs[this.activeInputIndex].value \n          == \n          tx.outputs[this.activeInputIndex].tokenAmount + \n          tx.outputs[this.activeInputIndex].value\n         );\n    }\n\n}\n",
    "debug": {
        "bytecode": "52c29c69c0d3c0d09400a0c0cd02aa20c1aa7e01877e87007a517a9a63007981b175c0d15279876968c0cec0d18769c0cdc0c78769c0d0c0c693c0d3c0cc939c7777",
        "sourceMap": "29:16:29:17;:21::31;:16:::1;:8::33;34:21:34:42:0;:10::55;35:22:35:43;:12::56;34:10:::1;36:14:36:15:0;33:30:::1;37:34:37:55:0;:23::72;38:20:38:75;:54::73;:46::74:1;:20::75:0;;;37:23:::1;41:11:41:18:0;;:22::36;;:11:::1;:37:48:9:0;44:35:44:43;;:31::44:1;:12::46;;47:31:47:52:0;:20::67;:71::84;;:20:::1;:12::86;41:37:48:9;56:20:56:41:0;:10::56;58:21:58:42;:10::57;56::::1;55:8:59:12;63:21:63:42:0;:10::59;65:20:65:41;:10::58;63::::1;62:8:66:12;69:20:69:41:0;:10::54;70:20:70:41;:10::48;69::::1;72:21:72:42:0;:10::55;73:21:73:42;:10::49;72::::1;69;27:4:75:5;",
        "logs": [],
        "requireMessages": []
    },
    "compiler": {
        "name": "cashc",
        "version": "0.10.0-next.4"
    },
    "updatedAt": ""
};
//# sourceMappingURL=vault.v1.js.map