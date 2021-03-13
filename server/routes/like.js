const likeRouter = require('express').Router();
const { model } = require('mongoose');
const User = require('../models/user');
const Palette = require('../models/palette');
const Like = model('Like'); 

const requireLogin = require("../middlewares/requireLogin");

likeRouter.post('/:paletteId', requireLogin, async (req, res) => {
    const {paletteId} = req.params;
    
    const doesLikeExist = await Like.exists({
        palette: paletteId,
        user: req.user.id,
    });

    if (doesLikeExist) return res.send("You've already liked this palette");
    const newLike = await new Like({
        user: req.user.id,
        palette: paletteId,
    }).save();
    res.send(newLike);
});

likeRouter.get('/:paletteId', requireLogin, async (req, res) => {
    const {paletteId} = req.params;
    const doesLikeExist = await Like.exists({
        palette: paletteId,
        user: req.user.id,
    });
    res.send(doesLikeExist);
});

likeRouter.delete('/:paletteId', requireLogin, async (req, res) => {
    const {paletteId} = req.params;
    await Like.findOneAndDelete({
        palette: paletteId,
        user: req.user.id,
    });
    res.json({});
});

likeRouter.get("/:paletteId/count", async (req, res) => {
    const { paletteId } = req.params;
    const numLikes = await Like.find({ palette: paletteId }).countDocuments();
    res.send(numLikes.toString());
});

module.exports = likeRouter;