## Frequently Asked Questions

### What is Future BCH?

Future BCH (FBCH-\*) are fungible tokens redeemable 1:1 for Bitcoin Cash (BCH) after the block indicated by the each *series*. 

### What's a series? 

Each Future BCH *series* has a block number in the ticker.

This number denotes the time when the series matures; it's when the vault opens for redemptions. The future time is measured in blocks.

So FBCH-1000000 can be redeemed after block 1,000,000 is mined. In 2027, all the FBCH-1000000 can be swapped 1:1 for BCH held in [the 1000000 FBCH vault](https://futurebitcoin.cash/v?block=1000000).

Blocks are the base time unit of blockchains. On average, a block is mined every 10 minutes. There are about 1000 blocks per week and 52500 blocks per year. A million blocks is about 19 years.

### What are Futures worth?

While each Future represents one Bitcoin Cash, but the coins are **encumbered** in a vault.

Most people might agree that encumbered bitcoin is less useful than plain ol' bitcoin, but as the time to unlocking approaches the value of a FBCH gets closer to the BCH it can be redeemed for.
<p style="text-align: center;">
<img src="/discount.svg" alt="chart showing future discount rate" width="80%"/>
</p>
So most Future BCH can be expected to trade at some discount to plain BCH, but that discount will slowly evaporate as the time to maturity approaches. The curve is similar to how bonds are priced at a discount.

So, if a future is worth less than the coins backing it, it follows that encumbering coins as futures should **always** instantly result in slightly less value to the locker. To find the discount, anyone write a *coupon* to cover the difference in market price.

### What is a coupon?

A coupon is **NOT** a token, it's *plain ol'* cash held by a contract.

The coupon contract **requires** three conditions to spend the cash:

- The transaction **must send net value** to some other contract.
- The transaction must spend **some minimum amount**, and
- Limit one per transaction―of course.

Coupons must be used when placing BCH for FBCH, but it's also technically possible to swap BCH for FBCH without a coupon.

Note: coupons could also be made for **any** contract system with a unidirectional lock or one-way mechanism.

### What determines the coupon yield rate?

Coupon value are specified in satoshis. Each coupon is a single output (unspent transaction output, UTXO). 

To create multiple coupons, many outputs are sent to the coupon contract. So one coin (100M sats), can be sent as 100 outputs of 1M sats each to write a hundred coupons.

The yield is calculated as the satoshis per amount locked divided by the time remaining to maturity.

**A satoshi per coin per block is one *spb*. 20 sbp is approximately 1% APY.**

### Are coupon rates changing?

Yes.

While the amount of a coupon to lock can't be changed, the time remaining for a series decreases every block. 

<p style="text-align: center;">
<img src="/yield.svg" alt="chart showing changing yield rates" width="80%"/>
</p>

As the time remaining for a coupon to be used approaches zero, the effective rate approaches infinity. 

When series matures, anyone may instantly claim unused coupons by placing BCH and immediately redeeming.

### Where do coupons come from?

Anything that can send satoshis can write a coupon by sending money to a coupon contract. 

The coupon could be written by a person, a bot, a service, or another contract system. 

Coupons can be written in response to external events, like markets. Or coupons can be emitted in response to things like hash rate or difficulty. 

Coupon writing is permissionless and pluralistic, meaning many different parties may write coupons for conflicting or independent reasons.

### I have Futures, but I want liquid Bitcoin Cash now? 

FBCH fungible tokens can be traded on [tapswap](https://tapswap.cash/trade).

### I forgot about my FBCH for 100 years, can I still redeem it for BCH? 

**YES.** FBCH Vaults will never close.

If someone places BCH for FBCH maturing next week but then forgets about it for a decade, they can still be redeemed, their bitcoin is still locked, the vault is never cleaned nor closed.

### What is the Vault?

Each FBCH series has a unique vault. The [contract is five lines](/contracts#vault). It's nearly identical to the three line [WBCH Vault](https://bitcoincashresearch.org/t/wbch-bch-wrapped-as-cash-token/1196), except two lines are added:

- If redeeming tokens:
- require a certain block height

Each vault has seven "threads". Each thread starts with enough FBCH to lock all BCH, 147M BCH in total.

### How do I recover funds from the seed phrase?

If you try to recover funds from a seed phrase and the funds don't appear, try with [Electron Cash](https://electroncash.org/).

**Every good** Bitcoin Cash wallet should check all common paths when attempting to recover funds. 

The FBCH web wallet uses the original BIP39 derivation root path: `m/44'/0'/0'/0`

Assets are held in the first node position (`m/44'/0'/0'/0/0`).



### What do the icon colors mean?

There are four colors in each FBCH series icon, background and three squares. The icon colors denote the series maturation time using "resistor" [color codes](https://en.wikipedia.org/wiki/Electronic_color_code).

<p style="text-align: center;">
<img src="/Resistor_Color_Code.svg" width="80%" alt="diagram showing FBCH icon color mapping." />
</p>

### What is the FBCH token category ID?

Each week has a different token category identification.

While all tokens expiring at the same time are fungible with each other, futures maturing next week are different from futures maturing next month.

### How would someone verify manually that Futures are valid?

With CashTokens, the token category is also the genesis transaction, or the transaction minting all fungible tokens.

The genesis transaction for every **valid** FBCH token **MUST** have the FBCH Minting Baton as the first input of the transaction.

### What is the Future BCH Baton?

There are four (4) NFT batons to authenticate FBCH series at four different time scales.

The baton category doesn't change:

```
fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46
```

All four batons are locked on minting contracts.

### Where's the metadata for FBCH?

Future BCH hosts [dns-resolved data per the BCMR specification.](https://cashtokens.org/docs/bcmr/chip#dns-resolved-registries)
  
```
https://futurebitcoin.cash/.well-known/bitcoin-cash-metadata-registry.json
```   

Any wallet, explorer, indexer or swap that fully supports BCMR can easily display FBCH metadata and indicate the corresponding registry.

If the FBCH domain registry is lost, abandoned or usurped, it's trivial to [validate and generate metadata locally](/protocol) using only chain resolved validation. 

### When will the Futures end?

There's enough funds in the contract system to mint weekly tokens for about a hundred years. The weekly gantry will run out of funds around 2120.   