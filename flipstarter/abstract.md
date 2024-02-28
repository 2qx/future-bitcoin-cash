This campaign is to fund a Bitcoin Cash Futures "app". 

The app will allow anyone to lock their BCH as a fungible token (redeemable for BCH after a specific block time) with a mechanism to provide some small incentive for doing so. 

These resulting fungible Futures tokens should be 100% fully-backed and auditable with a contract controlled issuance and redemption mechanism. The Vault contract will rely on simple absolute block timelocks to prevent early redemptions ([BIP65](https://flowee.org/docs/spec/forks/bip-0065/), `OP_CHECKLOCKTIMEVERIFY` c. 2014).

The Future Vault will be self-service. Any user may lock their own coins and obtain a fungible Futures token for a desired blocktime without ever participating in a market place or dex.

In addition to the Vault, there will be tools for "Coupon" contracts, able to hold outputs that may **only** be used to provide an incentive to place one BCH into the Vault. The outputs on the "Coupon" offer a discount, paid "up front" to the user locking coins. The prevailing coupon rate accepted by the market (sats per coin per block) may act as a kind of defacto market interest rate or coin denominated interest bearing instrument on Bitcoin Cash.

Coupons are simple UTXOs or outputs sent to the coupon contract directed at a specific futures Vault. As time progresses, the effective rate of return for unclaimed coupons increases as the number of remaining blocks decrease.
