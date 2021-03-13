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

const Palette = mongoose.model('Palette');
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

const seedDB = async () => {
    await Palette.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const size = Math.floor(Math.random() * 10) + 1;
        const palette = new Palette({
            author: '6034a5989fe3e86efe4688fd',
            title: "color",
            size: size,
            image:'https://source.unsplash.com/collection/9248817',
            colors: sampleColor(size)
        })
        await palette.save();
    }
}

seedDB().then(() => {
    console.log("Successfully injected seeds data.");
    mongoose.connection.close();
})