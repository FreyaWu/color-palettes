const artworksRouter = require('express').Router();
const { model } = require('mongoose');

const Palette = model('Palette'); //same with const Artwork = require('./models/artwork');

artworksRouter.get('/', async (req, res) => {
    const artworks = await Palette.find({}).select("artwork colors author").populate('author');//find all palettes' artwork
    res.send(artworks);
});

artworksRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const artwork = await Palette.findById(id).populate('author'); //this won't populate author
    res.send(artwork);

});

module.exports = artworksRouter;