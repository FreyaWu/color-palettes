const palettesRouter = require('express').Router();
const { model } = require('mongoose');
const { default: palette } = require('../../client/src/Services/palette');

const Palette = model('Palette'); //same with const Artwork = require('./models/artwork');

palettesRouter.get('/', async (req, res) => {
    const palettes = await Palette.find({}).populate('author');
    res.send(palettes);
});

palettesRouter.get('/:paletteId', async (req, res) => {
    const { paletteId } = req.params;
    const palette = await Palette.findById(paletteId).populate('author');
    res.send(palette);
});

palettesRouter.post('/', async (req, res) => {
    const user = req.user.id;
    const {colorArray, image} = req.body;
    const palette = new Palette({
        author: user, 
        size: colorArray.length, 
        image: image,
        colors: colorArray
    })
    await palette.save();
    res.send(palette);
});

palettesRouter.patch('/:paletteId', async (req, res) => {
    const { paletteId } = req.params;
    const palette = await Palette.findById(paletteId);
    res.send(palette);
    // await Palette.findByIdAndUpdate(paletteId, { $set: {...req.body} });
    // res.json({});
});

palettesRouter.delete('/:paletteId', async (req, res) => {
    const { paletteId } = req.params;
    const palette = await Palette.findById(paletteId);
    await palette.remove();
    res.json({});//?
})

module.exports = palettesRouter;