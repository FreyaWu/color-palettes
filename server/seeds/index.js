
const mongoose = require('mongoose');
const Artwork = require('../models/artwork');
const {descriptors, types} = require('./seedHelpers');
const Color = require('color');

mongoose.connect('mongodb://localhost:27017/color-palette', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
});

//const sampleName = array => array[Math.floor(Math.random() * array.length)];
const sampleName = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}


const sampleColor = (array) => {
    for (let i = 0; i < 10; i++) {
        const randomR = Math.floor(Math.random()*255);
        const randomG = Math.floor(Math.random()*255);
        const randomB = Math.floor(Math.random()*255);
        array[i] = Color.rgb(randomR, randomG, randomB);
    }
    return array;
}

const seedDB = async() => {
    await Artwork.deleteMany({});
    for (let i = 0; i < 50; i++) {
        let arr = [];
        const art = new Artwork({
            title: `${sampleName(descriptors)} ${sampleName(types)}`,
            //author: '6013262b7c0602d261a8fefc',
            username: 'Freya',
            description: 'Nec te paulo numquam adipisci, duo ut regione detraxit. Pro te summo ridens utroque.',
            colorPalette: sampleColor(arr)
        })
        await art.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})