This is an archived version of the [successful fundraiser](https://blockchair.com/bitcoin-cash/transaction/0b6c6f0a0b1ac5c3a5e681f009cf523364a1a733dc197642173d32b9a6b7ef43) to finance the development of app.


Below is a list of our generous contributors:

- Mike Komaransky 31.09 BCH
- molecular 10.25 BCH "awesome!"
- toorik 6.57 BCH "very interesting"
- Digital Cameo Girls 3.30 BCH "The future of DeFi is BCHing"
- AsashoryuMaryBerry 2.20 BCH
- Shadow Of Harbringer 1.34 BCH "This is Leet™"
- btcfork 1.01 BCH "1 BCH = 1 BCH , but damn ... appreciation!"
- pat 1.00 BCH "More DeFi on BCH? Hell yes!"
- imaginary_username 0.51 BCH "god damn i'm pledging for this fully handbuilt flipstarter UI alone"
- John Smallberries 0.49 BCH "I like the cut of your jib, your 50,000 foot view, and unspent.cash. Godspeed."
- @_minisatoshi 0.40 BCH "Keep spreading economic freedom!"
- The Bitcoin Cash Podcast 0.25 BCH "https://www.bitcoincashpodcast.com"
- Bernanacatl 0.22 BCH "Adam Back is triggered."
- Anonymous 0.20 BCH
- sandakersmann 0.20 BCH
- Georg Engelmann 0.20 BCH
- zmach1n3 (z10) 0.14 BCH "yo dawg, I herd you like BCH, so I put an BCH in your CashTokens so you can Trade Futures while you P2P Cash"
- Anonymous 0.12 BCH
- Steve2048 0.12 BCH "Let's give it a try!"
- BCH foreveryone.net 0.10 BCH
- BCHpls.org 0.10 BCH "greetings from Austria"
- Craig Wright 0.05 BCH "If you build this I will sue you, but keep up the good work"
- BOL 0.05 BCH "=) Bitcoin Cash Futures"
- chainxor 0.03 BCH "Go gogogogogogo"
- HandleTwatter 0.03 BCH "More L1 DeFi on BCH? Yesssss please!"
- devperate 0.02 BCH "sounds good"
- David Shares 0.01 BCH


## Abstract

This campaign is to fund a Bitcoin Cash Futures "app".

The app will allow anyone to lock their BCH as a fungible token (redeemable for BCH after a specific block time) with a mechanism to provide some small incentive for doing so.

These resulting fungible Futures tokens should be 100% fully-backed and auditable with a contract controlled issuance and redemption mechanism. The Vault contract will rely on simple absolute block timelocks to prevent early redemptions ([BIP65](https://flowee.org/docs/spec/forks/bip-0065/), `OP_CHECKLOCKTIMEVERIFY` c. 2014).

The Future Vault will be self-service. Any user may lock their own coins and obtain a fungible Futures token for a desired blocktime without ever participating in a market place or dex.

In addition to the Vault, there will be tools for "Coupon" contracts, able to hold outputs that may **only** be used to provide an incentive to place one BCH into the Vault. The outputs on the "Coupon" offer a discount, paid "up front" to the user locking coins. The prevailing coupon rate accepted by the market (sats per coin per block) may act as a kind of defacto market interest rate or coin denominated interest bearing instrument on Bitcoin Cash.

Coupons are simple UTXOs or outputs sent to the coupon contract directed at a specific futures Vault. As time progresses, the effective rate of return for unclaimed coupons increases as the number of remaining blocks decrease.

## Overview

There are two distinct (but not mutually exclusive) groups of users: 1) Alice wants more coins; 2) Bob wants the fiat price per coin to rise (i.e. Bob wants fewer coins in circulation).

The solution: Bob will pay Alice, some tiny fee, to lock coins.

With any small fee, any non-zero return Alice could collect in a low-risk way is better than zero. Bob wants coins that are potentially on the market locked away, to increase demand. If Bob is able to place a ["one dollar lulz"](https://gavinandresen.ninja/One-Dollar-Lulz) for Alice to lock her coins, then Alice and Bob can create a market that satisfies both their respective goals. Bob can get Alice to take custody of coins from centralized custodians and timelock her coins on her own, without encumbering his own coins.

The "Futures" app will allow anyone to create, validate, or audit a Futures Vault. In addition, there will be tooling to easily allow anyone to be able to write coupons for others to lock their coins into fungible Futures tokens, in bulk.

The app aims to establish a market rate between those who want some small interest on their coins, and those who want less Bitcoin Cash liquidity in the marketplace.

<img src="/social_preview.png" alt="drawing" width="100%"/>

## Meet the On-Chain Contracts

### Futures Vault

Vault would be specific to a `locktime` and the `tokenId` of the fungible CashToken tracking ownership as a token receipt.

The contract would **allow** anyone the ability to:

- **place** a whole BCH and take a whole BCH Future fungible token receipt.
- **redeem** any amount of BCH Future token sats on a 1:1 basis for BCH sats after the locktime has been reached.

### Coupon

The Coupon contract is specific to the `locking code` of the destination contract. A Coupon contract configured for a Futures Vault at a specific locktime,

would **allow** anyone to:

- **spend** any single unspent output as an input for the Futures Vault.

Unspent outputs are created by someone (or some bot) sending bitcoin.  If someone sent one coin to the Coupon contract, it would create an unspent output for 100M sats. Someone could also send one coin as a thousand outputs, creating one thousand coupons for 100k sats each.

Since Coupons are just unspent outputs locked by a contract, writing coupons is as easy as sending coins and wouldn't require new or specialized software.

## Save more sats by skipping the marketplace.

Selling Futures contracts invites regulatory issues, but there are also some real costs associated with buying and selling tokens on even the cheapest exchange.

Although the cost may seem small, it may become significant quickly. The Jedex design proposes a 10k sat fee as an anti-DOS measure, meaning 10k is the base fee. A liquidity provider (LP) swap style dex may include a 0.3% fee to the LP, or a flat fee of 100k-200k sats on other open-ask marketplaces.  If a user is seeking a 1% annualized return per coin on a "weekly" contract (1000 blocks), that only works out to about 20k sats. So, if a user is able to take a coupon for 22k sats, and pay ~600 sats miner fee locking and unlocking their coin in a vault, they can make money in a situation where a pair of interactions with an exchange might take all their returns (or a lot more) in fees.

The direct coupon mechanism also skips or deletes "looping" that would be necessary in releasing tokens and then reselling them for some slight discount to build token liquidity. It's still possible to cause 100 BCH to be placed into the vault by locking one coin, then reselling the resulting futures token at a 1% discount a few hundred times, but it's much simpler to skip looping, or leveraging up, to allow the party wishing to incentivize locking to do so directly.

There is more discussion on [the path not taken here.](https://bitcoincashresearch.org/t/an-incentivized-scheme-for-fixed-token-future-markets/1255)

 ## The Effective Rate of Return for Coupons... blows up.

Suppose Bob wrote a coupon by sending about a dollar (330k sats) as incentive to a Futures Vault expiring at a fixed block about one year onward (52,596 blocks).

The effective interest rate of the coupon would increase proportional to the inverse of the number of blocks remaining.  **ACK!?!**, what does that mean?―Well, as the time left on a Future shrinks to zero, the effective interest rate of any Coupons available sky rocket.

The effective rate on Bob's 330k sat coupon would be as follows in sats per coin per block (scb) and simple annualized percentage:

| Block remaining   | Rate (scb) | APR* (%)   |
|-------------------|-----------:|-----------:|
| 52,596 (1 yr)     | 6          | *0.3%*     |
| 13,149 (3 months) | 25         | *1.3%*     |
| 4,383 (1 month)   | 75         | *3.9%*     |
| 1,011 (1 week)    | 326        | *17.1%*    |
| 144 (1 day)       | 2,291      | *123.9%*   |
| 6 (1 hr)          | 55,000     | *2,973%*   |
| 1 (~10 minutes)   | 330,000    | *17,841%*  |

*\*non-compounding annualized effective rate*

So although Bob's 330k sat lulz may not seem like a lot, as a rate of return, it creates an **extreme incentive** to lock coins as the maturation date for a futures contract approaches.

Bob's coupon would be a "pre-bate" or prepaid incentive, verifiable on-chain and enforced by network rules. The person placing a coin for a future token would collect the coupon as a discount up front. In the case of a 330k sat coupon, the person collecting the coupon would only need to place 99.6M sats to unlock a future instead of a full 100M sats.

## Implementation (Deliverables)

The "app" may either be a wallet enabled webapp, or a Electron Cash plugin (weighted-voting in the comments of the sidebar).

The "app" will allow anyone to take one BCH coin, and convert it to a fungible futures token, as well as easily redeem their tokens (in any denomination) after it has matured.

Users will be able to view and track the prevailing coupon rates available and accepted for various contracts.

Tooling to airdrop coupons in various strategies (bulk, in steps, over time).

Automated tooling will be created to mint 2.1 quadrillion fungible tokens (one for each BCH sat) to fund a Vault, and validate the total supply held or issued by a random Vault contract. Each Vault contract is specific to one expiration block time, and the token receipt tracking redemptions.

Contracts will be **audited** CashScript contracts translated into BitcoinScript by the cashc compiler. An auditor has been engaged and has tentatively agreed to accept payment in futures tokens.

Fungible tokens may (obviously) be traded on a DEX once released from the vault, but as previously mentioned, exchange fees may add considerable cost.

## What does 2qx mean?

I'm a pseudononymous software developer/archivist currently committing code under the github account [`2qx`](https://github.com/2qx/2qx).

I was the lead implementer for [`mainnet-js`](https://github.com/mainnet-cash/mainnet-js). And the creator of [unspent.cash](https://unspent.cash) and [unspent.app](https://unspent.app).

Unspent<sup>ᴜᴍ</sup> is about the third or fourth largest "defi" app or protocol on BCH, with around 45 BCH total locked value.  In notional fiat value terms, in the first year of public operation, roughly 100% of users saw a ~25% return of assets and a 150-200% increase in principal. The early success of was largely driven by fortuitous timing and the performance of the underlying native asset―Bitcoin Cash.

I've maintained a copy of [`awesome-bitcoin-cash`](https://github.com/2qx/awesome-bitcoin-cash) at [awesomebitcoin.cash](https://awesomebitcoin.cash) since 2020.

I've contributed to documentation for mainnet.cash, CashScript.org, bch.info, bchd and other Bitcoin Cash sites.

There's a [longer introduction here](https://www.youtube.com/watch?v=wiMHa0eq42k).

## Prior Art

This approach is derived from some pre-token BIP65 absolute timelock ideas for unspent phi, that would have involved a somewhat cumbersome covenant based approach.

The token implementation was inspired, by [Wrapped BCH](https://wrapped.cash/) [research](https://bitcoincashresearch.org/t/wbch-bch-wrapped-as-cash-token/1196).

The impetus was [some public discussion with General Protocols.](https://youtu.be/wiMHa0eq42k?t=4272)

## Getting ahead of a potential "I don't get it" parade.

This is a Bitcoin Cash native instrument to establish the rate of return for timelocked BCH in sats per coin per block―in a fairly direct way. The aim is to establish a market rate (that does not currently exist) between those who want some fully-backed provable coin-denominated return and those who want less liquidity in the general marketplace.

However:

* It is not a futures dex, nor where futures are traded.
* It is not a fiat denominated nor fiat-linked instrument.
* It is not a stablecoin nor fiat-like hedging instrument.
* No provision will be made to later turn it into a "stable" coin with hand waving.

The idea exists outside the context where values are declared or dictated by a central bank.  Without a fiat dollar amount attached, some people can't "get it", and they may be vocal about not "getting it"―and that's okay. The side bar is a great place to express or abstain from expressing values.

The goal of the app is annualized returns and/or surfacing levers in the market that aren't typically available to individuals. Part of this design is to also omit certain levers actors have for controlling markets.

This app doesn't exist yet and is contingent upon completion of this flipstarter.
