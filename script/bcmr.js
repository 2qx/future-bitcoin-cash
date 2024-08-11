
import { vmNumberToBigInt, hexToBin } from "@bitauth/libauth"
import { textSpanIsEmpty } from "typescript"

let series = [
    {
        "seriesHex": "00093d",
        "category": "5e296fd6ce4c63996094f4ddb22441867411a6bcbb732430ad4f4cc6b4fb3480"

    },
    {
        "seriesHex": "002f0d",
        "category": "7face04783f30345a6d48cd7747a7cabf92b6c0523f2e021c238573c691f2438"

    },
    {
        "seriesHex": "006a18",
        "category": "08a24b2ca498845e4929a017614252ec674f48641b2119b1ae8411deb424bdf6"

    },
    {
        "seriesHex": "00ac0d",
        "category": "30834fbca4bbd8e2bd5c4754395a21b2af24e7759cbc882a9df4dab1e953411a"

    },
    {
        "seriesHex": "08810d",
        "category": "019fbdca8662a1f6b617e3385c1dd903cde128d5d2d0b270015baacff1949ec0"

    },
    {
        "seriesHex": "10560d",
        "category": "a0055c80f357a2e14b203274cbe0f211bd25ad4032deab59dba1187397a23a0f"

    },
    {
        "seriesHex": "10d30d",
        "category": "448c2a2f5f871d654c7263f315a7bfb875e12f2a39b78decd35d03273acb23bf"

    },
    {
        "seriesHex": "182b0d",
        "category": "89a2430a98bb92b504d6d23182d4b0d3c9455b4d9e9671aeae4b09208f1df584"

    },
    {
        "seriesHex": "18a80d",
        "category": "ca95807958352f83fec68c5e0bc7ca30e211a7bdeb1801eac4573e9cbc0730a8"

    },
    {
        "seriesHex": "207d0d",
        "category": "68931d718e1482c0d1a4ff73daa4cd7e6a1e22ca9e66d552bcb21ae861737115"

    },
    {
        "seriesHex": "20d613",
        "category": "fbc3b05d84ae0972ab3a2028d8980f3a597ab89fe075c1bd6129f3c890d67b0f"

    },
    {
        "seriesHex": "28520d",
        "category": "e9c7dca6f33c7c963bbbb7f72e85d5181d76ad9eb26d8ac7e0765921e6bc7248"

    },
    {
        "seriesHex": "28cf0d",
        "category": "bae12c5a0b11e9f85e2d1d1d07b0d1a1edf3dba0fa36e48cf73f48a69709240c"

    },
    {
        "seriesHex": "30270d",
        "category": "bdaaf2610c0a4ae34c0d7432f39aaaa4b5467d2f8e5255018ea073e1a558a678"

    },
    {
        "seriesHex": "30a40d",
        "category": "3753b96d4a6d246c72fe5469e4e79361af59186168ffa26b89f29cf037fc0e3f"

    },
    {
        "seriesHex": "38790d",
        "category": "dde1e93679e85d7c894285fc4cb95a5e717918f56ff405d9a740f2be82a301cb"

    },
    {
        "seriesHex": "40420f",
        "category": "29db350a88f66124229824e75b753432551f59b972b0175eb7d71e528b9073cb"

    },
    {
        "seriesHex": "404e0d",
        "category": "f55d2e61aadc9519d1c0a346cbbc7766a5e871660a3c25b61eb517be200f901c"

    },
    {
        "seriesHex": "40771b",
        "category": "3cf5fec8745e0dd77c5b622699d95fe9c9955583e1d97974045958a9406f6256"

    },
    {
        "seriesHex": "40cb0d",
        "category": "645d0dbc137e0cfaacd8412b62884f55a0de158ef0e504b3df4058b29caf8786"

    },
    {
        "seriesHex": "48230d",
        "category": "a42742e4188780dbdc6017016e2d49803eedfe0881805d2b19bc0e93fcae96ee"

    },
    {
        "seriesHex": "48a00d",
        "category": "edbbb22cda1b04ffa4741c51f35d506002d4dc5b9a36c9cb3aa3fe578303af3f"

    },
    {
        "seriesHex": "50750d",
        "category": "5891be47b3b87d848678462eb65f82c3bd2e450693d5f5a6ab5b16ac3b6d8bd2"

    },
    {
        "seriesHex": "584a0d",
        "category": "08cd919b34a789bc07a37c6c68e9d15f105a36010fcb8a8bd017190fff84a6b8"

    },
    {
        "seriesHex": "58c70d",
        "category": "9e405b79a5784a1b4179dba017ea01fa77c5d0b050d0852983ec2a00f88c870b"

    },
    {
        "seriesHex": "601f0d",
        "category": "ca323c19cf6fc269822c6bfdda13f5c062c67bc3a20dbe73d87c43e1b2baca95"

    },
    {
        "seriesHex": "609c0d",
        "category": "336a642ace9290d91a1189b576236d9c8c7fffa01eea388a8b3bb635c94a6cc3"

    },
    {
        "seriesHex": "60e316",
        "category": "e9057952ded4aad0480169d390906ac619e0d6e31614534f1dcb954e222524f1"

    },
    {
        "seriesHex": "68710d",
        "category": "31225667a83a30779e44dbb19f4251820ee4e00b13c3b5ae8d00bca2351c3981"

    },
    {
        "seriesHex": "70460d",
        "category": "d861cd6420db1e280764b846bac790cc86c1e7ea93adecb2d1c9b4289eeaa1a8"

    },
    {
        "seriesHex": "70c30d",
        "category": "ca17a6b04e5217db5783a96ff8501c37977ef6f54ad67a7496efe9105b34d897"

    },
    {
        "seriesHex": "781b0d",
        "category": "0cc1cb6033617c83ba69e158398f7d3097ee9fc538f52075a3a2df0af206b819"

    },
    {
        "seriesHex": "78980d",
        "category": "5ec2629236f62393d1d3da47c764553aa7057a83ee60383225d1397573bd9f9f"

    },
    {
        "seriesHex": "804f12",
        "category": "d9d7b5d6d71a5fefaba74a25deffff74454064bbd08ddd24f3619b1d27ceff91"

    },
    {
        "seriesHex": "806d0d",
        "category": "812006db91178d966c52207b32b46b337e5a6c1c87196e1af36834606205a2bb"

    },
    {
        "seriesHex": "80841e",
        "category": "edad1c825338554b83e562aab2c2b220569033a2ccbd970975f3ddda320b70e1"

    },
    {
        "seriesHex": "88420d",
        "category": "357ce1027d7f07f6c0c8bb79ccd2e0f2d44e9f2e91a754befc66380cdbaa6449"

    },
    {
        "seriesHex": "88bf0d",
        "category": "9c5f32f489b49f56ebe172d5f1a2f9f0ad467d8f05c3af42d9baa1778c04598c"

    },
    {
        "seriesHex": "90170d",
        "category": "16dac7ae826ad3913db3b1f0c1db567e3086a7591334c0fd3667ab13e51ae831"

    },
    {
        "seriesHex": "90940d",
        "category": "988fd2522d329f6fc079929e86baadf9e636763b5351296d18aa199b13b4493d"

    },
    {
        "seriesHex": "98690d",
        "category": "b49acab285c26cfeac6cd8c3deabf8a04ed9eefd522ce5559342e526a3b35cc9"

    },
    {
        "seriesHex": "a03e0d",
        "category": "28afff19a58a8ad529aa5631bc3576e9ab19675e541b28963b61e53055e77942"

    },
    {
        "seriesHex": "a0bb0d",
        "category": "4575d242087a5e8a574be521ff8eef4ac1a7ee9a012834821a1272503e2e880a"

    },
    {
        "seriesHex": "a0f019",
        "category": "b9fb0b7e67bb69cb4b634ddc0efe4b578eda4fc48c870b2ce398d850bf4a28da"

    },
    {
        "seriesHex": "a8900d",
        "category": "55727d2dee32dca41f4d31434c28b2324b8d1e06ff26282ff451ea5329f0e153"

    },
    {
        "seriesHex": "b0650d",
        "category": "53047c3ecccf16318a8a49376213e7695b81392c18a9a88ade84157ef3c4b793"

    },
    {
        "seriesHex": "b0e20d",
        "category": "7d83793c073bf83162a1d710fe973bfa040cefedd699dca2a6a96243ecc45ef4"

    },
    {
        "seriesHex": "b83a0d",
        "category": "30d336f109876e8a66a6da63ac52c807e85e2bba00204f1b010ef9cd42fd98b7"

    },
    {
        "seriesHex": "b8b70d",
        "category": "5f1abc1bf36ea45291c0d303f9a63b5c8632687e6b1b224beb3b311fa0685812"

    },
    {
        "seriesHex": "c0090e",
        "category": "13117fb7ee0827bbf577772515643dd8052a71981e6f6c4d9001ded23f214fa3"

    },
    {
        "seriesHex": "c05c15",
        "category": "e2170fd75867a4d0b8df24204aea8aebb33a7d699e058a6ab42f0254bca9026b"

    },
    {
        "seriesHex": "c08c0d",
        "category": "8385c083c569dcceb6dff0d08b950d35822c4ccd5fa40084071346df677550b4"

    },
    {
        "seriesHex": "c0c62d",
        "category": "03882c71eb1eced84a39fd392df210bb175e6a109bd0c918444b93b67ea8854a"

    },
    {
        "seriesHex": "c8610d",
        "category": "5c88fbc5e0a8e828050bf83b3ebfc9b8d151c77079b4079e4f620588c2989ac1"

    },
    {
        "seriesHex": "c8de0d",
        "category": "cda41febe6abe5bd56be403792a357d5adfcfe129d960833d157db50175ea493"

    },
    {
        "seriesHex": "d0300e",
        "category": "bb85461930db00680ad4e93876f87463e351a9686d98448a7cb8e9d9500a2dcb"

    },
    {
        "seriesHex": "d0360d",
        "category": "b2a37403c5d97bf6c2e1338c054b6d73eef1543137cea85b6ab9eaeff5a43087"

    },
    {
        "seriesHex": "d0b30d",
        "category": "8b97fc83485dd45ae2122f163de5897eafcdec81dbf779e4153548e24bd556ed"

    },
    {
        "seriesHex": "d8880d",
        "category": "e337b4468fd9a737968cd82b09dfd91884220134994949f9e8c1dc70c3471f5b"

    },
    {
        "seriesHex": "e0570e",
        "category": "f05609733ca9699b72bb17ef4dfb9bcd78603d57a2d8ec2879f2bfae1262709e"

    },
    {
        "seriesHex": "e05d0d",
        "category": "cdbc9154e80320895be94b616624ea967e6121879476dd285470a297e0f94e6c"

    },
    {
        "seriesHex": "e0c810",
        "category": "889cc584b5eea00c13e48258199f066bbeb0e88b6ce65519fe2312f4cf37b40d"

    },
    {
        "seriesHex": "e0da0d",
        "category": "567cca6bfeef85f1958bd11c022c9e41a8fa5a0d2a26e5e1405b1e70805e480d"

    },
    {
        "seriesHex": "e8320d",
        "category": "09dabc81889bd7d1301f7e0620301460bcc0f754ab9b9838b881b72182b1d502"

    },
    {
        "seriesHex": "e8af0d",
        "category": "78687328f1f07a5a58d9d1e70b30cbb854205520e9e1787b2460b0222f3623ff"

    },
    {
        "seriesHex": "f07e0e",
        "category": "14a5b06bf5203ce053a7e4101176135d09591956d488c96cf585e813ba9a2026"

    },
    {
        "seriesHex": "f0840d",
        "category": "a4d1892a9a2319c7e23933f98a926b00877556162ca64a3668182d9a388c8d27"

    },
    {
        "seriesHex": "f8590d",
        "category": "3c1136e10ba3a3852f1ab3d1bff1727c3b9c7782a8cb84fba5706ffaccfae24c"

    },
    {
        "seriesHex": "f8d60d",
        "category": "7d28d82f8899bb1739dc2645bebf50b7c5e18c92eb6838b42aea02920d8c4cb8"
    }
]
function asBcmrEntry(time, category) {
    return {
        "2024-08-10T00:00:00.000Z": {
            "name": "Future Bitcoin Cash - " + time.toLocaleString(),
            "description": "A fungible token redeemable for Bitcoin Cash after block " + time.toLocaleString(),
            "token": {
                "category": category,
                "decimals": 8,
                "symbol": `FBCH-${String(time).padStart(7, '0')}`
            },
            "uris": {
                "icon": `https://futurebitcoin.cash/${time}.svg`,
                "web": `https://futurebitcoin.cash/v/${time}`
            }
        }

    }
}


let bcmr = series.map(s => {
    let time = Number(vmNumberToBigInt(hexToBin(s.seriesHex)))
    return {
        time: time,
        category: s.category
    }
}).sort((a, b) => a.time - b.time).map(s => {
    return {
        key: s.category,
        val: asBcmrEntry(s.time, s.category)
    }
})

bcmr = bcmr.reduce((map, obj) => (map[obj.key] = obj.val, map), {});


console.log(JSON.stringify(bcmr, undefined, 2))