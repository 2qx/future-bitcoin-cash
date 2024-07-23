
const colorCodes = [
    "0500",
    "01966424dd",
    "01ff0000dd",
    "01ff7500dd",
    "01ffff00dd",
    "0100ff00dd",
    "010000ffdd",
    "01ff00ffdd",
    "01888888dd",
    "05ff"
]

export function getHvifIconHex(n: number, testnet = false): string {
    const places = [... Math.floor(n / 1000).toString().padStart(4, '0')].map((a, i) => Number(a))
                        //    TestFuture                                         Future
    const letter = testnet ? "06096e4400282850542c74d03bbebb34282c303c2c2c28" : "0a0a28283428342c2c2c2c30303030342c342c3c283c";

    const hexString = "6e63696605" +
        colorCodes[places[0]] +
        "05ff" +
        colorCodes[places[1]] +
        colorCodes[places[3]] +
        colorCodes[places[2]] +
        "05" +
        "0a042424245c5c5c5c24" +
        letter +
        "0a042840285c345c3440" +
        "0a043828383858385828" +
        "0a04383c385c585c583c" +
        "06" +
        "0a010100100117820003" +
        "0a00010000" +
        "0a01010100" +
        "0a02010200" +
        "0a03010400" +
        "0a04010300";
    return hexString
}



