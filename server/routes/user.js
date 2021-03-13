const userRouter = require('express').Router();
const {model} = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Palette = model('Palette');
const Like = model('Like');

userRouter.get('/palettes', requireLogin, async (req, res) => {
    const authorId = req.user.id;
    const palettes = Palette.find({author: authorId}).populate('author');
})

userRouter.get('/liked', requireLogin, async (req, res) => {
    const authorId = req.user.id;
    const likes = Like.find({author: authorId});
    const palettes = [];
    for (let like of likes) {
        const palette = await Palette.findById(like.Palette);
    }
    palettes.push(palette);
    res.send(palettes);
})

module.exports = userRouter;