import { getFutureBlockDate } from './util';



describe('test example contract functions', () => {
    it('should get the time of block 500m block icon', async () => {
        let test = getFutureBlockDate(850233, 500000000)
       
        expect(test.getTime()).toBeGreaterThan(Date.parse('11514-11-01'));
    });


 
});
