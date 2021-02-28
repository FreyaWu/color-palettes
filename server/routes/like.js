const likeRouter = require('express').Router();
const { model } = require('mongoose');
const User = require('../models/user');
const Palette = require('../models/palette');

const Like = model('Like'); 

const requireLogin = require("../middlewares/requireLogin");

likeRouter.post('/:paletteId', async (req, res) => {
    const {paletteId} = req.params;
    // const likes = await Like.find({});
    // const {author, palette} = req.body;
    
    const doesLikeExist = await Like.exists({
        palette: paletteId,
        user: req.user._id,
    });

    if (doesLikeExist) return res.send("um no");
    const newLike = await new Like({
        author: req.user.id,
        post: paletteId,
    }).save();
    res.send(newLike);
});

likeRouter.get("/:paletteId/count", async (req, res) => {
    const { paletteId } = req.params;
    const numLikes = await Like.find({ post: paletteId }).countDocuments();
    res.send(numLikes.toString());
});

module.exports = likeRouter;