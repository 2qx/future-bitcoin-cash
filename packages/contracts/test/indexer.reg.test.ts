import {
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
    FailedTransactionError,
    TransactionBuilder,
    SignatureTemplate
} from "cashscript";
import { RegTestWallet, SendRequest, mine, NFTCapability } from "mainnet-js";
import { indexerArtifact } from "../src/";
import { getAnAliceWallet } from "./aliceWalletTest";
import exp from "constants";

const to32LE = numberToBinUint32LEClamped;

const DUST_UTXO_THRESHOLD = 546n;

describe(`Coupon Tests`, () => {

   
    test("Should store, then clear off old record", async () => {
       
        expect.assertions(3);

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

        const alice = await getAnAliceWallet(500_000)
        const contract = new Contract(indexerArtifact, ["beef"], { provider });

        

        const genesisResponse = await alice.tokenGenesis({
            cashaddr: contract.address,      // token UTXO recipient, if not specified will default to sender's address
            amount: 0n,                      // fungible token amount
            commitment: "abcd",             // NFT Commitment message
            capability: NFTCapability.none, // NFT capability
            value:800
          });

        let contractUtxos = await provider.getUtxos(contract.address);

        expect(contractUtxos[0].token.nft.commitment).toBe("abcd");
        expect(contractUtxos[0].satoshis).toBe(800n);

        await mine({
            /* cspell:disable-next-line */
            cashaddr: "bchreg:ppt0dzpt8xmt9h2apv9r60cydmy9k0jkfg4atpnp2f",
            blocks: 900,
        });

        contractUtxos = await provider.getUtxos(contract.address);

        let utxos = await contract.getUtxos()
        await contract!.functions
              .drop()
              .from(utxos)
              .withAge(900)
              .withOpReturn([])
              .withoutChange()
              .withoutTokenChange()
              .send()
        const finalUtxos = await provider.getUtxos(contract.address);

        expect(finalUtxos.length).toBe(0)
        
    });


});
