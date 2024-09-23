from datetime import datetime

BATON = "fbc0b001313509454331f23f4b1891a8d9a284421efcc33187f1a1cdd37ccb46"

GANTRY_P2SH = [
    "aa20abde46afe7656ed85e92ba9be56286bae53f77321333c77fb3db90e28445e01087",
    "aa208b8bbab9023ff4c94e3ba458d213c5f629cf4d2f750a813e3855fa8b88f7790087",
    "aa206cf5cd944ca7cf45ed3a3075694fea5f7ad92d0011784c896238049653e405f987",
    "aa204e1a8669275f0b5c1deaa1f168de429a8dc53f91acc489dbc819239ebc9a155787",
]

GANTRY_ADDRESSES = [
    "bitcoincash:pw4au340uajkakz7j2afhetzs6aw20mhxgfn83mlk0depc5yghspqqqckly70",
    "bitcoincash:pw9chw4eqgllfj2w8wj935snchmznn6d9a6s4qf78p2l4zug7ausqxsg2dxve",
    "bitcoincash:pdk0tnv5fjnu730d8gc82620af0h4kfdqqghsnyfvguqf9jnuszljj3fnpfhq",
    "bitcoincash:pd8p4pnfya0skhqaa2slz6x7g2dgm3fljxkvfzwmeqvj884ung24w2mx7x8yd",
]

COLOR_CODES = [
    "000",
    "966424",
    "f00",
    "ff7500",
    "ff0",
    "0f0",
    "00f",
    "f0f",
    "888",
    "fff",
]


def get_places(series):
    return [int(a) for a in str(f"{int(series/1000):04}")]


def get_fbch_icon_svg_uri(series, size=400):
    places = get_places(series)
    return "".join(
        [
            f"data:image/svg+xml,",
            f"%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:{size}px; height: {size}px;'%3E",
            f"%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' style='stroke-width: 2px; stroke-linejoin: miter; stroke-linecap: butt; stroke: %23fff; fill:%23{COLOR_CODES[places[0]]}; paint-order:stroke'%3E%3C/path%3E",
            f"%3Cpath d='M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z' style='fill: %23fff;'%3E%3C/path%3E",
            f"%3Cpath d='M 2 8 L 2 15 5 15 5 8 Z' style='fill: %23{COLOR_CODES[places[1]]};'%3E%3C/path%3E",
            f"%3Cpath d='M 6 7 L 6 15 14 15 14 7 Z' style='fill:%23{COLOR_CODES[places[3]]};'%3E%3C/path%3E",
            f"%3Cpath d='M 6 2 L 6 6 14 6 14 2 Z' style='fill:%23{COLOR_CODES[places[2]]};'%3E%3C/path%3E%3C/svg%3E",
        ]
    )


def get_fbch_reg_svg_uri(size=400):
    return "".join(
        [
            f"data:image/svg+xml,"
            f"%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:{size}px; height: {size}px;'%3E",
            f"%3Crect width='14' height='14' x='1' y='1' rx='3' ry='3' style='stroke:%23fbc; fill:%23fff' /%3E",
            f"%3Cpath d='m 5,3 h 6 V 5 H 7 V 7 H 9 V 9 H 7 v 4 H 5 Z' style='stroke:%23fbc; fill:%23fff;' /%3E",
            f"%3C/svg%3E",
        ]
    )


def get_fbch_series_bcmr(series, category):

    identity = {
        "name": f"Future BCH {series:n}",
        "description": f"A fungible token redeemable for Bitcoin Cash after block {series:n}",
        "token": {"category": category, "decimals": 8, "symbol": f"FBCH-{series:07}"},
        "uris": {
            "icon": f"{get_fbch_icon_svg_uri(series)}",
            "web": f"https://futurebitcoin.cash/v?block={series}",
        },
    }

    return {
        "$schema": "https://cashtokens.org/bcmr-v2.schema.json",
        "version": {"major": 1, "minor": 1, "patch": 0},
        "latestRevision": datetime.now().isoformat(),
        "license": "CC0-1.0",
        "registryIdentity": {
            "name": "A Future BCH Baton Authenticated Distributed Registry",
            "description": "Auto-generated metadata for an independently validated FBCH token series; check by verifying a FBCH minting baton was spent in the first output to a known gantry in the pre-genesis transaction.",
            "uris": {
                "icon": get_fbch_reg_svg_uri(),
                "web": "https://futurebitcoin.cash/protocol",
            },
        },
        "identities": {category: {datetime.now().isoformat(): identity}},
    }


def validate_pre_genesis_bitcash(transaction, return_series=True):

    # pop the first output
    # every transaction must have at least one output
    # and this should throw an error it's not a transaction with outputs.
    vout0 = transaction.outputs[0]

    # If the first output of the pre-genesis transaction
    # was sent to a valid gantry and it carried the minting baton...
    if vout0.address in GANTRY_ADDRESSES and vout0.category_id == BATON:

        # Get the series
        series = int.from_bytes(vout0.nft_commitment, byteorder="little", signed=False)

        # Get the next gantry order step
        nextPower = pow(10, 4 + GANTRY_ADDRESSES.index(vout0.address))

        # Check the tx isn't skipping printing in deference to the next order gantry.
        #
        # If this is a transaction proceeding a gantry-skip tx, the next transaction
        #  does not correspond to the canonical series category id for the series in the protocol.
        #
        # If the next transaction can't printing tokens, the token metadata is NOT valid.
        #
        # Attackers can't forge a token that didn't print, but...
        #
        # Attackers can temporarily pollute an index with spurious category_ids
        #  if the specific order (or power) of the current gantry isn't enforced.
        #
        # E3-5  Gantry "skip" category_ids could collide with higher orders, if exclusion filters blocked
        #  the place of the correct categories in databases before the minting is picked up.
        #
        # This "if" insures that the least significant place of the series is not zero,
        #  that is't not assuming the authority of a higher gantry.
        #
        if series % nextPower == 0:
            return False

        # Return the series or just True, if the expiration isn't wanted.
        if return_series:
            return series
        else:
            return True
    else:
        return False


def validate_pre_genesis_bchn(transaction, return_series=True):

    # pop the first output
    # every transaction must have at least one output
    # and this should throw an error it's not a transaction with a "vout".
    vout0 = transaction["vout"][0]

    # If the first output of the pre-genesis transaction
    # was sent to a valid gantry and it carried the minting baton...
    if (
        vout0["scriptPubKey"]["hex"] in GANTRY_P2SH
        and vout0["tokenData"]["category"] == BATON
    ):
        # Get the series
        series_hex = vout0["tokenData"]["nft"]["commitment"]

        series = int.from_bytes(
            bytearray.fromhex(series_hex), byteorder="little", signed=False
        )

        # Get the next gantry order step
        nextPower = pow(10, 4 + GANTRY_P2SH.index(vout0["scriptPubKey"]["hex"]))

        # Check the gantry isn't skipping issuing tokens in the next transaction.
        #  This happens if when the issuance is handled by the a higher step gantry.
        #
        # If this is a transaction proceeding a gantry-skip tx, the next transaction
        #  does not correspond to the canonical series category id for the series in the protocol.
        #
        # If the next transaction can't printing tokens, the token metadata is NOT valid.
        #
        # Attackers can't forge a token that didn't print, but...
        #
        # Attackers can temporarily pollute an index with spurious category_ids
        #  if the specific order (or power) of the current gantry isn't enforced.
        #
        # i.e. The E3-5  Gantry "skip" category_ids could collide with higher orders, if exclusion filters blocked
        #  the place of the correct categories in databases before the minting is picked up.
        #
        # This check insures that the least significant place of the series is not zero,
        #  that is category isn't assuming the authority of a higher gantry.
        #
        if series % nextPower == 0:
            return False

        # Return the series or just True, if the expiration isn't wanted.
        if return_series:
            return series
        else:
            return True
    else:

        return False
