const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Artwork = require('./models/artwork');

const app = express();

mongoose.connect('mongodb://localhost:27017/color-palette', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('Welcome to homepage!');
})

app.get('/artworks', async (req, res) => {
    const artworks = await Artwork.find({});
    res.send(artworks);
})

app.get('/artworks/new', (req, res) => {// this route is to render a 'NEW' form

})

app.get('/artworks/:id', async (req, res) => {
    const {id} = req.params;
    const artwork = await Artwork.findById(id);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(artwork));
})

app.post('/artworks', async (req, res) => {// later will take user's data from the 'NEW' form
    res.send(req.body);
    const artwork = new Artwork(req.body.artwork);
    await artwork.save();
})

app.get('/artworks/:id/edit', async (req, res) => {// this route is to render an 'EDIT' form

})

app.put('/artworks/:id', async (req, res) => {// later will take user's data from the ‘EDIT’ form
    const {id} = req.params;
    const updatedArtwork = await Artwork.findByIdAndUpdate(id, {...req.body.artwork});
    console.log(updatedArtwork);
})

app.delete('/artworks/:id', async (req, res) => {
    const {id} = req.params;
    await Artwork.findByIdAndDelete(id);
    res.send('The artwork has been deleted.')
})

app.listen(8080, () => {
    console.log('Serving on port 8080');
})
