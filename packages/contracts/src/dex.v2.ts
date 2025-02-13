// Automatically Generated
export const artifact = {
  "contractName": "CatDex",
  "constructorInputs": [
    {
      "name": "authCat",
      "type": "bytes32"
    },
    {
      "name": "assetCat",
      "type": "bytes32"
    }
  ],
  "abi": [
    {
      "name": "swap",
      "inputs": []
    }
  ],
  "bytecode": "OP_INPUTINDEX OP_INPUTINDEX OP_2 OP_MOD OP_SUB OP_DUP OP_UTXOTOKENCATEGORY OP_2 OP_PICK OP_1 OP_CAT OP_EQUAL OP_IF OP_DUP OP_OUTPUTTOKENCATEGORY OP_2 OP_PICK OP_1 OP_CAT OP_EQUALVERIFY OP_DUP OP_OUTPUTBYTECODE OP_OVER OP_UTXOBYTECODE OP_EQUALVERIFY OP_DUP OP_1ADD OP_DUP OP_OUTPUTBYTECODE OP_2 OP_PICK OP_OUTPUTBYTECODE OP_EQUALVERIFY OP_DUP OP_OUTPUTTOKENAMOUNT OP_0 OP_GREATERTHAN OP_IF OP_DUP OP_OUTPUTTOKENCATEGORY OP_4 OP_PICK OP_EQUALVERIFY OP_ENDIF OP_OVER OP_UTXOTOKENCOMMITMENT OP_16 OP_SPLIT OP_OVER OP_BIN2NUM OP_OVER OP_BIN2NUM OP_4 OP_PICK OP_OUTPUTTOKENAMOUNT OP_5 OP_PICK OP_UTXOTOKENAMOUNT OP_SUB OP_2 OP_PICK OP_OVER OP_SUB OP_16 OP_NUM2BIN OP_2 OP_PICK OP_16 OP_NUM2BIN OP_CAT OP_7 OP_PICK OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_EQUALVERIFY OP_OVER OP_0 OP_GREATERTHAN OP_4 OP_PICK OP_0 OP_GREATERTHAN OP_EQUALVERIFY OP_OVER OP_ABS OP_4 OP_PICK OP_ABS OP_LESSTHANOREQUAL OP_VERIFY OP_7 OP_PICK OP_OUTPUTVALUE OP_8 OP_PICK OP_UTXOVALUE OP_SUB OP_2OVER OP_SWAP OP_MUL OP_NEGATE OP_GREATERTHANOREQUAL OP_VERIFY OP_2DROP OP_2DROP OP_2DROP OP_DROP OP_ELSE OP_0 OP_UTXOTOKENCATEGORY OP_2 OP_PICK OP_2 OP_CAT OP_EQUALVERIFY OP_ENDIF OP_2DROP OP_DROP OP_1",
  "source": "pragma cashscript ^0.10.0;\n\n//\n// CatDex - A token category authorized decentralized exchange\n//\n// Trade fungible tokens at fixed prices based on orders expressed in NFT commitments\n\n//   Features:\n//   - Allow for partial order fulfillment at a fixed price,\n//   - Allow contracts with zero (0) of a specific token to acquire a position in that token\n//   - Allow contracts with some number of tokens to liquidate that position completely\n//   - Allow a minting Baton holder to withdraw, or cancel any open order, by spending/burning utxos.\n//   - Zero commission trades, although order takers pay standard transaction fees to miners.\n//   - Given a known token category, orders are discoverable with the exchange token category.\n//   - Given an exchange category, orders are indexed and retrieved by getting the NFT balance of the exchange.\n\n// Usage:\n\n//   The exchange \"owner\" creates an NFT category with a minting baton to open trade orders on their own behalf.\n\n//   An order to Bid, or Buy, an asset is created by:\n//    creating a mutable NFT with the order in the commitment\n//    where the order quantity to be bought is *positive*, and\n//    the output contains sufficient value to fulfill the entire order,\n//    then sending that output to the dex contract.\n\n//   An Ask order, or Sell, is created as above:\n//     creating a mutable NFT identical to a buy, where,\n//     the quantity available for sale is *negative*,\n//     and the order utxo will accumulate any funds from the sale of the token,\n//     after the owner sends both: the order and the tokens to the contract as two utxos.\n\n//   Order Commitments: mutable NFT commitment to trade fungible token\n  \n//      byte16(LE)<quantity>   number of tokens remaining in order\n//      byte16(LE)<price>      price per token in sats\n//      TODO: multiplier   pre-multiply the token price by some fixed constant (i.e. decimals)\n//      ===\n//      32 length\n\n//   Transaction Building Modes:\n\n//    Order Mode:\n  \n//      In \"Order mode\" outputs are submitted in pairs, with both the record for the order\n//      and the cash value moving on the even \"foot\" and the tokens trading on the odd \"foot\".\n    \n//      orderAuth     input[even] -> output[even]  - An order NFT of category AuthCat (mutable)\n//      assetVault    input[odd]  -> output[odd]   - An input or output of category AssetCat.\n\n//    Withdraw Mode:\n  \n//      Transactions with a minting NFT may withdraw all outputs from the contract.\n  \n//      Auth             input[0] -> output[0]     - Authenticating NFT of category AuthCat (minting)\n//                       input[i] -> output[*]     - Unrestricted spending\n\n//   Note: \n\n//   The exchange owner(s) holds the minting NFT baton(s), which authorizes spending funds from the exchange.\n\n//   \n// CatDex - WIP 20250115\n//\n//   Parameters:\n//\n//     authCat - the token category authorizing trades or transfers (owner's NFT)\n//     assetCat - the category of the fungible token being traded\n//\n\ncontract CatDex(bytes32 authCat, bytes32 assetCat){\n\n\n    function swap(){\n    \n        // Set the index of the order baton related to this trade\n        // OP_INPUTINDEX OP_INPUTINDEX OP_2 OP_MOD OP_SUB\n        int orderIndex = this.activeInputIndex - (this.activeInputIndex % 2);   \n\n        // If the order input (even input) is a mutable auth Baton ... \n        // OP_DUP OP_UTXOTOKENCATEGORY OP_2 OP_PICK OP_1 OP_CAT OP_EQUAL OP_IF        \n        if(tx.inputs[orderIndex].tokenCategory == authCat + 0x01){\n\n            // Require the baton is passed back in an output of the same index with mutable capability\n            // OP_DUP OP_OUTPUTTOKENCATEGORY OP_2 OP_PICK OP_1 OP_CAT OP_EQUALVERIFY\n            require(tx.outputs[orderIndex].tokenCategory == authCat + 0x01,\n                    \"order baton must be returned intact\");\n\n            // Require the order baton be passed back to the contract\n            // OP_DUP OP_OUTPUTBYTECODE OP_OVER OP_UTXOBYTECODE OP_EQUALVERIFY\n            require(tx.outputs[orderIndex].lockingBytecode == \n                     tx.inputs[orderIndex].lockingBytecode,\n                     \"order baton must be returned to the dex\");\n\n            // verify asset thread:\n            // - output\n            // - categoryId\n            // - qty\n            //\n\n            // Get the next index of the asset thread\n            // OP_DUP OP_1ADD\n            int assetIndex = orderIndex + 1; \n\n            // Require the asset thread be sent at the current contract\n            // OP_DUP OP_OUTPUTBYTECODE OP_2 OP_PICK OP_OUTPUTBYTECODE OP_EQUALVERIFY\n            require(tx.outputs[assetIndex].lockingBytecode == \n                    tx.outputs[orderIndex].lockingBytecode,\n                     \"token output be returned to the dex\");                 \n                        \n            // if the amount of tokens is greater than zero,\n            // OP_DUP OP_OUTPUTTOKENAMOUNT OP_0 OP_GREATERTHAN OP_IF\n            if(tx.outputs[assetIndex].tokenAmount > 0){\n              // require the asset output contain token category specified by the order\n              // OP_DUP OP_OUTPUTTOKENCATEGORY OP_4 OP_PICK OP_EQUALVERIFY\n              require(tx.outputs[assetIndex].tokenCategory == assetCat,\n                \"wrong token passed as the return asset\");\n            } // OP_ENDIF\n\n            // Parse the order data from the NFT commitment\n            // OP_OVER OP_UTXOTOKENCOMMITMENT OP_16 OP_SPLIT\n            bytes quantityBin, bytes priceBin = \n                          tx.inputs[orderIndex].nftCommitment.split(16);\n\n            // OP_OVER OP_BIN2NUM\n            int orderQuantity = int(quantityBin);  \n\n            // OP_OVER OP_BIN2NUM\n            int price = int(priceBin);\n\n            // Get the amount of the token traded\n            // OP_4 OP_PICK OP_OUTPUTTOKENAMOUNT \n            // OP_5 OP_PICK OP_UTXOTOKENAMOUNT OP_SUB\n            int tradeQuantity = tx.outputs[assetIndex].tokenAmount - \n                                 tx.inputs[assetIndex].tokenAmount;\n\n            // Verify new authCat order baton NFT commitment\n            // OP_2 OP_PICK OP_OVER OP_SUB OP_16 OP_NUM2BIN \n            // OP_2 OP_PICK OP_16 OP_NUM2BIN OP_CAT\n            bytes32 nextCommitment = bytes16(orderQuantity-tradeQuantity) + bytes16(price);\n\n\n            // OP_7 OP_PICK OP_OUTPUTTOKENCOMMITMENT OP_OVER OP_EQUALVERIFY\n            require(tx.outputs[orderIndex].nftCommitment == nextCommitment,\n                \"order baton data was not updated to reflect trade\");\n\n            // require the sign of the quantity traded is matches the order sign  \n            // OP_OVER OP_0 OP_GREATERTHAN OP_4 OP_PICK OP_0 OP_GREATERTHAN OP_EQUALVERIFY\n            require(tradeQuantity > 0 == orderQuantity > 0,\n                \"conflicting trade & order direction\"); \n\n            // require the amount traded be less than (or equal to) the quantity available\n            // OP_OVER OP_ABS OP_4 OP_PICK OP_ABS OP_LESSTHANOREQUAL OP_VERIFY\n            require(\n                abs(tradeQuantity) <= abs(orderQuantity),\n                \"trade must be less than or equal to order quantity available\"\n                );\n\n\n            // Verify the value returned with the order exceeds the quantity traded times the price.\n            //\n            // Examples:\n            // 0 - 10,000 sats  ->  534 sats  \n            //        |-> Buy -1000 @ 10 sat\n            // 1 -      0 ft    -> 10,000 ft          534-10,000 >= -1000*10 OK\n            //\n            // 2 -  800 sats     -> 10,800 sats\n            //       |-> Sell 1000 @ 10 sat/ft\n            // 3 -  1,000 ft    -> 0 ft                   10,000 >= 1000*10 OK\n            //\n            // OP_7 OP_PICK OP_OUTPUTVALUE OP_8 OP_PICK OP_UTXOVALUE OP_SUB \n            // OP_2OVER OP_SWAP OP_MUL OP_NEGATE OP_GREATERTHANOREQUAL OP_VERIFYY\n            require(\n                (tx.outputs[orderIndex].value - tx.inputs[orderIndex].value) >= -(tradeQuantity*price),\n                \"Payment for order too low\"\n            );\n            //\n        } // OP_2DROP OP_2DROP OP_2DROP OP_DROP\n        //\n        // otherwise, if the zeroth input contains the minting baton \n        // OP_ELSE\n        else{\n            // Authentication failed, script fails.\n            // OP_0 OP_UTXOTOKENCATEGORY OP_2 OP_PICK OP_2 OP_CAT OP_EQUALVERIFY\n            require(tx.inputs[0].tokenCategory == authCat + 0x02,\n                \"Authorizing order baton NFT must be passed with each trade on an even input.\");\n        } //  OP_ENDIF\n    } // OP_ENDIF\n} // OP_2DROP OP_2DROP OP_1",
  "debug": {
    "bytecode": "c0c05297940079ce5279517e87630079d15279517e87690079cd5179c78769007951930079cd5279cd87690079d300a0630079d154798769685179cf607f5179815179815479d35579d09452795179946080527960807e5779d251798769517900a0547900a08769517990547990a1695779cc5879c69452795479958fa269757575757575756700ce5279527e87696851777777",
    "sourceMap": "78:25:78:46;:50::71;:74::75;:50:::1;:25::76;82:21:82:31:0;;:11::46;:50::57;;:60::64;:50:::1;:11;:65:178:9:0;86:31:86:41;;:20::56;:60::67;;:70::74;:60:::1;:20;:12:87:59;91:31:91:41:0;;:20::58;92:31:92:41;;:21::58;91:20:::1;:12:93:64;103:29:103:39:0;;:42::43;:29:::1;107:31:107:41:0;;:20::58;108:31:108:41;;:20::58;107::::1;:12:109:60;113:26:113:36:0;;:15::49;:52::53;:15:::1;:54:118:13:0;116:33:116:43;;:22::58;:62::70;;:22:::1;:14:117:58;113:54:118:13;123:36:123:46:0;;:26::61;:68::70;:26::71:1;126:36:126:47:0;;:32::48:1;129:28:129:36:0;;:24::37:1;134:43:134:53:0;;:32::66;135:43:135:53;;:33::66;134:32:::1;140:45:140:58:0;;:59::72;;:45:::1;:37::73;;:84::89:0;;:76::90:1;;:37;144:31:144:41:0;;:20::56;:60::74;;:20:::1;:12:145:69;149:20:149:33:0;;:36::37;:20:::1;:41::54:0;;:57::58;:41:::1;:20;:12:150:55;155:20:155:33:0;;:16::34:1;:42::55:0;;:38::56:1;:16;154:12:157:18;174:28:174:38:0;;:17::45;:58::68;;:48::75;:17:::1;:82::95:0;;:96::101;;:82:::1;:80::102:0;:16:::1;173:12:176:14;82:65:178:9;;;;;;;182:12:187::0;185:30:185:31;:20::46;:50::57;;:60::64;:50:::1;:20;:12:186:96;182::187:9;74:4:188:5;;;",
    "logs": [],
    "requires": [
      {
        "ip": 24,
        "line": 86,
        "message": "order baton must be returned intact"
      },
      {
        "ip": 32,
        "line": 91,
        "message": "order baton must be returned to the dex"
      },
      {
        "ip": 44,
        "line": 107,
        "message": "token output be returned to the dex"
      },
      {
        "ip": 57,
        "line": 116,
        "message": "wrong token passed as the return asset"
      },
      {
        "ip": 95,
        "line": 144,
        "message": "order baton data was not updated to reflect trade"
      },
      {
        "ip": 105,
        "line": 149,
        "message": "conflicting trade & order direction"
      },
      {
        "ip": 113,
        "line": 154,
        "message": "trade must be less than or equal to order quantity available"
      },
      {
        "ip": 128,
        "line": 173,
        "message": "Payment for order too low"
      },
      {
        "ip": 144,
        "line": 185,
        "message": "Authorizing order baton NFT must be passed with each trade on an even input."
      }
    ]
  },
  "compiler": {
    "name": "cashc",
    "version": "0.10.0-next.6"
  },
  "updatedAt": "2025-01-31T20:18:39.614Z"
}