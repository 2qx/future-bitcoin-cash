import { getFutureBlockDate } from './util';
import { getRates, getRateLocale } from './util';


describe('test example contract functions', () => {
    it('should get the time of block 500m block icon', async () => {
        let test = getFutureBlockDate(850233, 500000000)
        expect(test.getTime()).toBeGreaterThan(Date.parse('11514-11-01'));
    });

    it('should calculate sat per coin per block', async () => {
        expect(getRates(850, 851, 50).spb).toBe(50);
        expect(getRates(850, 851, 50, 10000000).spb).toBe(500);
        expect(getRates(850, 851, 50, 1000000000).spb).toBe(5);
        expect(getRates(850, 860, 50).spb).toBe(5);
        expect(getRates(850, 860, 50, 10000000).spb).toBe(50);
        expect(getRates(850, 860, 50, 1000000000).spb).toBe(0.5);
        expect(getRates(850, 800, 50, 1000000000).spb).toBe(Infinity);
    });

    it('should calculate yield to maturity', async () => {
        expect(getRates(100, 200, 50000000).ytm).toBe(100);
        expect(getRates(850, 851, 5000000, 1e7).ytm).toBe(100);
        expect(getRateLocale(850, 851, 500, 1000000000).ytm).toBe("0.0");
        expect(getRateLocale(850, 860, 5000000).ytm).toBe("5.3");
        expect(getRateLocale(850, 860, 500000).ytm).toBe("0.5");
        expect(getRateLocale(850, 860, 5000, 100000).ytm).toBe("5.3");
        expect(getRateLocale(850, 860, 25000000).ytm).toBe("33.3");
        expect(getRates(850, 800, 50, 1000000000).ytm).toBe(Infinity);
    });
    it('should calculate yield per annum', async () => {
        expect(getRates(100, 52696, 50000000).ypa).toBe(100);
        expect(getRates(100,  1100, 50000000).ypa).toBe(5259.6);
        expect(getRates(100, 52696, 5000000, 1e7).ypa).toBe(100);
        expect(getRateLocale(100, 52696, 50000000).ypa).toBe("100.0");
        expect(getRateLocale(100, 1100, 50000000).ypa).toBe("5259.6");
        expect(getRates(850, 800, 50, 1000000000).ypa).toBe(Infinity);
    });

});
