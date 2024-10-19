import { vmNumberToBigInt, hexToBin } from "@bitauth/libauth";
import { getFbchIconSvgUri } from "../packages/lib/dist/main/icons/icons.js";

let series = [
  {
    seriesHex: "40420f",
    category:
      "29db350a88f66124229824e75b753432551f59b972b0175eb7d71e528b9073cb",
  },
  {
    seriesHex: "80841e",
    category:
      "edad1c825338554b83e562aab2c2b220569033a2ccbd970975f3ddda320b70e1",
  },
  {
    seriesHex: "c0c62d",
    category:
      "03882c71eb1eced84a39fd392df210bb175e6a109bd0c918444b93b67ea8854a",
  },
  {
    seriesHex: "00093d",
    category:
      "5e296fd6ce4c63996094f4ddb22441867411a6bcbb732430ad4f4cc6b4fb3480",
  },
  {
    seriesHex: "a0bb0d",
    category:
      "4575d242087a5e8a574be521ff8eef4ac1a7ee9a012834821a1272503e2e880a",
  },
  {
    seriesHex: "e0c810",
    category:
      "889cc584b5eea00c13e48258199f066bbeb0e88b6ce65519fe2312f4cf37b40d",
  },
  {
    seriesHex: "804f12",
    category:
      "d9d7b5d6d71a5fefaba74a25deffff74454064bbd08ddd24f3619b1d27ceff91",
  },
  {
    seriesHex: "20d613",
    category:
      "fbc3b05d84ae0972ab3a2028d8980f3a597ab89fe075c1bd6129f3c890d67b0f",
  },
  {
    seriesHex: "c05c15",
    category:
      "e2170fd75867a4d0b8df24204aea8aebb33a7d699e058a6ab42f0254bca9026b",
  },
  {
    seriesHex: "60e316",
    category:
      "e9057952ded4aad0480169d390906ac619e0d6e31614534f1dcb954e222524f1",
  },
  {
    seriesHex: "006a18",
    category:
      "08a24b2ca498845e4929a017614252ec674f48641b2119b1ae8411deb424bdf6",
  },
  {
    seriesHex: "a0f019",
    category:
      "b9fb0b7e67bb69cb4b634ddc0efe4b578eda4fc48c870b2ce398d850bf4a28da",
  },
  {
    seriesHex: "40771b",
    category:
      "3cf5fec8745e0dd77c5b622699d95fe9c9955583e1d97974045958a9406f6256",
  },
  {
    seriesHex: "601f0d",
    category:
      "ca323c19cf6fc269822c6bfdda13f5c062c67bc3a20dbe73d87c43e1b2baca95",
  },
  {
    seriesHex: "70460d",
    category:
      "d861cd6420db1e280764b846bac790cc86c1e7ea93adecb2d1c9b4289eeaa1a8",
  },
  {
    seriesHex: "806d0d",
    category:
      "812006db91178d966c52207b32b46b337e5a6c1c87196e1af36834606205a2bb",
  },
  {
    seriesHex: "90940d",
    category:
      "988fd2522d329f6fc079929e86baadf9e636763b5351296d18aa199b13b4493d",
  },
  {
    seriesHex: "b0e20d",
    category:
      "7d83793c073bf83162a1d710fe973bfa040cefedd699dca2a6a96243ecc45ef4",
  },
  {
    seriesHex: "c0090e",
    category:
      "13117fb7ee0827bbf577772515643dd8052a71981e6f6c4d9001ded23f214fa3",
  },
  {
    seriesHex: "d0300e",
    category:
      "bb85461930db00680ad4e93876f87463e351a9686d98448a7cb8e9d9500a2dcb",
  },
  {
    seriesHex: "e0570e",
    category:
      "f05609733ca9699b72bb17ef4dfb9bcd78603d57a2d8ec2879f2bfae1262709e",
  },
  {
    seriesHex: "f07e0e",
    category:
      "14a5b06bf5203ce053a7e4101176135d09591956d488c96cf585e813ba9a2026",
  },
  {
    seriesHex: "90170d",
    category:
      "16dac7ae826ad3913db3b1f0c1db567e3086a7591334c0fd3667ab13e51ae831",
  },
  {
    seriesHex: "781b0d",
    category:
      "0cc1cb6033617c83ba69e158398f7d3097ee9fc538f52075a3a2df0af206b819",
  },
  {
    seriesHex: "48230d",
    category:
      "a42742e4188780dbdc6017016e2d49803eedfe0881805d2b19bc0e93fcae96ee",
  },
  {
    seriesHex: "30270d",
    category:
      "bdaaf2610c0a4ae34c0d7432f39aaaa4b5467d2f8e5255018ea073e1a558a678",
  },
  {
    seriesHex: "182b0d",
    category:
      "89a2430a98bb92b504d6d23182d4b0d3c9455b4d9e9671aeae4b09208f1df584",
  },
  {
    seriesHex: "002f0d",
    category:
      "7face04783f30345a6d48cd7747a7cabf92b6c0523f2e021c238573c691f2438",
  },
  {
    seriesHex: "e8320d",
    category:
      "09dabc81889bd7d1301f7e0620301460bcc0f754ab9b9838b881b72182b1d502",
  },
  {
    seriesHex: "d0360d",
    category:
      "b2a37403c5d97bf6c2e1338c054b6d73eef1543137cea85b6ab9eaeff5a43087",
  },
  {
    seriesHex: "b83a0d",
    category:
      "30d336f109876e8a66a6da63ac52c807e85e2bba00204f1b010ef9cd42fd98b7",
  },
  {
    seriesHex: "a03e0d",
    category:
      "28afff19a58a8ad529aa5631bc3576e9ab19675e541b28963b61e53055e77942",
  },
  {
    seriesHex: "88420d",
    category:
      "357ce1027d7f07f6c0c8bb79ccd2e0f2d44e9f2e91a754befc66380cdbaa6449",
  },
  {
    seriesHex: "584a0d",
    category:
      "08cd919b34a789bc07a37c6c68e9d15f105a36010fcb8a8bd017190fff84a6b8",
  },
  {
    seriesHex: "404e0d",
    category:
      "f55d2e61aadc9519d1c0a346cbbc7766a5e871660a3c25b61eb517be200f901c",
  },
  {
    seriesHex: "28520d",
    category:
      "e9c7dca6f33c7c963bbbb7f72e85d5181d76ad9eb26d8ac7e0765921e6bc7248",
  },
  {
    seriesHex: "10560d",
    category:
      "a0055c80f357a2e14b203274cbe0f211bd25ad4032deab59dba1187397a23a0f",
  },
  {
    seriesHex: "f8590d",
    category:
      "3c1136e10ba3a3852f1ab3d1bff1727c3b9c7782a8cb84fba5706ffaccfae24c",
  },
  {
    seriesHex: "e05d0d",
    category:
      "cdbc9154e80320895be94b616624ea967e6121879476dd285470a297e0f94e6c",
  },
  {
    seriesHex: "c8610d",
    category:
      "5c88fbc5e0a8e828050bf83b3ebfc9b8d151c77079b4079e4f620588c2989ac1",
  },
  {
    seriesHex: "b0650d",
    category:
      "53047c3ecccf16318a8a49376213e7695b81392c18a9a88ade84157ef3c4b793",
  },
  {
    seriesHex: "98690d",
    category:
      "b49acab285c26cfeac6cd8c3deabf8a04ed9eefd522ce5559342e526a3b35cc9",
  },
  {
    seriesHex: "68710d",
    category:
      "31225667a83a30779e44dbb19f4251820ee4e00b13c3b5ae8d00bca2351c3981",
  },
  {
    seriesHex: "50750d",
    category:
      "5891be47b3b87d848678462eb65f82c3bd2e450693d5f5a6ab5b16ac3b6d8bd2",
  },
  {
    seriesHex: "38790d",
    category:
      "dde1e93679e85d7c894285fc4cb95a5e717918f56ff405d9a740f2be82a301cb",
  },
  {
    seriesHex: "207d0d",
    category:
      "68931d718e1482c0d1a4ff73daa4cd7e6a1e22ca9e66d552bcb21ae861737115",
  },
  {
    seriesHex: "08810d",
    category:
      "019fbdca8662a1f6b617e3385c1dd903cde128d5d2d0b270015baacff1949ec0",
  },
  {
    seriesHex: "f0840d",
    category:
      "a4d1892a9a2319c7e23933f98a926b00877556162ca64a3668182d9a388c8d27",
  },
  {
    seriesHex: "d8880d",
    category:
      "e337b4468fd9a737968cd82b09dfd91884220134994949f9e8c1dc70c3471f5b",
  },
  {
    seriesHex: "c08c0d",
    category:
      "8385c083c569dcceb6dff0d08b950d35822c4ccd5fa40084071346df677550b4",
  },
  {
    seriesHex: "a8900d",
    category:
      "55727d2dee32dca41f4d31434c28b2324b8d1e06ff26282ff451ea5329f0e153",
  },
  {
    seriesHex: "78980d",
    category:
      "5ec2629236f62393d1d3da47c764553aa7057a83ee60383225d1397573bd9f9f",
  },
  {
    seriesHex: "609c0d",
    category:
      "336a642ace9290d91a1189b576236d9c8c7fffa01eea388a8b3bb635c94a6cc3",
  },
  {
    seriesHex: "48a00d",
    category:
      "edbbb22cda1b04ffa4741c51f35d506002d4dc5b9a36c9cb3aa3fe578303af3f",
  },
  {
    seriesHex: "30a40d",
    category:
      "3753b96d4a6d246c72fe5469e4e79361af59186168ffa26b89f29cf037fc0e3f",
  },
  {
    seriesHex: "18a80d",
    category:
      "ca95807958352f83fec68c5e0bc7ca30e211a7bdeb1801eac4573e9cbc0730a8",
  },
  {
    seriesHex: "00ac0d",
    category:
      "30834fbca4bbd8e2bd5c4754395a21b2af24e7759cbc882a9df4dab1e953411a",
  },
  {
    seriesHex: "e8af0d",
    category:
      "78687328f1f07a5a58d9d1e70b30cbb854205520e9e1787b2460b0222f3623ff",
  },
  {
    seriesHex: "d0b30d",
    category:
      "8b97fc83485dd45ae2122f163de5897eafcdec81dbf779e4153548e24bd556ed",
  },
  {
    seriesHex: "b8b70d",
    category:
      "5f1abc1bf36ea45291c0d303f9a63b5c8632687e6b1b224beb3b311fa0685812",
  },
  {
    seriesHex: "88bf0d",
    category:
      "9c5f32f489b49f56ebe172d5f1a2f9f0ad467d8f05c3af42d9baa1778c04598c",
  },
  {
    seriesHex: "70c30d",
    category:
      "ca17a6b04e5217db5783a96ff8501c37977ef6f54ad67a7496efe9105b34d897",
  },
  {
    seriesHex: "58c70d",
    category:
      "9e405b79a5784a1b4179dba017ea01fa77c5d0b050d0852983ec2a00f88c870b",
  },
  {
    seriesHex: "40cb0d",
    category:
      "645d0dbc137e0cfaacd8412b62884f55a0de158ef0e504b3df4058b29caf8786",
  },
  {
    seriesHex: "28cf0d",
    category:
      "bae12c5a0b11e9f85e2d1d1d07b0d1a1edf3dba0fa36e48cf73f48a69709240c",
  },
  {
    seriesHex: "10d30d",
    category:
      "448c2a2f5f871d654c7263f315a7bfb875e12f2a39b78decd35d03273acb23bf",
  },
  {
    seriesHex: "f8d60d",
    category:
      "7d28d82f8899bb1739dc2645bebf50b7c5e18c92eb6838b42aea02920d8c4cb8",
  },
  {
    seriesHex: "e0da0d",
    category:
      "567cca6bfeef85f1958bd11c022c9e41a8fa5a0d2a26e5e1405b1e70805e480d",
  },
  {
    seriesHex: "c8de0d",
    category:
      "cda41febe6abe5bd56be403792a357d5adfcfe129d960833d157db50175ea493",
  },
  {
    seriesHex: "e0fd1c",
    category:
      "8848979f5e377eb7aa7d9a4c2c67ab20a7de917409a52ce482a8f9987910f502",
  },
  {
    seriesHex: "200b20",
    category:
      "1654b42288a501e82ad48195d8a15382ad57d0a684caa8a07767b4552166ef3f",
  },
  {
    seriesHex: "c09121",
    category:
      "d95d8dab23deeea1119e6ea9a7d2efdde31c1f8d9386c42d7962a5ed2b539d32",
  },
  {
    seriesHex: "601823",
    category:
      "8d672efb35d6e36767cc650ed215955d46fef715421de17d1c15257b9bb89528",
  },
  {
    seriesHex: "009f24",
    category:
      "70c090c733864629e0b1674cb81a943bebb47cbeb6a66134430cb9d39b7157b6",
  },
  {
    seriesHex: "a02526",
    category:
      "3e22adf69fb684e970cb98eefa386fdbf34656d1c907e58308e5e7f27bf9c9f3",
  },
  {
    seriesHex: "40ac27",
    category:
      "6df2d7adae18b5270a65d51c2bff426b3c0dae4f23d9efdbdf7dd984e4acc164",
  },
  {
    seriesHex: "e03229",
    category:
      "3d3a57df1e7a91939eca1b7d45fb7289ef3e2b9a765eb3621f1f20275361074a",
  },
  {
    seriesHex: "80b92a",
    category:
      "b8f55be2a6e3d5a57536c8cdf235ffe43a240b06868179d0d427ca64f58a87ba",
  },
  {
    seriesHex: "00a60e",
    category:
      "c487cd1882c8b33e3b7fcdb151b8b597971b432f163a86ffbe36c9b4203a0a9c",
  },
  {
    seriesHex: "10cd0e",
    category:
      "79e18ce094e4b5c65e7722ffe01cecc1eeab1511af4f50d814f3684e90521dd2",
  },
  {
    seriesHex: "20f40e",
    category:
      "05590cd644d3c9e9e4c28ae9bfd7a3a5ab47d3e230544e109502aa0e58ac2770",
  },
  {
    seriesHex: "301b0f",
    category:
      "6e117ef48d571fa7bb6f4850bc2d532d8417fa240a365e5188967e1f52e3f05c",
  },
  {
    seriesHex: "50690f",
    category:
      "f48d7a05100f416d12c775b6f56d11f3b77a609cae677e328c10775534f5ac34",
  },
  {
    seriesHex: "60900f",
    category:
      "ca0ee31c809597bfec4afef784f7da59374556e80d8407fba1779c89b5be2e41",
  },
  {
    seriesHex: "70b70f",
    category:
      "4ba06592954448468547775103229485d001e71d91084375c33b396490cd4b6c",
  },
  {
    seriesHex: "80de0f",
    category:
      "9877da4c1bac6178b1fe80c21e6a330ae86b3f783ea1915dfbbd7c06d6825861",
  },
  {
    seriesHex: "900510",
    category:
      "00f01ec3711703677bc1b96e4d9391568c7158049ebadf0385dd216d37a0e9c3",
  },
  {
    seriesHex: "a02c10",
    category:
      "b9024d48f71a3fab09c788563ce0b1bbc113b6b662989283fbd3d541afbf7a1a",
  },
  {
    seriesHex: "b05310",
    category:
      "36593517db2ab8f8d6e2520ccbeaa049262f71db4888de10d087883c3a917f91",
  },
  {
    seriesHex: "c07a10",
    category:
      "58b867bc4e0b3ca7cc296303eaade403975b7a6a0d289bc60e9342bbf92e7bf0",
  },
  {
    seriesHex: "d0a110",
    category:
      "973cd634204cbac0df4235289d0365a9a375dc5e11a8d2e325e378b264582721",
  },
  {
    seriesHex: "f0ef10",
    category:
      "d55621c14ed467198a9c58d92f784479a5aef8f0e7f9bc859d83112360e16480",
  },
  {
    seriesHex: "001711",
    category:
      "39ef8ac95f3ee553f9ee86da8f73d160de9a159eafb5c611de771d2891fcc2e7",
  },
  {
    seriesHex: "103e11",
    category:
      "6aac3c903d5e55821ad4fdbd9f9ee3aceb89f91b66b6467034165ab7fb588e70",
  },
  {
    seriesHex: "206511",
    category:
      "2da7a5fcd209f68ad1dbf4c68f6ab3c3c0150682ec525de52ab93135d2b26cf3",
  },
  {
    seriesHex: "308c11",
    category:
      "69ff94cc9b14a102f1d6a8df5dc55d86b97907533bac1c2aeab9ec33c045a76a",
  },
  {
    seriesHex: "98e60d",
    category:
      "46cd3f632d9708bdc95a60eee153be0536fec4d175b4c17702103ac9ba685884",
  },
  {
    seriesHex: "80ea0d",
    category:
      "7c81b949b796ba3ec164695c6cc4ca3bcff973df3808ae34162777063fd3c885",
  },
  {
    seriesHex: "68ee0d",
    category:
      "61bcab4ddf4d7b172e06f29ff466ce5e275d4476a5dd7d1f8177c63f3b9ddcbe",
  },
  {
    seriesHex: "50f20d",
    category:
      "f7b3c495ff4128b52507c683a04e06955db0356401a16ffe5c88ed3e276fc474",
  },
  {
    seriesHex: "38f60d",
    category:
      "e95ae8fe9541fd93daab84e4a2b70e73edf54b570875ff62e8c68602abe6d5f6",
  },
  {
    seriesHex: "20fa0d",
    category:
      "7adc06cea8abb9ebd52753a604404073c54ba17f187660188952864b6f4c93f0",
  },
  {
    seriesHex: "08fe0d",
    category:
      "7bb445f53e8b05945e2d64cdb0cf32a633026389813edd978cefd5e278647207",
  },
  {
    seriesHex: "f0010e",
    category:
      "717ffab63d7edfcef357eac158ab52590dd3a6588726f855abd0cee0169708f6",
  },
  {
    seriesHex: "d8050e",
    category:
      "e602521afca264ba6fec44dd61b4b740aba3965488ee06f91ed452a7256a38b6",
  },
  {
    seriesHex: "a80d0e",
    category:
      "402ec1aa54d4aee881a299c172c4e4e7d275dec797ec24a7f7d5197f68d24b15",
  },
  {
    seriesHex: "90110e",
    category:
      "426a8a1772efdaff9f5612d77ea9bdb629a7239283e86d32a2c0a1d3709366a3",
  },
  {
    seriesHex: "78150e",
    category:
      "532dcc825f20b26d5d4bc48338c8605697c60d47f0c325f9bcb3fac4c99a665b",
  },
  {
    seriesHex: "60190e",
    category:
      "d389e0804e502f284051220656e9f799c456fbd1fa3c422dcbe223cd91d9f139",
  },
  {
    seriesHex: "481d0e",
    category:
      "e8cc1205260eef7652d8eba8136d95cd04f10e74ab43901cf39b5b936cc7acb8",
  },
  {
    seriesHex: "30210e",
    category:
      "076bec7bd4a15ff4b9bd49d34a2d2096fa158ab97adc697cf6482c0d3c1975c8",
  },
  {
    seriesHex: "18250e",
    category:
      "1563ee90b05893b7e90340732cb2ab5071ce6f8590feda7b1bcf536f59953e36",
  },
  {
    seriesHex: "00290e",
    category:
      "10e42bbc6ebed71bbd021ca238b479e3a15e90b295b63b246974bfb598982c4d",
  },
  {
    seriesHex: "e82c0e",
    category:
      "79a48064600e68b36ecedcbd5315fff5572576bf038ebbf5d6ddc54b0f411edb",
  },
  {
    seriesHex: "b8340e",
    category:
      "2c8d115341c2f0cce4c21034e11308ea17acf612548c211ef56bbd4e993d8eaf",
  },
  {
    seriesHex: "a0380e",
    category:
      "8825efd15c4a3f407c477b52d3e3ccd0d20f79d543dccc178a05a5a6ec4e95e1",
  },
  {
    seriesHex: "883c0e",
    category:
      "6dfd3dd2586671fa49ea35e0b411e711c4b0b2d81ba2dfa9069225290449d2c7",
  },
  {
    seriesHex: "70400e",
    category:
      "8c21209f83685bc6cbe8adeb809a6a2e4c743a987608a262680d492e12fa3456",
  },
  {
    seriesHex: "58440e",
    category:
      "8b7f2755c522f06cb3de2a921b236f94e40f40d1e590e2b4a25d709b4a89e9e6",
  },
  {
    seriesHex: "40480e",
    category:
      "e2f7333f3b20243e58d63dd894b89d9eb8d6a88fd17f86676689f4fc0e30e082",
  },
  {
    seriesHex: "284c0e",
    category:
      "4304b54c8b217d58a7d2c62d3941811a6a6e86e027ea46fc548fdc74107e5928",
  },
  {
    seriesHex: "10500e",
    category:
      "b675520e9b828c8a16f1acc8f7396c36f67bd616283ffd759e9ad89fc91ab421",
  },
  {
    seriesHex: "f8530e",
    category:
      "9bd91f3c1c255f8a3839287160c2718100a8fbd320906bc7e8fae4b80a9491a7",
  },
  {
    seriesHex: "c85b0e",
    category:
      "609c121384f469657fcff4768ea81abc35cbc0664e0c4930a49af34e1b1f117d",
  },
  {
    seriesHex: "b05f0e",
    category:
      "fc552c7600bddf806cf70a43db497de0444312e972bbe0e5cc91bc0ca5c27f9c",
  },
  {
    seriesHex: "98630e",
    category:
      "56ebf2117caf4a7906f0de14198a40bec3243f4ee3e59e59308c7d4ab064adf6",
  },
  {
    seriesHex: "80670e",
    category:
      "f81ca1e0b315c2ca2f1278ec052bbf2d7cbcbc21dd0146512ef0eca33872c6a3",
  },
  {
    seriesHex: "686b0e",
    category:
      "33226b6126b666635a6c40ab104a3b313248f6422d0ed96493c8068af83df2ce",
  },
  {
    seriesHex: "506f0e",
    category:
      "e5b30ed135b1a8c4884b72c5bbf58357c3095880d2d82faaf55673f574069977",
  },
  {
    seriesHex: "38730e",
    category:
      "281b06dda54ec91628986ff9881569f9eb66caddb5f2e560dd1fead5fc7af9d5",
  },
  {
    seriesHex: "20770e",
    category:
      "c49130a6b5e71959a7bba89aa1109357c2b31079976a50e348ee800b670fe3a9",
  },
  {
    seriesHex: "087b0e",
    category:
      "7f2a81b1c67891e4932dd4491e290a32e95db022590e67d601ccf0fa1b6e009d",
  },
  {
    seriesHex: "d8820e",
    category:
      "fd4e8d0419f0db4d29ec2f87ea6d4ab2dd53cdfb4161cec85e7a371ca5e15d21",
  },
  {
    seriesHex: "c0860e",
    category:
      "81fe6b90f20d432c8a132b94afcd05dacfbeef5f0cd81ab7bdb5161b5a799f2d",
  },
  {
    seriesHex: "a88a0e",
    category:
      "2473ef8a484a8f9fc301e4564176e18ec763694814191d5a2572aa227d972d9f",
  },
  {
    seriesHex: "908e0e",
    category:
      "c52ae4969cb658fa14dad5e740b4bbb0634d78d54f424583901f3111ef1ab0c1",
  },
  {
    seriesHex: "78920e",
    category:
      "a416fd7ab1c2b09f93936b85e4e47fbdc0289e330e21a269ab4f5d8ffea53820",
  },
  {
    seriesHex: "60960e",
    category:
      "4b17351c0b18675a59ab9813486097ee77151df43bd91ec8161dc9fb8f71af42",
  },
  {
    seriesHex: "489a0e",
    category:
      "29b6f97ff15d2335c1fb2edb341606a3a6d0a6a0611a027812e9d280e9325244",
  },
  {
    seriesHex: "309e0e",
    category:
      "fb73bd73fdb0b81c161e6f3b26213f6a8ef678bdb2ab03261f350038a5f167aa",
  },
  {
    seriesHex: "18a20e",
    category:
      "17087e7739a1f2de923939984e489ed96941583655d7599c006fc259a0854208",
  },
  {
    seriesHex: "e8a90e",
    category:
      "1729bbb68107953a8742137249e89db6bc6658987539d70976059700ec1683f3",
  },
];

function asBcmrEntry(time, category) {
  return {
    "2024-10-14T00:00:00.000Z": {
      name: "Future BCH " + time.toLocaleString(),
      description:
        "A fungible token redeemable for Bitcoin Cash after block " +
        time.toLocaleString(),
      token: {
        category: category,
        decimals: 8,
        symbol: `FBCH-${String(time).padStart(7, "0")}`,
      },
      uris: {
        icon: `${getFbchIconSvgUri(time, 400)}`,
        web: `https://futurebitcoin.cash/v?block=${time}`,
      },
    },
  };
}

let bcmr = series
  .map((s) => {
    let time = Number(vmNumberToBigInt(hexToBin(s.seriesHex)));
    return {
      time: time,
      category: s.category,
    };
  })
  .sort((a, b) => a.time - b.time)
  .map((s) => {
    return {
      key: s.category,
      val: asBcmrEntry(s.time, s.category),
    };
  });

bcmr = bcmr.reduce((map, obj) => ((map[obj.key] = obj.val), map), {});

//console.log(JSON.stringify(bcmr, undefined, 2));

let catMap = series
.map((s) => {
  let time = Number(vmNumberToBigInt(hexToBin(s.seriesHex)));
  return {
    time: time,
    category: s.category,
  };
})
.sort((a, b) => a.time - b.time)
.map((s) => {
  return [ s.time, s.category]
  }
)//.reduce((map, obj) => ((map[obj.key] = obj.val), map), {});;

console.log(JSON.stringify(catMap, undefined, 2))