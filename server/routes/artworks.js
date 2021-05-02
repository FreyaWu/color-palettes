const artworksRouter = require('express').Router();
const { model } = require('mongoose');

const Palette = model('Palette'); //same with const Artwork = require('./models/artwork');

artworksRouter.get('/', async (req, res) => {
    const artworks = await Palette.find({ image: { $ne: "" } }).populate('author');//find all palettes' artwork
    res.send(artworks);
});

artworksRouter.get('/:paletteId', async (req, res) => {
    const { paletteId } = req.params;
    const artwork = await Palette.findById(paletteId).populate('author'); //this won't populate author
    res.send(artwork);

});

module.exports = artworksRouter;