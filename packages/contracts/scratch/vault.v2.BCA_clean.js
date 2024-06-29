// Automatically Generated
export const artifact = {
    "contractName": "Vault",
    "constructorInputs": [
        {
            "name": "locktime",
            "type": "int"
        },
        {
            "name": "maxSupply",
            "type": "int"
        }
    ],
    "abi": [
        {
            "name": "SwapOrTerminate",
            "inputs": []
        }
    ],
    "bytecode": "OP_INPUTINDEX OP_UTXOTOKENCOMMITMENT OP_DUP OP_0 OP_EQUAL OP_NOT OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_0 OP_EQUAL OP_BOOLAND OP_IF OP_OVER OP_CHECKLOCKTIMEVERIFY OP_DROP OP_ELSE OP_INPUTINDEX OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_EQUALVERIFY OP_ENDIF OP_DUP OP_0 OP_EQUAL OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_4 OP_ROLL OP_NUMEQUAL OP_BOOLAND OP_IF OP_INPUTINDEX OP_OUTPUTBYTECODE 6a OP_EQUALVERIFY OP_ELSE OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_SUB OP_OVER OP_0 OP_EQUAL OP_NOTIF OP_DUP OP_0 OP_LESSTHAN OP_VERIFY OP_ELSE OP_DUP OP_0 OP_GREATERTHAN OP_VERIFY OP_ENDIF OP_INPUTINDEX OP_OUTPUTBYTECODE OP_INPUTINDEX OP_UTXOBYTECODE OP_EQUALVERIFY OP_INPUTINDEX OP_UTXOTOKENAMOUNT OP_INPUTINDEX OP_UTXOVALUE OP_ADD OP_INPUTINDEX OP_OUTPUTTOKENAMOUNT OP_INPUTINDEX OP_OUTPUTVALUE OP_ADD OP_NUMEQUALVERIFY OP_DROP OP_ENDIF OP_INPUTINDEX OP_UTXOTOKENCATEGORY OP_INPUTINDEX OP_OUTPUTTOKENCATEGORY OP_EQUAL OP_NIP OP_NIP",
    "source": "contract Vault(int locktime, int maxSupply) {\n\n    function SwapOrTerminate() {\n\n        // redeemsDisabled state stored in the commitment can either be\n        // passed on or irreversibly switched to enabled after locktime expires.\n        bytes redeemsDisabled = tx.inputs[this.activeInputIndex].nftCommitment;\n        if (redeemsDisabled != 0x &&\n            tx.outputs[this.activeInputIndex].nftCommitment == 0x\n        ) {\n            // If attempting to enable redeems, the TX must satisfy locktime\n            require(tx.time >= locktime);\n        } else {\n            // Else, just pass it on as it is\n            require(tx.outputs[this.activeInputIndex].nftCommitment ==\n                redeemsDisabled);\n        }\n\n        // Mint, redeem, or terminate, depending on baton state.\n        if (redeemsDisabled == 0x &&\n            tx.inputs[this.activeInputIndex].tokenAmount == maxSupply\n        ) {\n            // If all tokens have been returned *after* expiry, then\n            // this Vault instance can be cleaned up.\n            require(tx.outputs[this.activeInputIndex].lockingBytecode == 0x6a);\n        } else {\n            // Enforce mint or redeem, depending on commitment state\n            int tokensRedeemed = tx.outputs[this.activeInputIndex].tokenAmount -\n                tx.inputs[this.activeInputIndex].tokenAmount;\n            if (redeemsDisabled != 0x) {\n                require(tokensRedeemed < 0);\n            } else {\n                require(tokensRedeemed > 0);\n            }\n\n            // Pass on the contract\n            require(tx.outputs[this.activeInputIndex].lockingBytecode ==\n                tx.inputs[this.activeInputIndex].lockingBytecode);\n\n            // Pass on the correct balance\n            require(tx.inputs[this.activeInputIndex].tokenAmount +\n                tx.inputs[this.activeInputIndex].value == \n                tx.outputs[this.activeInputIndex].tokenAmount + \n                tx.outputs[this.activeInputIndex].value);\n        }\n\n        // Token category and capability must be passed on in any case.\n        require(tx.inputs[this.activeInputIndex].tokenCategory ==\n            tx.outputs[this.activeInputIndex].tokenCategory);\n    }\n}\n",
    "debug": {
        "bytecode": "c0cf0079008791c0d200879a635179b17567c0d2517987696800790087c0d0547a9c9a63c0cd016a876967c0d3c0d0945179008791630079009f6967007900a06968c0cdc0c78769c0d0c0c693c0d3c0cc939c697568c0cec0d1877777",
        "sourceMap": "7:42:7:63;:32::78;8:12:8:27;;:31::33;:12:::1;;9:23:9:44:0;:12::59;:63::65;:12:::1;8;10:10:13:9:0;12:31:12:39;;:12::41:1;;13:15:17:9:0;15:31:15:52;:20::67;16:16:16:31;;15:20:::1;:12::33;13:15:17:9;20:12:20:27:0;;:31::33;:12:::1;21:22:21:43:0;:12::56;:60::69;;:12:::1;20;22:10:26:9:0;25:31:25:52;:20::69;:73::77;:20:::1;:12::79;26:15:45:9:0;28:44:28:65;:33::78;29:26:29:47;:16::60;28:33:::1;30:16:30:31:0;;:35::37;:16:::1;;:39:32:13:0;31:24:31:38;;:41::42;:24:::1;:16::44;32:19:34:13:0;33:24:33:38;;:41::42;:24:::1;:16::44;32:19:34:13;37:31:37:52:0;:20::69;38:26:38:47;:16::64;37:20:::1;:12::66;41:30:41:51:0;:20::64;42:26:42:47;:16::54;41:20:::1;43:27:43:48:0;:16::61;44:27:44:48;:16::55;43::::1;41:20;:12::57;26:15:45:9;;48:26:48:47:0;:16::62;49:23:49:44;:12::59;48:16:::1;3:4:50:5;",
        "logs": [],
        "requireMessages": []
    },
    "compiler": {
        "name": "cashc",
        "version": "0.10.0-next.4"
    },
    "updatedAt": ""
};
//# sourceMappingURL=vault.v2.BCA_clean.js.map