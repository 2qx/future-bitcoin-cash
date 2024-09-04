# Future Bitcoin Cash - An Implementation Guide

This guide is for wallet maintainers and defi builders/inventors who what to interface with, display or use FBCH in their software.

This is a fuller exposition of a message to the Electron Cash team in their telegram channel that caused the author's Telegram account to be temporary restricted.

 > TL;DR. There is [DNS-resolved](https://cashtokens.org/docs/bcmr/chip#dns-resolved-registries) BCMR metadata for FBCH series (to date) [here](https://futurebitcoin.cash/.well-known/bitcoin-cash-metadata-registry.json). I'd also be happy to craft integrations for any wallet looking to have FBCH in their [embedded registry](https://cashtokens.org/docs/bcmr/chip#embedded-registries) or that wants tooling specific to FBCH integrated. Such as prepackaged metadata integration for [Electron Cash here](https://github.com/2qx/future-bitcoin-cash/tree/main/metadata/electron-cash)


# Introduction

Future Bitcoin Cash fungible token series represent time-locked BCH on a 1:1 basis. Each series is denoted by the block time when redemption opens. There's a different series about every week, or every 1000 blocks.

Tokens are minted into vaults by a set of anyone-can-spend gantry contracts. There are four such contracts, for different powers of 10. Each gantry was in-turn minted by a single anyone-can-spend [battery contract](https://explorer.electroncash.de/address/bitcoincash:pd3hc4smdeu4kpwyvjq645d0ts5n9wxgvp3x7gg3my65u2kkw766xxxl8wdgp).

The system secures it's own financing for fees and token utxo dust. It was funded with about 47M sats to deploy weekly fungible token series for the first century of operation.

The system uses an NFT batons to authenticate "valid" token mints and also track state.

## Validating Yet to be Minted FBCH Series

Future Bitcoin Cash (FBCH) was designed to make it trivial for wallet maintainers to validate new FBCH series as they're printed. 

It should be trivial with the software or libraries you already use. 

Given a CashToken categoryId, is it a future?

    // Could this be an FBCH token?
    09dabc81889bd7d1301f7e0620301460bcc0f754ab9b9838b881b72182b1d502

### FBCH identification and validation process:

1. Get the transaction before the minting TX using the categoryId.
2. Verify that the first output sends to a FBCH gantry.
3. Verify that the token category is the FBCH minting baton (`fbc0b000 ...`).
4. The value of the mutable NFT commitment is the FBCH series number (little endian).

As noted in the audit, step two assures the token was minted with a fixed known supply, enforced contractually by the gantry. 

Step three is necessary to assure users are getting tokens from a known canonical set, because it's possible to spam vaults duplicate mintings of different categories, which would damage fungibility and shard liquidity across market pools.

Below is an example of the first output of a pre-genesis transaction:

```json

...

"vout": [
        {
            "value": 0.42440502,
            "n": 0,
            "scriptPubKey": {
                "asm": "OP_HASH256 abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e010 OP_EQUAL",
                "hex": "aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087",
                "reqSigs": 1,
                "type": "scripthash",
                "addresses": [
                    "bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70"
                ]
            },
            "tokenData": {
                "category": "fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46",
                "amount": "0",
                "nft": {
                    "capability": "mutable",
                    "commitment": "e8320d00"
                }
            }
        },
        ...
    }
```

The full Future Bitcoin Cash Baton category is:

    fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46

The NFT Commitment contains block time of the series in little endian: `e8320d00` (i.e. 865000)

Below is a complete list to all valid gantries printing FBCH series, with links and step parameter. 

| Gantry Contract Public Key Hashes                                      |      Step | Explorer                                                                                                                          |
| :--------------------------------------------------------------------- | --------: | -------------------------------------------------------------------------------------------------------------------------: |
| aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087 |     1,000 | [link](https://explorer.electroncash.de/address/bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70) |
| aa208b8bbab9023ff4c94e3ba458d213c5f629cf4d2f750a813e3855fa8b88f7790087 |    10,000 | [link](https://explorer.electroncash.de/address/bitcoincash:pw9chw4eqgllfj2w8wj935snchmznn6d9a6s4qf78p2l4zug7ausqxsg2dxve) |
| aa206cf5cd944ca7cf45ed3a3075694fea5f7ad92d0011784c896238049653e405f987       |   100,000 |             [link](https://explorer.electroncash.de/address/pdk0tnv5fjnu730d8gc82620af0h4kfdqqghsnyfvguqf9jnuszljj3fnpfhq) |
| aa204e1a8669275f0b5c1deaa1f168de429a8dc53f91acc489dbc819239ebc9a155787 | 1,000,000 | [link](https://explorer.electroncash.de/address/bitcoincash:pd8p4pnfya0skhqaa2slz6x7g2dgm3fljxkvfzwmeqvj884ung24w2mx7x8yd) |

Note that, 90% of the time, the pre-genesis transaction for a token series is also the genesis transaction for the preceding series. In this case, the OP_RETURN should say FBCH, with the series number being currently minted, which is **NOT** the series number corresponding to the next mint.

## A century of metadata in zero requests.

From the validation process, it'd be fairly simply to develop a cache of known FBCH series, or to import this data into a local registry.

The series number and categoryId can be transformed to metadata with a simple function where:

- All FBCH series use 8 decimals.
- The ticker is "FBCH" followed by a dash and seven digit zero padded series number. (`^FBCH-\d{7}$`)
- The name is "Future BCH " followed by the series number the user's locale.
- The description is as follows: 

> A fungible token redeemable for Bitcoin Cash after block _LOCALE_SERIES_STRING_

With all decimals and text known, that only leaves icons.

