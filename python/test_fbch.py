import json
from jsonschema import validate

import bcmr_fbch

from bitcash.network import NetworkAPI
from bitcash import utils


def test_places():
    assert bcmr_fbch.get_places(0) == [0, 0, 0, 0]
    assert bcmr_fbch.get_places(10) == [0, 0, 0, 0]
    assert bcmr_fbch.get_places(100) == [0, 0, 0, 0]
    assert bcmr_fbch.get_places(1000) == [0, 0, 0, 1]
    assert bcmr_fbch.get_places(123123) == [0, 1, 2, 3]
    assert bcmr_fbch.get_places(2123123) == [2, 1, 2, 3]


def test_reg_uri():

    assert bcmr_fbch.get_fbch_reg_svg_uri() == "".join(
        [
            "data:image/svg+xml,",
            "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:400px; height: 400px;'%3E",
            "%3Crect width='14' height='14' x='1' y='1' rx='3' ry='3' style='stroke:%23fbc; fill:%23fff' /%3E",
            "%3Cpath d='m 5,3 h 6 V 5 H 7 V 7 H 9 V 9 H 7 v 4 H 5 Z' style='stroke:%23fbc; fill:%23fff;' /%3E",
            "%3C/svg%3E",
        ]
    )


def test_icon_uri_zero():

    assert bcmr_fbch.get_fbch_icon_svg_uri(0, 150) == "".join(
        [
            "data:image/svg+xml,",
            "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:150px; height: 150px;'%3E",
            "%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' style='stroke-width: 2px; stroke-linejoin: miter; stroke-linecap: butt; stroke: %23fff; fill:%23000; paint-order:stroke'%3E%3C/path%3E",
            "%3Cpath d='M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z' style='fill: %23fff;'%3E%3C/path%3E",
            "%3Cpath d='M 2 8 L 2 15 5 15 5 8 Z' style='fill: %23000;'%3E%3C/path%3E",
            "%3Cpath d='M 6 7 L 6 15 14 15 14 7 Z' style='fill:%23000;'%3E%3C/path%3E",
            "%3Cpath d='M 6 2 L 6 6 14 6 14 2 Z' style='fill:%23000;'%3E%3C/path%3E%3C/svg%3E",
        ]
    )


def test_icon_uri_123123():
    assert bcmr_fbch.get_fbch_icon_svg_uri(123123, 250) == "".join(
        [
            "data:image/svg+xml,",
            "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:250px; height: 250px;'%3E",
            "%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' style='stroke-width: 2px; stroke-linejoin: miter; stroke-linecap: butt; stroke: %23fff; fill:%23000; paint-order:stroke'%3E%3C/path%3E",
            "%3Cpath d='M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z' style='fill: %23fff;'%3E%3C/path%3E",
            "%3Cpath d='M 2 8 L 2 15 5 15 5 8 Z' style='fill: %23966424;'%3E%3C/path%3E",
            "%3Cpath d='M 6 7 L 6 15 14 15 14 7 Z' style='fill:%23ff7500;'%3E%3C/path%3E",
            "%3Cpath d='M 6 2 L 6 6 14 6 14 2 Z' style='fill:%23f00;'%3E%3C/path%3E%3C/svg%3E",
        ]
    )


def test_icon_uri_3123123():
    assert bcmr_fbch.get_fbch_icon_svg_uri(3123123, 250) == "".join(
        [
            "data:image/svg+xml,",
            "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:250px; height: 250px;'%3E",
            "%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' style='stroke-width: 2px; stroke-linejoin: miter; stroke-linecap: butt; stroke: %23fff; fill:%23ff7500; paint-order:stroke'%3E%3C/path%3E",
            "%3Cpath d='M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z' style='fill: %23fff;'%3E%3C/path%3E",
            "%3Cpath d='M 2 8 L 2 15 5 15 5 8 Z' style='fill: %23966424;'%3E%3C/path%3E",
            "%3Cpath d='M 6 7 L 6 15 14 15 14 7 Z' style='fill:%23ff7500;'%3E%3C/path%3E",
            "%3Cpath d='M 6 2 L 6 6 14 6 14 2 Z' style='fill:%23f00;'%3E%3C/path%3E%3C/svg%3E",
        ]
    )


def test_bcmr_is_valid_bcmr():
    contents = bcmr_fbch.get_fbch_series_bcmr(0, "00beef")
    with open(
        f"./data/bcmr-v2.schema-66c8b9f4fd714951906dbe7cf2bf8560.json", "r"
    ) as bcmr_schema_file:
        bcmr_schema = json.load(bcmr_schema_file)
        validate(
            instance=json.loads(contents) if type(contents) == str else contents,
            schema=bcmr_schema,
        )


def test_validate_bchn_transaction():
    with open(f"./data/bchn_raw_transaction.json", "r") as bcmr_schema_file:
        transaction = json.load(bcmr_schema_file)
        is_valid = bcmr_fbch.validate_pre_genesis_bchn(transaction)
        assert is_valid == 864000
        is_valid = bcmr_fbch.validate_pre_genesis_bchn(transaction, False)
        assert is_valid == True        


def test_bcmr_values():
    contents = bcmr_fbch.get_fbch_series_bcmr(0, "deadbeef")
    print(contents.keys())
    assert (
        contents.get("registryIdentity").get("name")
        == "A Future BCH Baton Authenticated Distributed Registry"
    )
    md = contents.get("identities").get("deadbeef")
    first = next(iter(md)) 
    assert md.get(first).get('token').get('symbol') == "FBCH-0000000"


def test_validate_bitcash():
    category_id = "7face04783f30345a6d48cd7747a7cabf92b6c0523f2e021c238573c691f2438"
    transaction = NetworkAPI.get_transaction(category_id)
    is_valid = bcmr_fbch.validate_pre_genesis_bitcash(transaction, False)
    assert is_valid == True
    series = bcmr_fbch.validate_pre_genesis_bitcash(transaction)
    assert series == 864000


def test_skip_edge():

    # the pre-genesis is the skip
    category_id = "31225667a83a30779e44dbb19f4251820ee4e00b13c3b5ae8d00bca2351c3981"
    transaction = NetworkAPI.get_transaction(category_id)
    series = bcmr_fbch.validate_pre_genesis_bitcash(transaction)
    assert series == 881000

    # pre-skip edge case
    # This is the pre-880,000 10k skip on the E3 (1,000) gantry.
    # This is NOT the correct categoryId for FBCH-0880000
    category_id = "9ce0fa4952e177320030370c39af3b72a631aa38f16749d035add145e7e139e3"
    transaction = NetworkAPI.get_transaction(category_id)
    series = bcmr_fbch.validate_pre_genesis_bitcash(transaction)
    assert series == False


#
# Test all initial series pass, if you'd like to.
#
# vectors = {
#     "16dac7ae826ad3913db3b1f0c1db567e3086a7591334c0fd3667ab13e51ae831": 858000,
#     "0cc1cb6033617c83ba69e158398f7d3097ee9fc538f52075a3a2df0af206b819": 859000,
#     "ca323c19cf6fc269822c6bfdda13f5c062c67bc3a20dbe73d87c43e1b2baca95": 860000,
#     "a42742e4188780dbdc6017016e2d49803eedfe0881805d2b19bc0e93fcae96ee": 861000,
#     "bdaaf2610c0a4ae34c0d7432f39aaaa4b5467d2f8e5255018ea073e1a558a678": 862000,
#     "89a2430a98bb92b504d6d23182d4b0d3c9455b4d9e9671aeae4b09208f1df584": 863000,
#     "7face04783f30345a6d48cd7747a7cabf92b6c0523f2e021c238573c691f2438": 864000,
#     "09dabc81889bd7d1301f7e0620301460bcc0f754ab9b9838b881b72182b1d502": 865000,
#     "b2a37403c5d97bf6c2e1338c054b6d73eef1543137cea85b6ab9eaeff5a43087": 866000,
#     "30d336f109876e8a66a6da63ac52c807e85e2bba00204f1b010ef9cd42fd98b7": 867000,
#     "28afff19a58a8ad529aa5631bc3576e9ab19675e541b28963b61e53055e77942": 868000,
#     "357ce1027d7f07f6c0c8bb79ccd2e0f2d44e9f2e91a754befc66380cdbaa6449": 869000,
#     "d861cd6420db1e280764b846bac790cc86c1e7ea93adecb2d1c9b4289eeaa1a8": 870000,
#     "08cd919b34a789bc07a37c6c68e9d15f105a36010fcb8a8bd017190fff84a6b8": 871000,
#     "f55d2e61aadc9519d1c0a346cbbc7766a5e871660a3c25b61eb517be200f901c": 872000,
#     "e9c7dca6f33c7c963bbbb7f72e85d5181d76ad9eb26d8ac7e0765921e6bc7248": 873000,
#     "a0055c80f357a2e14b203274cbe0f211bd25ad4032deab59dba1187397a23a0f": 874000,
#     "3c1136e10ba3a3852f1ab3d1bff1727c3b9c7782a8cb84fba5706ffaccfae24c": 875000,
#     "cdbc9154e80320895be94b616624ea967e6121879476dd285470a297e0f94e6c": 876000,
#     "5c88fbc5e0a8e828050bf83b3ebfc9b8d151c77079b4079e4f620588c2989ac1": 877000,
#     "53047c3ecccf16318a8a49376213e7695b81392c18a9a88ade84157ef3c4b793": 878000,
#     "b49acab285c26cfeac6cd8c3deabf8a04ed9eefd522ce5559342e526a3b35cc9": 879000,
#     "812006db91178d966c52207b32b46b337e5a6c1c87196e1af36834606205a2bb": 880000,
#     "31225667a83a30779e44dbb19f4251820ee4e00b13c3b5ae8d00bca2351c3981": 881000,
#     "5891be47b3b87d848678462eb65f82c3bd2e450693d5f5a6ab5b16ac3b6d8bd2": 882000,
#     "dde1e93679e85d7c894285fc4cb95a5e717918f56ff405d9a740f2be82a301cb": 883000,
#     "68931d718e1482c0d1a4ff73daa4cd7e6a1e22ca9e66d552bcb21ae861737115": 884000,
#     "019fbdca8662a1f6b617e3385c1dd903cde128d5d2d0b270015baacff1949ec0": 885000,
#     "a4d1892a9a2319c7e23933f98a926b00877556162ca64a3668182d9a388c8d27": 886000,
#     "e337b4468fd9a737968cd82b09dfd91884220134994949f9e8c1dc70c3471f5b": 887000,
#     "8385c083c569dcceb6dff0d08b950d35822c4ccd5fa40084071346df677550b4": 888000,
#     "55727d2dee32dca41f4d31434c28b2324b8d1e06ff26282ff451ea5329f0e153": 889000,
#     "988fd2522d329f6fc079929e86baadf9e636763b5351296d18aa199b13b4493d": 890000,
#     "5ec2629236f62393d1d3da47c764553aa7057a83ee60383225d1397573bd9f9f": 891000,
#     "336a642ace9290d91a1189b576236d9c8c7fffa01eea388a8b3bb635c94a6cc3": 892000,
#     "edbbb22cda1b04ffa4741c51f35d506002d4dc5b9a36c9cb3aa3fe578303af3f": 893000,
#     "3753b96d4a6d246c72fe5469e4e79361af59186168ffa26b89f29cf037fc0e3f": 894000,
#     "ca95807958352f83fec68c5e0bc7ca30e211a7bdeb1801eac4573e9cbc0730a8": 895000,
#     "30834fbca4bbd8e2bd5c4754395a21b2af24e7759cbc882a9df4dab1e953411a": 896000,
#     "78687328f1f07a5a58d9d1e70b30cbb854205520e9e1787b2460b0222f3623ff": 897000,
#     "8b97fc83485dd45ae2122f163de5897eafcdec81dbf779e4153548e24bd556ed": 898000,
#     "5f1abc1bf36ea45291c0d303f9a63b5c8632687e6b1b224beb3b311fa0685812": 899000,
#     "4575d242087a5e8a574be521ff8eef4ac1a7ee9a012834821a1272503e2e880a": 900000,
#     "9c5f32f489b49f56ebe172d5f1a2f9f0ad467d8f05c3af42d9baa1778c04598c": 901000,
#     "ca17a6b04e5217db5783a96ff8501c37977ef6f54ad67a7496efe9105b34d897": 902000,
#     "9e405b79a5784a1b4179dba017ea01fa77c5d0b050d0852983ec2a00f88c870b": 903000,
#     "645d0dbc137e0cfaacd8412b62884f55a0de158ef0e504b3df4058b29caf8786": 904000,
#     "bae12c5a0b11e9f85e2d1d1d07b0d1a1edf3dba0fa36e48cf73f48a69709240c": 905000,
#     "448c2a2f5f871d654c7263f315a7bfb875e12f2a39b78decd35d03273acb23bf": 906000,
#     "7d28d82f8899bb1739dc2645bebf50b7c5e18c92eb6838b42aea02920d8c4cb8": 907000,
#     "567cca6bfeef85f1958bd11c022c9e41a8fa5a0d2a26e5e1405b1e70805e480d": 908000,
#     "cda41febe6abe5bd56be403792a357d5adfcfe129d960833d157db50175ea493": 909000,
#     "7d83793c073bf83162a1d710fe973bfa040cefedd699dca2a6a96243ecc45ef4": 910000,
#     "13117fb7ee0827bbf577772515643dd8052a71981e6f6c4d9001ded23f214fa3": 920000,
#     "bb85461930db00680ad4e93876f87463e351a9686d98448a7cb8e9d9500a2dcb": 930000,
#     "f05609733ca9699b72bb17ef4dfb9bcd78603d57a2d8ec2879f2bfae1262709e": 940000,
#     "14a5b06bf5203ce053a7e4101176135d09591956d488c96cf585e813ba9a2026": 950000,
#     "29db350a88f66124229824e75b753432551f59b972b0175eb7d71e528b9073cb": 1000000,
#     "889cc584b5eea00c13e48258199f066bbeb0e88b6ce65519fe2312f4cf37b40d": 1100000,
#     "d9d7b5d6d71a5fefaba74a25deffff74454064bbd08ddd24f3619b1d27ceff91": 1200000,
#     "fbc3b05d84ae0972ab3a2028d8980f3a597ab89fe075c1bd6129f3c890d67b0f": 1300000,
#     "e2170fd75867a4d0b8df24204aea8aebb33a7d699e058a6ab42f0254bca9026b": 1400000,
#     "e9057952ded4aad0480169d390906ac619e0d6e31614534f1dcb954e222524f1": 1500000,
#     "08a24b2ca498845e4929a017614252ec674f48641b2119b1ae8411deb424bdf6": 1600000,
#     "b9fb0b7e67bb69cb4b634ddc0efe4b578eda4fc48c870b2ce398d850bf4a28da": 1700000,
#     "3cf5fec8745e0dd77c5b622699d95fe9c9955583e1d97974045958a9406f6256": 1800000,
#     "edad1c825338554b83e562aab2c2b220569033a2ccbd970975f3ddda320b70e1": 2000000,
#     "03882c71eb1eced84a39fd392df210bb175e6a109bd0c918444b93b67ea8854a": 3000000,
#     "5e296fd6ce4c63996094f4ddb22441867411a6bcbb732430ad4f4cc6b4fb3480": 4000000,
# }

# def test_many_series():
#     for k in vectors:
#         category_id = k
#         transaction = NetworkAPI.get_transaction(category_id)
#         series = bcmr_fbch.bitcash_validate_pre_genesis(transaction)
#         assert series == vectors.get(k)
