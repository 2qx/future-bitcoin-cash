
const colorCodes = [
    "0500",
    "01966424dd",
    "01ff0000dd",
    "01ff7500dd",
    "01cccc00dd",
    "0100ff00dd",
    "010000ffdd",
    "01ff00ffdd",
    "01888888dd",
    "05ff"
]

const xmlCodes = [
    "000",
    "966424",
    "f00",
    "ff7500",
    "cc0",
    "0f0",
    "00f",
    "f0f",
    "888",
    "fff"
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

    const svgString = `<svg 
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style="width:` + size + `px; height:` + size + `px;">
    <path d="M 1 1 L 1 15 15 15 15 1 Z" 
          style="stroke-width:2;stroke-linejoin:miter;stroke-linecap:butt;stroke:#ffffff;fill:#` + xmlCodes[places[0]] + `; 
          paint-order:stroke;">
    </path>
    <path d="M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z" style="fill:#ffffff;"></path>
    <path d="M 2 8 L 2 15 5 15 5 8 Z" style="fill:#` + xmlCodes[places[1]] + `;"></path>
    <path d="M 6 7 L 6 15 14 15 14 7 Z" style="fill:#` + xmlCodes[places[3]] + `;"></path>
    <path d="M 6 2 L 6 6 14 6 14 2 Z" style="fill:#` + xmlCodes[places[2]] + `;"></path>
    </svg>`
    return svgString
}

export function getFbchIconSvgUri(n: number, size = 400): string {

    const places = [...Math.floor(n / 1000).toString().padStart(4, '0')].map((a, i) => Number(a))

    return `data:image/svg+xml,` +
        `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' style='width:` + size + `px; height: ` + size + `px;'%3E` +
        `%3Cpath d='M 1 1 L 1 15 15 15 15 1 Z' ` +
        `style='stroke-width: 2px; stroke-linejoin: miter; stroke-linecap: butt; stroke: %23fff; fill:%23` + xmlCodes[places[0]] + `; ` +
        `paint-order:stroke'` +
        `%3E%3C/path%3E` +
        `%3Cpath d='M 2 2 L 5 2 5 3 3 3 3 4 4 4 4 5 3 5 3 7 2 7 Z' style='fill: %23fff;'%3E%3C/path%3E` +
        `%3Cpath d='M 2 8 L 2 15 5 15 5 8 Z' style='fill: %23` + xmlCodes[places[1]] + `;'%3E%3C/path%3E` +
        `%3Cpath d='M 6 7 L 6 15 14 15 14 7 Z' style='fill:%23` + xmlCodes[places[3]] + `;'%3E%3C/path%3E` +
        `%3Cpath d='M 6 2 L 6 6 14 6 14 2 Z' style='fill:%23` + xmlCodes[places[2]] + `;'%3E%3C/path%3E%3C/svg%3E`
}
