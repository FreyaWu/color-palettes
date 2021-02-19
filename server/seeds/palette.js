const mongoose = require('mongoose');
const Color = require('color');

require('../models/palette');

mongoose.connect('mongodb://localhost:27017/color-palette', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

const Palette = mongoose.model('palettes');
const sampleColor = (size) => {
    let colors = [];
    for (let i = 0; i < size; i++) {
        const randomR = Math.floor(Math.random() * 255);
        const randomG = Math.floor(Math.random() * 255);
        const randomB = Math.floor(Math.random() * 255);
        const color = Color.rgb(randomR, randomG, randomB);
        colors.push(color);
    }
    colors = colors.sort(function (a, b) {
        // return a.lightness() - b.lightness();
        return (0.2126*a.red() + 0.7152*a.green() + 0.0722*a.blue())-(0.2126*b.red() + 0.7152*b.green() + 0.0722*b.blue());
    });
    return colors;
}


    // Summing the channels does not calculate brightness, so this is incorrect:
    // return rgb[0] + rgb[1] + rgb[2];

    // To calculate relative luminance under sRGB and RGB colorspaces that use Rec. 709:
//     return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
//   }

//   colors.sort(function (a, b) {
//     return sumColor(a) > sumColor(b);
//   }).reverse();

// const rgbToHsl = (c) => {
//     let r = c[0]/255, g = c[1]/255, b = c[2]/255;
//     let max = Math.max(r, g, b), min = Math.min(r, g, b);
//     let h, s, l = (max + min) / 2;

//     if(max == min) {
//       h = s = 0; // achromatic
//     } else {
//         let d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch(max){
//             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//             case g: h = (b - r) / d + 2; break;
//             case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//     }
//     let newArray = Array(h * 360, s * 100, l * 100);
//     return sortByHue(newArray);
// }

// const sortByHue = (array) => {
//     array.map(function(c, i) {
//         // Convert to HSL and keep track of original indices
//         return {color: rgbToHsl(c), index: i};
//     }).sort(function(c1, c2) {
//         // Sort by hue
//         return c1.color[0] - c2.color[0];
//     }).map(function(data) {
//         // Retrieve original RGB color
//         return array[data.index];
//     });
// }


const seedDB = async () => {
    await Palette.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const size = Math.floor(Math.random() * 10) + 1;
        const palette = new Palette({
            title: "color",
            size: size,
            colors: sampleColor(size)
        })
        await palette.save();
    }
}

seedDB().then(() => {
    console.log("Successfully injected seeds data.");
    mongoose.connection.close();
})