## Introduction

Future Bitcoin Cash fungible token series represent time-locked BCH on a 1:1 basis. Each series is denoted by the block time when redemption opens. There's a different series about every week, or every 1000 blocks.

Tokens are minted into vaults by a set of anyone-can-spend gantry contracts. There are four such contracts, at different powers of 10. Each gantry was in-turn minted by a single anyone-can-spend [battery contract](https://explorer.electroncash.de/address/bitcoincash:pd3hc4smdeu4kpwyvjq645d0ts5n9wxgvp3x7gg3my65u2kkw766xxxl8wdgp).

The system secures it's own financing for fees and token utxo dust. It was funded with about 47M sats to deploy weekly fungible token series for about a century of operation.

The system uses NFT batons to authenticate "valid" token mints and also track the state of the gantry.

<img src="system_genesis.svg" alt="genesis" width="600"/>


## Validating Yet to be Minted FBCH Series

Future Bitcoin Cash (FBCH) was designed to make it trivial for wallet maintainers to validate new FBCH series as they're printed. 

It should be trivial with the software or libraries you already use. 

Given a CashToken categoryId, is it a future? Let's look at this transaction:

    09dabc81889bd7d1301f7e0620301460bcc0f754ab9b9838b881b72182b1d502

### FBCH identification and validation process:

1. Get the transaction before the minting TX using the categoryId.
2. Verify that the first output sends to one of four FBCH gantry (see below).
3. Verify that the token category of the first output is the FBCH minting baton (`fbc0b000 ...`).
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

Below is a complete list to all valid gantries printing FBCH series, with links and step parameter. In this case, the first output is sending to the 1,000 block or V<sub>3</sub> Gantry. 

| Gantry Contract Public Key Hashes                                      |      Step |                                                                                                                    |
| :--------------------------------------------------------------------- | --------: | -------------------------------------------------------------------------------------------------------------------------: |
| aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087 |     1,000 | [link](https://explorer.electroncash.de/address/bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70) |
| aa208b8bbab9023ff4c94e3ba458d213c5f629cf4d2f750a813e3855fa8b88f7790087 |    10,000 | [link](https://explorer.electroncash.de/address/bitcoincash:pw9chw4eqgllfj2w8wj935snchmznn6d9a6s4qf78p2l4zug7ausqxsg2dxve) |
| aa206cf5cd944ca7cf45ed3a3075694fea5f7ad92d0011784c896238049653e405f987 |   100,000 |             [link](https://explorer.electroncash.de/address/pdk0tnv5fjnu730d8gc82620af0h4kfdqqghsnyfvguqf9jnuszljj3fnpfhq) |
| aa204e1a8669275f0b5c1deaa1f168de429a8dc53f91acc489dbc819239ebc9a155787 | 1,000,000 | [link](https://explorer.electroncash.de/address/bitcoincash:pd8p4pnfya0skhqaa2slz6x7g2dgm3fljxkvfzwmeqvj884ung24w2mx7x8yd) |

The condition of the second step is met, and the next step is to assure the NFT category for the first output must match the full Future Bitcoin Cash Baton categoryId:

    fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46

If the first two conditions check, then the baton NFT Commitment should/must also contain the block time of the series in little endian: `e8320d00` (i.e. 865000)


Note that, 90% of the time, the pre-genesis transaction for a token series is also the genesis transaction for the preceding series. In this case, the OP_RETURN should say FBCH, with the series number being currently minted, which is **NOT** the series number corresponding to the next mint.

## A century of metadata in zero requests.

From the NFT baton based validation process, it'd be fairly simply to develop a cache of known FBCH series, or to import this data into a local registry (then validating each claim).

The series number and categoryId can be transformed to metadata with a simple function where:

- All FBCH series use 8 decimals.
- The ticker is "FBCH" followed by a dash and seven digit zero padded series number. (`^FBCH-\d{7}$`)
- The name is "Future BCH " followed by the series number the user's locale.
- The description is as follows: 

> A fungible token redeemable for Bitcoin Cash after block _LOCALE_SERIES_STRING_

With all decimals and text known, that only leaves icons.

### Generative SVG icons mapped from token series numbers.

Future BCH icons are "vector" or line graphics designed on a 16x16 grid. 

There is always a one square white boarder and one square wide white "F". However the background and three square colors map to numbers according to the color codes for resistors.

As follows: 

| Color       | #           |
| :---------- | ----------- |
| _(rgb hex)_ |             |
| "000000",   | // 0 black  |
| "966424",   | // 1 brown  |
| "ff0000",   | // 2 red    |
| "ff7500",   | // 3 orange |
| "ffff00",   | // 4 yellow |
| "00ff00",   | // 5 green  |
| "0000ff",   | // 6 blue   |
| "ff00ff",   | // 7 violet |
| "888888",   | // 8 grey   |
| "ffffff"    | // 9 white  |

For example, for series FBCH-0859000, this would map to the colors:


| FBCH-0859000 | #       |        |
| :----------- | ------- | ------ |
| _(rgb hex)_  |         |        |
| "000000",    | 0 Black | Field  |
| "888888",    | 8 Grey  | Left   |
| "00ff00",    | 5 Green | Top    |
| "ffffff"     | 9 White | Square |

This is the icon for FBCH-0859 as an svg in markdown:

<img width=100 src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:400px; height: 400px;'%3E%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' style='stroke-width: 4px; stroke-linejoin: miter; stroke-linecap: butt; stroke: %23fff; fill: none;'%3E%3C/path%3E%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' style='fill:%23000;'%3E%3C/path%3E%3Cpath d='M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z' style='fill: %23fff;'%3E%3C/path%3E%3Cpath d='M 2 8 L 2 15 5 15 5 8 Z' style='fill: %23888888;'%3E%3C/path%3E%3Cpath d='M 6 7 L 6 15 14 15 14 7 Z' style='fill:%23fff;'%3E%3C/path%3E%3Cpath d='M 6 2 L 6 6 14 6 14 2 Z' style='fill:%2300ff00;'%3E%3C/path%3E%3C/svg%3E"/>

Generating an SVG icon in javascript can be done as follows:

```javascript

const colorMap = [
    "000000",     // 0 black  
    "966424",     // 1 brown  
    "ff0000",     // 2 red    
    "ff7500",     // 3 orange 
    "ffff00",     // 4 yellow 
    "00ff00",     // 5 green  
    "0000ff",     // 6 blue   
    "ff00ff",     // 7 violet 
    "888888",     // 8 grey   
    "ffffff"      // 9 white  
]

export function getFbchIconSvg(n: number, size = 400): string {

    const places = [...Math.floor(n / 1000).toString().padStart(4, '0')].map((a, i) => Number(a))

    return `<svg 
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:` + size + `px; height:` + size + `px;">
    <path d="M 1 1 L 1 15 15 15 15 1 Z" style="stroke-width:2;stroke-linejoin:miter;stroke-linecap:butt;stroke:#ffffff;fill:#` + colorMap[places[0]] + `; paint-order:stroke;"></path>
    <path d="M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z" style="fill:#ffffff;stroke:none;"></path>
    <path d="M 2 8 L 2 15 5 15 5 8 Z" style="fill:#` + colorMap[places[1]] + `;stroke:none;"></path>
    <path d="M 6 7 L 6 15 14 15 14 7 Z" style="fill:#` + colorMap[places[3]] + `;stroke:none;"></path>
    <path d="M 6 2 L 6 6 14 6 14 2 Z" style="fill:#` + colorMap[places[2]] + `;stroke:none;"></path>
    </svg>`
}
```

The value returned from the above string can be either saved as an SVG in a file, or converted to another format. It can also be encoded as a URI (data:image/svg+xml), which is utilized by the BCMR at futurebitcoin.cash linked above. 

Implementing the above or similar function, it's easy to generate 5000 weekly series icons for the next 100 years without having to ever request those assets externally or worry about hosting, pins or proxies.

## Building a Future BCH swap transaction.

A FBCH swap is essentially a WBCH swap with a BIP65 time lock constraint enforced in one direction. Prior to maturation, the transaction is nearly identical to a WBCH swap.

Given the vault series and valid UTXOs, it's relatively straight-forward.

Below is a diagram of a possible interaction of a user wallet and a vault. This shows a case where the user takes a coupon as the last input and claims it as change. 

It's important for the user wallet to sign such a transaction with SIGHASH_ALL so that the spending of their placement isn't modified by a mining node or "in the air". 


| index | source |  Inputs |          |       |  Outputs  |        |   destination |
| ----- | :----- | ------: | :------: | :---: | :-------: | :----: | ------------: |
| 0     | vault  |    sats | + tokens |  ==   | sats    + | tokens |         vault |
| 1     | wallet |    sats |          |       |           | tokens |        wallet |
| 2     | coupon | any/all |          |       |    sat    |        | wallet change |

A placement like the above may cost the user [520 sats](https://explorer.electroncash.de/tx/61980b64cb6abb71e7e49a18fbb7a9d8fc6425e59a72426f801486176adf7c1b) in fees. The redemption has one fewer input and one fewer output, so it may be in the range of [350 sats](https://explorer.electroncash.de/tx/a92bfa01f715f256dda99a68581d04b52c9c90a6756f7f0567d818e82c33aa31)―so the user has to budget for that when looking for coupons.

## Nomenclature and charting of coupon rates.

The rate of return for a coupon can be expressed in sats per coin per block, or *spb*. About 20 sats per would translate to a 1 percent annual return. 

The prevailing coupon rate is the highest value utxo on a coupon contract. The historical rate is the time series of the highest value utxos on a coupon contract. 

Charting software and people prefer calendar dates and times (or epochs) to block times, so where possible a chart should show a normal historic x-axis mapped from a date object. 

Coupons for the same series of differing magnitude can be grouped together when plotted. If there's a coupon for placing 100 BCH that's higher than the coupons for people placing 1 BCH, the higher coupon rate bid is the market rate. 

The rates for different series should probably **not** be aggregated by default, but a lot of users might be interested to see the highest rate across all series at a glance.