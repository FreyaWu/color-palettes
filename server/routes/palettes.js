const palettesRouter = require('express').Router();
const { model } = require('mongoose');

const Palette = model('Palette'); //same with const Artwork = require('./models/artwork');
const Like = model('Like');

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
    const { colors, image, views } = req.body;
    const palette = new Palette({
        author: user,
        size: colors.length,
        image: image,
        colors: colors,
        views: views
    })
    await palette.save();
    res.send(palette);
});

palettesRouter.get('/:paletteId/views', async (req, res) => {
    const { paletteId } = req.params;
    const palette = await Palette.findById(paletteId);
    res.send(palette.views.toString());
})

palettesRouter.patch('/:paletteId/views', async (req, res) => {
    const { paletteId } = req.params;
    const { views } = req.body;
    const palette = await Palette.findOneAndUpdate({ _id: paletteId }, { $set: { views: views } });
    res.send(palette.views.toString());
})

palettesRouter.patch('/:paletteId/edit', async (req, res) => {
    const { paletteId } = req.params;
    const palette = await Palette.updateOne({ _id: paletteId }, { $set: { ...req.body } });
    res.send(palette);
    res.json({});
});

palettesRouter.delete('/:paletteId', async (req, res) => {
    const { paletteId } = req.params;
    await Palette.findByIdAndDelete(paletteId);
    await Like.find({ palette: paletteId }).remove();
    res.json({});
})

module.exports = palettesRouter;