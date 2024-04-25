import type { Artifact } from "cashscript";
import {
    binToHex,
    hexToBin,
    swapEndianness,
    numberToBinUint32LEClamped,
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
    FailedRequireError,
    TransactionBuilder,
    SignatureTemplate
} from "cashscript";
import { RegTestWallet, SendRequest, mine } from "mainnet-js";
import { artifact as v1 } from "../contracts/coupon.v1.js";
import { getAnAliceWallet } from "./aliceWalletTest.js";

const to32LE = numberToBinUint32LEClamped;

const DUST_UTXO_THRESHOLD = 546n;

describe(`Coupon Tests`, () => {

    test("Should apply coupon", async () => {

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
        const alice = await getAnAliceWallet(500_000)
        const shop = await RegTestWallet.newRandom();
        const charlie = await RegTestWallet.newRandom();

        const charlieTemplate = new SignatureTemplate(charlie.privateKey!)

        let lock = cashAddressToLockingBytecode(shop.getDepositAddress());
        if (typeof lock == "string") throw lock
        lock

        const contract = new Contract(v1, [55_000n, lock.bytecode], { provider });

        await alice.send([
            new SendRequest({
                cashaddr: contract.address,
                value: 5000,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: contract.address,
                value: 5000,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: contract.address,
                value: 5000,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: charlie.getDepositAddress(),
                value: 49540,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: charlie.getDepositAddress(),
                value: 1044,
                unit: 'sats'
            }),
        ])

        const contractUtxos = await provider.getUtxos(contract.address);
        const charlieUtxos = await provider.getUtxos(charlie.getDepositAddress());

        transactionBuilder.addInputs([
            { ...charlieUtxos[0], unlocker: charlieTemplate.unlockP2PKH() },
            { ...charlieUtxos[1], unlocker: charlieTemplate.unlockP2PKH() },
            { ...contractUtxos[0], unlocker: contract.unlock.apply() },
        ]);

        transactionBuilder.addOutputs([
            { to: shop.getDepositAddress(), amount: 55_000n },
        ]);
        let debug = transactionBuilder.build()
        let tx = transactionBuilder.build()
        let transaction = transactionBuilder.send()

        await expect(transaction).resolves.not.toThrow();
        expect((await transaction).outputs[0]!.valueSatoshis).toBe(55_000n)
    });

    test("Should fail if coupon isn't third", async () => {
       
        expect.assertions(1);

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
        const alice = await getAnAliceWallet(500_000)
        const shop = await RegTestWallet.newRandom();
        const charlie = await RegTestWallet.newRandom();

        const charlieTemplate = new SignatureTemplate(charlie.privateKey!)

        let lock = cashAddressToLockingBytecode(shop.getDepositAddress());
        if (typeof lock == "string") throw lock
        lock

        const contract = new Contract(v1, [55_000n, lock.bytecode], { provider });

        await alice.send([
            new SendRequest({
                cashaddr: contract.address,
                value: 5000,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: contract.address,
                value: 5000,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: contract.address,
                value: 5000,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: charlie.getDepositAddress(),
                value: 49540,
                unit: 'sats'
            }),
            new SendRequest({
                cashaddr: charlie.getDepositAddress(),
                value: 1044,
                unit: 'sats'
            }),
        ])

        const contractUtxos = await provider.getUtxos(contract.address);
        const charlieUtxos = await provider.getUtxos(charlie.getDepositAddress());

        transactionBuilder.addInputs([
            { ...charlieUtxos[0], unlocker: charlieTemplate.unlockP2PKH() },
            { ...contractUtxos[0], unlocker: contract.unlock.apply() },
            { ...charlieUtxos[1], unlocker: charlieTemplate.unlockP2PKH() },
        ]);

        transactionBuilder.addOutputs([
            { to: shop.getDepositAddress(), amount: 55_000n },
        ]);
        let debug = transactionBuilder.build()
        let tx = transactionBuilder.build()

        const txPromise = transactionBuilder.send()
        await expect(txPromise).rejects.toThrow(FailedRequireError);
        
    });
});
