const artworksRouter = require('express').Router();
const { model } = require('mongoose');

const Artwork = model('artworks'); //same with const Artwork = require('./models/artwork');

artworksRouter.get('/', async (req, res) => {
    const artworks = await Artwork.find({});
    res.send(artworks);
});

artworksRouter.get('/new', (req, res) => {// this route is to render a 'NEW' form

});

artworksRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("backend: " + id);
    const artwork = await Artwork.findById(id);
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(artwork));
});

artworksRouter.post('/', async (req, res) => {// later will take user's data from the 'NEW' form
    res.send(req.body);
    const artwork = new Artwork(req.body.artwork);
    await artwork.save();
});

artworksRouter.get('/:id/edit', async (req, res) => {// this route is to render an 'EDIT' form

});

artworksRouter.put('/:id', async (req, res) => {// later will take user's data from the ‘EDIT’ form
    const { id } = req.params;
    const updatedArtwork = await Artwork.findByIdAndUpdate(id, { ...req.body.artwork });
    console.log(updatedArtwork);
});

artworksRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Artwork.findByIdAndDelete(id);
    res.send('The artwork has been deleted.')
});

module.exports = artworksRouter;