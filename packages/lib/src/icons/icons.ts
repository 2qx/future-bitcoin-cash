
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

const xmlCodes = [
    "#000000",
    "#966424dd",
    "#ff0000dd",
    "#ff7500dd",
    "#ffff00dd",
    "#00ff00dd",
    "#0000ffdd",
    "#ff00ffdd",
    "#888888dd",
    "#ffffff"
]

export function getHvifIconHex(n: number, testnet = false): string {
    const places = [...Math.floor(n / 1000).toString().padStart(4, '0')].map((a, i) => Number(a))
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

export function getFbchIconSvg(n: number, size = 400): string {


    const places = [...Math.floor(n / 1000).toString().padStart(4, '0')].map((a, i) => Number(a))

    // data:image/svg+xml;utf8,
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6528 6528" style="width:` + size + `px; height:` + size + `px;">
    <path d="M 408 408 L 408 6120 6120 6120 6120 408 Z" style="stroke-width:204;stroke-linejoin:miter;stroke-linecap:butt;stroke:#ffffff;fill:none;"></path>
    <path d="M 408 408 L 408 6120 6120 6120 6120 408 Z" style="fill:` + xmlCodes[places[0]] + `;stroke:none;"></path> 
    <path d="M 816 816 L 2040 816 2040 1224 1224 1224 1224 1632 1632 1632 1632 2040 1224 2040 1224 2856 816 2856 Z" style="fill:#ffffff;stroke:none;"></path>
    <path d="M 816 3264 L 816 6120 2040 6120 2040 3264 Z" style="fill:` + xmlCodes[places[1]] + `;stroke:none;"></path>
    <path d="M 2448 2856 L 2448 6120 5712 6120 5712 2856 Z" style="fill:` + xmlCodes[places[3]] + `;stroke:none;"></path>
    <path d="M 2448 816 L 2448 2448 5712 2448 5712 816 Z" style="fill:` + xmlCodes[places[2]] + `;stroke:none;"></path>
    </svg>`
    return svgString
}

