const userRouter = require('express').Router();
const {model} = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Palette = model('Palette');
const Like = model('Like');

userRouter.get('/palettes', requireLogin, async (req, res) => {
    const authorId = req.user.id;
    // console.log(authorId);
    const palettes = await Palette.find({author: authorId}).populate('author');
    // console.log(palettes);
    res.send(palettes);
})

userRouter.get('/liked', requireLogin, async (req, res) => {
    const authorId = req.user.id;
    const likes = await Like.find({user : authorId});
    const palettes = [];
    for (let like of likes) {
        const palette = await Palette.findById(like.palette).populate('author');
        palettes.push(palette);
    }
    res.send(palettes);
})

module.exports = userRouter;