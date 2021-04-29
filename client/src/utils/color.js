import tinyColor from 'tinycolor2';

const isValidHex = (hex) => {
    if (hex === 'transparent') {
        return true
    }
    // disable hex4
    const lh = (String(hex).charAt(0) === '#') ? 1 : 0
    return hex.length !== (4 + lh) && tinyColor(hex).isValid();
}

const randomRGBA = () => {
    return {
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
        a: 1,
    }
}

const toRgbString = rgb => {
    rgb = rgb.a ? rgb : { ...rgb, a: 1 };
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
}

export default {
    isValidHex,
    randomRGBA,
    toRgbString,
};