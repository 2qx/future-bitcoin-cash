This document is to summarize discussions and feedback from the initial audit, as well as, clarify some aspects of expected system operation.

## Scope

As mentioned by "the auditor", the Audit is primarily focused on the Vault and Gantry contracts.

The Battery contract should complete operations before any user funds are placed in the system. And new Coupon contracts may upgraded or deployed at anytime without affecting funds in the Vaults.

## Adopted suggestions from Initial Review 

The following changes were suggested and adopted:

- Predefined CategoryID restrictions have been removed.
- Vault `time` and Gantry `step` parameters have been converted to `int` type.
- Vault timelock logic has been simplified.
- Vault tx.version check has been removed.
- Some restrictions on vault Unlocking Script and Locking Script type have been removed.
- Gantry now creates three (3) vault threads instead of seven (7)―although this change may be reverted upon further testing.
- Gantry now addresses inputs pegged to the current input index. 

## Elaborations on expected system operation



- All timelocks are given as block heights.
- It is assumed that the BIP65 behavior for block heights will not change before (or after) 2038.
- All Vaults become bi-directional after time lock requirement is met.
- Prior to Vault time lock maturation, placement is uni-directional, meaning it can be placed across multiple UTXOs but threads cannot be merged until the vault time expires.
- Prevailing network fees are taken as sufficient to deter indefinite griefing of a mature vault with BCH merged to a single UTXO. 
- Coupons may be redeemed after expiration by placing BCH and then immediately redeeming the FBCH.
- Coupons may cause more transactions to be created than necessary, but coupon markets for higher denomination placements can be created without contract modifications.
- The vault has no "cleaning" path. 
  - A cleaning path requiring the entire token supply as input to clean contract sats would create an incentive to hoard the last FBCH sat.
  - A cleaning path releasing all Vault contents to miners after some time far into the future would risk funds of users who forgot about their FBCH.
- If a gantry is not stepped forward from disuse, or is prematurely run forward, this can easily be rectified by either allowing a stepping mechanism to the end user or hiding vaults that were printed prematurely. 
- Although the Deterministic system with pre-determined CategoryIDs would be ideal, attempting to predict and preclude every possible variation of transaction seems too risky.

## Operational Cost Considerations

On contract size optimizations, the Battery may result in a half dozen transactions for the whole system, the Gantries may produce one transaction every 16 hours (or, alternatively, once per week) so the fixed system transaction fees seem trivial.

However, in contrast, the totality of Vault and Coupon fees will end up being significant **per use** costs of the system. For this reason the size of unlocking code has been minimized to the furthest extent possible:


| Contract  | Unlocking Script |
| --------  |-----------------:|
|           | (bytes)          |
| Battery   |     149          |
| Gantry    |     220          |
| Vault     |      35          |
| Coupon    |      17          |

For example, someone with 8 BCH may use the Coupon + Vault unlocking codes eight times to release 8 FBCH, and then the Vault unlocking code one more time in the redemption. 

The Vault and Coupon contract fees are a variable system cost, borne by market participants, that will be reflected in coupon and secondary market prices. 

In contrast, the Battery and Gantry transactions can have a fixed one time cost that does not increase with usage. 

So the cheapest Vault and Coupon contracts should mean more money for savers, and coupon writers' sats will go further. Hence, the hyper-minimalist design for those contracts.

## Coupons as Generic Primitive

The Coupon contracts offer a discount to anyone spending a minium amount of BCH as the first output on a specific contract, as long as the coupon is the last input, i.e. limit one per transaction.

As such, there is no logic specific to CashTokens or the Vault system in the Coupons and the template could be used to incentivize any number of activities, provided there is some inherent cost (i.e. money & time) associated with the transaction or it's outputs.