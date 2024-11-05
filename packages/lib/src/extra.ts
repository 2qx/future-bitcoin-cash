import {
    encodeCashAddress,
    CashAddressNetworkPrefix,
    CashAddressType,
    hexToBin,
    binToUtf8,
    base58AddressToLockingBytecode,
    lockingBytecodeToCashAddress
} from "@bitauth/libauth";

// Hodl
// query SearchOutputsByLockingBytecodePrefix {
//     search_output_prefix(
//       args: { locking_bytecode_prefix_hex: "6a04686f646c" }
//       distinct_on: locking_bytecode
//       where: {
//         _or: [
//           {
//             transaction: {
//               block_inclusions: {
//                 block: { accepted_by: { node: { name: { _regex: "mainnet" } } } }
//               }
//             }
//           }
//           {
//             transaction: {
//               node_validations: { node: { name: { _regex: "mainnet" } } }
//             }
//           }
//           {
//             transaction: {
//               node_validations: { node_internal_id: { _is_null: true } }
//             }
//           }
//         ]
//       }
//     ) {
//       locking_bytecode
//     }
//   }


// await fetch("https://demo.chaingraph.cash/v1/graphql", {
//     "credentials": "omit",
//     "referrer": "https://futurebitcoin.cash/",
//     "body": "{\"operationName\":\"SearchOutputsByLockingBytecodePrefix\",\"variables\":{},\"query\":\"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\\"6a04686f646c\\\"}, distinct_on: locking_bytecode, where: {_or: [{transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\\"mainnet\\\"}}}}}}}, {transaction: {node_validations: {node: {name: {_regex: \\\"mainnet\\\"}}}}}, {transaction: {node_validations: {node_internal_id: {_is_null: true}}}}]}) {\\n    locking_bytecode\\n  }\\n}\\n\"}",
//     "method": "POST",
//     "mode": "cors"
// });


// await fetch("https://gql.chaingraph.pat.mn/v1/graphql", {
//     "credentials": "omit",
//     "referrer": "https://futurebitcoin.cash/",
//     "body": "{\"query\":\"query SearchOutputsByLockingBytecodePrefix(\\n      $prefix: String!\\n      $node: String!\\n      $exclude_pattern: String\\n      $limit: Int\\n      $offset: Int\\n    ) {\\n            search_output_prefix(\\n              args: { locking_bytecode_prefix_hex: $prefix }\\n              distinct_on: locking_bytecode,\\n              limit: $limit,\\n              offset: $offset,\\n              where: {\\n                _and: [\\n                  { locking_bytecode_pattern: {  _nlike: $exclude_pattern } }\\n                  \\n                  {\\n                    _or: [\\n                      {\\n                        transaction: {\\n                          block_inclusions: {\\n                            block: { accepted_by: { node: { name: { _regex: $node } } } }\\n                          }\\n                        }\\n                      }\\n                      {\\n                        transaction: {\\n                          node_validations: { node: { name: { _regex: $node } } }\\n                        }\\n                      }\\n                      {\\n                        transaction:{\\n                          node_validations:{\\n                            node_internal_id:{_is_null:true}\\n                          }\\n                        }\\n                      }\\n                    ]\\n                  }\\n                ]\\n              }\\n            ) {\\n              locking_bytecode_pattern,\\n              locking_bytecode,\\n              transaction{\\n                block_inclusions{\\n                  block{\\n                    height\\n                  }\\n                }\\n              }\\n            }\\n          }\",\"variables\":{\"prefix\":\"6a047574786f01500102021f1117a914e7\",\"node\":\"mainnet\",\"limit\":1000,\"offset\":0,\"exclude_pattern\":\"6a0401010102010717\"}}",
//     "method": "POST",
//     "mode": "cors"
// });

export async function getUnspentAddresses() {
    try {
        const response = await fetch('https://demo.chaingraph.cash/v1/graphql', {
            credentials: 'omit',
            referrer: 'https://futurebitcoin.cash/',
            body: '{\"operationName\":\"SearchOutputsByLockingBytecodePrefix\",\"variables\":{},\"query\":\"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\\"6a047574786f01500102\\\"}, distinct_on: locking_bytecode, where: {transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\\"mainnet\\\"}}}}}}}) {\\n    locking_bytecode\\n  }\\n}\\n\"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        let addresses = json.data.search_output_prefix.filter(o => o.locking_bytecode.startsWith("\\x6a047574786f01500102")).map(o => {
            let payload = hexToBin(o.locking_bytecode.slice(-70))
            return lockingBytecodeToCashAddress(payload)
        })

        return [...new Set(addresses)]

    } catch (error) {
        console.error(error.message);
    }
}

export async function getUnspentV1Addresses() {
    try {
        const response = await fetch('https://demo.chaingraph.cash/v1/graphql', {
            credentials: 'omit',
            referrer: 'https://futurebitcoin.cash/',
            body: '{"operationName":"SearchOutputsByLockingBytecodePrefix","variables":{},"query":"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\"6a047574786f01500101\\"}, distinct_on: locking_bytecode, where: {_or: [{transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\"mainnet\\"}}}}}}}, {transaction: {node_validations: {node: {name: {_regex: \\"mainnet\\"}}}}}, {transaction: {node_validations: {node_internal_id: {_is_null: true}}}}]}) {\\n    locking_bytecode\\n  }\\n}\\n"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        let addresses = json.data.search_output_prefix.filter(o => o.locking_bytecode.startsWith("\\x6a047574786f01500101")).map(o => {
            let payload = hexToBin(o.locking_bytecode.slice(-70))
            return lockingBytecodeToCashAddress(payload)
        })

        return [...new Set(addresses)]

    } catch (error) {
        console.error(error.message);
    }
}

export async function getHodlAddresses() {
    try {
        const response = await fetch('https://demo.chaingraph.cash/v1/graphql', {
            credentials: 'omit',
            referrer: 'https://futurebitcoin.cash/',
            body: '{"operationName":"SearchOutputsByLockingBytecodePrefix","variables":{},"query":"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\"6a04686f646c\\"}, distinct_on: locking_bytecode, where: {_or: [{transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\"mainnet\\"}}}}}}}, {transaction: {node_validations: {node: {name: {_regex: \\"mainnet\\"}}}}}, {transaction: {node_validations: {node_internal_id: {_is_null: true}}}}]}) {\\n    locking_bytecode\\n  }\\n}\\n"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        let addresses =  json.data.search_output_prefix.map(o => {
            let len = parseInt(o.locking_bytecode.slice(14, 16), 16)
            let payload = o.locking_bytecode.substring(16, 16 + len * 2)
            let addr = binToUtf8(hexToBin(payload)).split(" ")[0]
            return addr
        })

        return [...new Set(addresses)]

    } catch (error) {
        console.error(error.message);
    }
}
