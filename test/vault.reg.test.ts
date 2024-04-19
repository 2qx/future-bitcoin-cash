import type { Artifact } from "cashscript";
import {
    binToHex,
    hexToBin,
    cashAddressToLockingBytecode
} from "@bitauth/libauth";
import {
    ElectrumCluster,
    ClusterOrder,
    ElectrumTransport,
} from "electrum-cash";
import {
    Contract,
    ElectrumNetworkProvider,
    TransactionBuilder,
    SignatureTemplate
} from "cashscript";
import { RegTestWallet, TokenSendRequest, mine } from "mainnet-js";
import { artifact as v1 } from "../contracts/vault.v1.js";
import { getAnAliceWallet } from "./aliceWalletTest.js";

const DUST_UTXO_THRESHOLD = 546n;

describe(`TimeLock Tests`, () => {

    test("Should not pay before time is met, but should pay at time", async () => {

        let regTest = new ElectrumCluster(
            "CashScript Application",
            "1.4.1",
            1,
            1,
            ClusterOrder.PRIORITY,
            2000
        );
        regTest.addServer("127.0.0.1", 60003, ElectrumTransport.WS.Scheme, false);

        let provider = new ElectrumNetworkProvider("regtest", regTest, false);

        const transactionBuilder = new TransactionBuilder({ provider });
        const alice = await getAnAliceWallet(200_000)
        const bob = await RegTestWallet.newRandom();
        const aliceTemplate = new SignatureTemplate(alice.privateKey!)
        const bobTemplate = new SignatureTemplate(bob.privateKey!)

        let guessTokenId = (await alice.getUtxos())[0].txid
        const genesisResponse = await alice.tokenGenesis({
            cashaddr: alice.getTokenDepositAddress()!,      // token UTXO recipient, if not specified will default to sender's address
            amount: 2100000000000000n,        // fungible token amount
            commitment: "abcd",             // NFT Commitment message
            value: 1000,                    // Satoshi value
        });

        const tokenId = genesisResponse.tokenIds![0];
        const tokenIdUnRev = binToHex(hexToBin(genesisResponse.tokenIds![0]).reverse());
        expect(tokenId).toBe(guessTokenId)

        let blockHeight = (await alice.provider?.getBlockHeight())
        
        let locktime = BigInt(blockHeight! + 10)
        let contract = new Contract(
            v1 as Artifact,
            [locktime, tokenIdUnRev],
            { provider: provider, addressType: 'p2sh32' }
        );

        // fund the contract
        await alice.send([
            new TokenSendRequest({
                cashaddr: contract.tokenAddress,
                value: 10000,
                tokenId: tokenId,
                amount: 2100000000000000n
            }),
        ]);
        // fund the contract
        await alice.send({
            cashaddr: bob.getDepositAddress(),
            unit: "satoshis",
            value: 1000,
        });
        expect(await contract.getBalance()).toEqual(10000n);
        let aliceUtxos = await provider.getUtxos(alice.getTokenDepositAddress());
        let bobUtxos = await provider.getUtxos(bob.getTokenDepositAddress());
        let contractUtxos = await contract.getUtxos();


        let contractUtxo = contractUtxos[0];
        let aliceUtxo = aliceUtxos[0];
        let bobUtxo = bobUtxos[0];

        let aliceUtxoBalance = aliceUtxo.satoshis
        transactionBuilder.addInputs([
            { ...contractUtxo, unlocker: contract.unlock.placeOrRedeem(false) },
            { ...aliceUtxo, unlocker: aliceTemplate.unlockP2PKH() },
            { ...bobUtxo, unlocker: bobTemplate.unlockP2PKH() },
        ]);

        
        let contractOutput = {
            to: contract.tokenAddress,
            amount: 50_000n + contractUtxo.satoshis,
            token: {
                amount: contractUtxo.token?.amount! - 50_000n,
                category: tokenId,
            }
        }
        let aliceOutput = {
            to: alice.getTokenDepositAddress(),
            amount: BigInt(aliceUtxoBalance - 50_000n),
            token: {
                amount: 50_000n,
                category: tokenId,
            }
        }

        // console.log("tokenId: ", tokenId)
        // console.log(contractUtxo.token?.category!)
        
        // console.log("i1 token amount: ", aliceUtxo.token?.amount)
        // console.log("i0 <= o0: ", contractUtxo.token?.amount!-contractOutput.token.amount, "<=", contractOutput.amount )

        // console.log("0 balance: ", contractUtxo.satoshis + contractUtxo.token?.amount!, "==", contractOutput.amount + contractOutput.token.amount)
        // console.log("1 balance: ",aliceUtxo.satoshis + BigInt(aliceUtxo.token?.amount ? aliceUtxo.token?.amount : 0n), "==", aliceOutput.amount + BigInt(aliceOutput.token.amount))

        transactionBuilder.addOutputs([
            contractOutput,
            aliceOutput,
        ]);
        transactionBuilder.setLocktime(201);
        transactionBuilder.setMaxFee(1000n);
        let transaction = await transactionBuilder.send()


        await mine({
            /* cspell:disable-next-line */
            cashaddr: "bchreg:ppt0dzpt8xmt9h2apv9r60cydmy9k0jkfg4atpnp2f",
            blocks: 10,
        });

        // console.log((await alice.getTokenBalance(tokenId)))
        // console.log((await alice.getUtxos()))

        // console.log(transaction)
        expect((await alice.getTokenBalance(tokenId))).toBe(50_000n);

    });
});
