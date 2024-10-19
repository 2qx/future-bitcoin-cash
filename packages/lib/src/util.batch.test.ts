
import { getAllBalances, getAllUnspentCoupons, getRates, getRateLocale } from "./util"
import { Vault } from "./vault"
// Load the electrum library.
import { ElectrumClient } from '@electrum-cash/network';

async function verifyAll(ec) {
    return
}

describe(`Token series validity tests`, () => {

    test("get TLV ", async () => {

        const electrumClient = new ElectrumClient('Future Bitcoin Cash Tests', '1.4.1', 'bch.imaginary.cash');
        await electrumClient.connect();

        let addresses = Vault.getAllSeries(867000)
        let balances = (await getAllBalances(electrumClient, addresses)).reduce((a, b) => a + b, 0)
        console.log(balances / 1e8)

    })


    test("get all coupons ", async () => {

        const electrumClient = new ElectrumClient('Future Bitcoin Cash Tests', '1.4.1', 'bch.imaginary.cash');
        await electrumClient.connect();
        let allCoupons = await Vault.getAllCouponUtxos(electrumClient, 867000)
        allCoupons = allCoupons.sort((a,b) => b.spb-a.spb)
        console.log(allCoupons.slice(0,10))
    
    })

})

