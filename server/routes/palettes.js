const palettesRouter = require('express').Router();
const { model } = require('mongoose');

const Palette = model('palettes'); //same with const Artwork = require('./models/artwork');

palettesRouter.get('/', async (req, res) => {
    const palettes = await Palette.find({});
    res.send(palettes);
});

palettesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const palette = await Palette.findById(id);
    res.send(palette);
});

module.exports = palettesRouter;