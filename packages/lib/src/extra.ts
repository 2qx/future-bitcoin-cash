import {
    hexToBin,
    binToUtf8,
    lockingBytecodeToCashAddress,
    binToHex
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
        let addresses = json.data.search_output_prefix.filter(o => o.locking_bytecode.startsWith("\\x6a047574786f01500102021f11")).map(o => {
            let payload = hexToBin(o.locking_bytecode.slice(-70))
            return lockingBytecodeToCashAddress(payload)
        })

        return [...new Set(addresses)]

    } catch (error) {
        console.error(error.message);
    }
}

export async function getLichoWillAddresses() {
    try {
        const response = await fetch('https://demo.chaingraph.cash/v1/graphql', {
            credentials: 'omit',
            referrer: 'https://futurebitcoin.cash/',
            body: '{\"operationName\":\"SearchOutputsByLockingBytecodePrefix\",\"variables\":{},\"query\":\"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\\"6a043e736800\\\"}, distinct_on: locking_bytecode, where: {transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\\"mainnet\\\"}}}}}}}) {\\n    locking_bytecode\\n  }\\n}\\n\"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        let addresses = json.data.search_output_prefix.map(o => {
            // drop the "\\x", then parse the op_return 
            let parts = decodeNullDataScript(o.locking_bytecode.substring(2))//
            let output = parts.map(c => binToHex(c).match(/.{1,2}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),""))
            if (output.length==2){
                return output[1].split(" ")[0]
            } 
        })
        addresses = addresses.filter(x => x)
        console.log(addresses)
        return [...new Set(addresses)]

    } catch (error) {
        console.error(error.message);
    }
}


export async function getLichoMecenasAddresses() {
    try {
        const response = await fetch('https://demo.chaingraph.cash/v1/graphql', {
            credentials: 'omit',
            referrer: 'https://futurebitcoin.cash/',
            body: '{\"operationName\":\"SearchOutputsByLockingBytecodePrefix\",\"variables\":{},\"query\":\"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\\"6a043e736800\\\"}, distinct_on: locking_bytecode, where: {transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\\"mainnet\\\"}}}}}}}) {\\n    locking_bytecode\\n  }\\n}\\n\"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        let addresses = json.data.search_output_prefix.map(o => {
            // drop the "\\x", then parse the op_return 
            let parts = decodeNullDataScript(o.locking_bytecode.substring(2))//
            let output = parts.map(c => binToHex(c).match(/.{1,2}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),""))
            if (output.length==3){
                return output[1].split(" ")[0]
            } 
        })
        addresses = addresses.filter(x => x)
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
            body: '{\"operationName\":\"SearchOutputsByLockingBytecodePrefix\",\"variables\":{},\"query\":\"query SearchOutputsByLockingBytecodePrefix {\\n  search_output_prefix(args: {locking_bytecode_prefix_hex: \\\"6a047574786f01\\\"}, distinct_on: locking_bytecode, where: {transaction: {block_inclusions: {block: {accepted_by: {node: {name: {_regex: \\\"mainnet\\\"}}}}}}}) {\\n    locking_bytecode\\n  }\\n}\\n\"}',
            method: 'POST',
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const json = await response.json();
        let addresses = json.data.search_output_prefix.filter(o => !o.locking_bytecode.startsWith("\\x6a047574786f01500102021f11")).map(o => {
            // drop the "\\x", then parse the op_return for the checksum (locking bytecode)
            let payload = decodeNullDataScript(o.locking_bytecode.substring(2)).pop()
            let r =  lockingBytecodeToCashAddress(payload)
            if(typeof r === "string") return r
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
        let addresses = json.data.search_output_prefix.map(o => {
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


// For decoding OP_RETURN data
export function decodeNullDataScript(data: Uint8Array | string) {
    if (typeof data === "string") data = hexToBin(data);
  
    if (data.slice(0, 1)[0] !== 106) {
      throw Error(
        "Attempted to decode NullDataScript without a OP_RETURN code (106), not an OpReturn output?"
      );
    }
  
    // skip the OP_RETURN code data[0]
    let i = 1;
  
    const r: Uint8Array[] = [];
    while (i < data.length) {
      if (data.slice(i, i + 1)[0] === 0x4c) {
        r.push(data.slice(i, i + 1));
        i + 1;
      } else if (data.slice(i, i + 1)[0] === 0x4d) {
        throw Error("Not Implemented");
      } else {
        const len = data.slice(i, i + 1)[0]!;
        const start = i + 1;
        const end = start + len;
        r.push(data.slice(start, end));
        i = end;
      }
    }
    return r;
  }