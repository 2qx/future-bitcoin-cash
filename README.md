# Future Bitcoin Cash

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Overview

Future Bitcoin Cash is a set of autonomous anyone-can-spend contracts able to mint fungible tokens at regular intervals.

Future BCH (FBCH) fungible tokens in a particular series may be obtained from the Vault using BCH on a 1:1 basis. FBCH in a series may only be redeemed *after* a required timelock. But tokens that haven't matured can be traded on open markets DeFi supporting fungible CashTokens.

To make things interesting, each Vault can have corresponding coupon contracts to provide incentives for users locking a specific amount. 

Per [CashToken guidelines for token issuers](https://cashtokens.org/docs/bcmr/chip#guidelines-for-token-issuers), each ticker is four letters, all upper case, separated by a hyphen and the locktime expressed as an eight character with zero padding: 
  
  `FBCH-00950000` tokens redeemable after block  950,000 (May '26)

  `FBCH-02000000` tokens redeemable after block 2e6 (2047)


## Contracts

Gantries are anyone-can-spend contracts to position vaults and issue fungible tokens. Vaults hold BCH deposits backed 1:1 for tokens exchanged. 