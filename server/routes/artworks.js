const artworksRouter = require('express').Router();
const { model } = require('mongoose');

const Palette = model('Palette'); //same with const Artwork = require('./models/artwork');

artworksRouter.get('/', async (req, res) => {
    const artworks = await Palette.find({}).select("artwork colors" );//find all palettes' artwork
    res.send(artworks);
});

module.exports = artworksRouter;