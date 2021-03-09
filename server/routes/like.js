const likeRouter = require('express').Router();
const { model } = require('mongoose');
const User = require('../models/user');
const Palette = require('../models/palette');
const Like = model('Like'); 

const requireLogin = require("../middlewares/requireLogin");

likeRouter.post('/:paletteId', requireLogin, async (req, res) => {
    const {paletteId} = req.params;
    console.log(paletteId);
    console.log(req.user.id);
    
    const doesLikeExist = await Like.exists({
        palette: paletteId,
        user: req.user.id,
    });

    if (doesLikeExist) return res.send("um no");
    const newLike = await new Like({
        user: req.user.id,
        palette: paletteId,
    }).save();
    res.send(newLike);
});

likeRouter.get("/:paletteId/count", async (req, res) => {
    const { paletteId } = req.params;
    const numLikes = await Like.find({ palette: paletteId }).countDocuments();
    res.send(numLikes.toString());
});

module.exports = likeRouter;