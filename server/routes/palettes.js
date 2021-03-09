const palettesRouter = require('express').Router();
const { model } = require('mongoose');

const Palette = model('Palette'); //same with const Artwork = require('./models/artwork');

palettesRouter.get('/', async (req, res) => {
    const palettes = await Palette.find({}).populate('author');
    res.send(palettes);
});

palettesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const palette = await (await Palette.findById(id)).populate('author');
    res.send(palette);
});

palettesRouter.post('/', async (req, res) => {
    const user = req.user.id;
    const {colorArray, image} = req.body;
    const palette = new Palette({
        author: user, 
        size: colorArray.length, 
        artwork: image,
        colors: colorArray
    })
    console.log(palette);
    await palette.save();
    res.send(palette);
})

module.exports = palettesRouter;