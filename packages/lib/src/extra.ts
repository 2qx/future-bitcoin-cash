import {
    encodeCashAddress,
    CashAddressNetworkPrefix,
    CashAddressType,
    hexToBin,
    binToUtf8,
    base58AddressToLockingBytecode,
    lockingBytecodeToCashAddress
} from "@bitauth/libauth";


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
            body: '{\"operationName\":\"SearchOutputsByLockingBytecodePrefix\",\"variables\":{},\"query\":\"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\\"6a047574786f01500101\\\"}, distinct_on: locking_bytecode, where: {transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\\"mainnet\\\"}}}}}}}) {\\n    locking_bytecode\\n  }\\n}\\n\"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        let addresses = json.data.search_output_prefix.filter(o => o.locking_bytecode.startsWith("\\x6a047574786f01500101")).map(o => {
            let payload = hexToBin(o.locking_bytecode.slice(-46))
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
