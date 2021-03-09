const authRouter = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { model } = require('mongoose');
const User = model('User');
const Like = model('Like'); 
const Palette = model('Palette'); 

authRouter.post('/register', async (req, res) => {
    console.log(req.body);
    const {email, username, password} = req.body;
    
    const user = await User({ email, username});
    const registeredUser = await User.register(user, password);
    res.send(registeredUser);
})

authRouter.post('/login', passport.authenticate('local'), async (req, res) => {
    res.send(req.user);
})
    
authRouter.get('/current-user', (req, res) => {
    res.send(req.user);
});

authRouter.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const likes = await Like.find({ user : userId });
    // res.send(likes);
    let palettes = [];
    for (let like of likes) {
        console.log(like);
        const palette = await Palette.findById(like.palette)
        palettes.push(palette);
    }
        // console.log(await Palette.findById(like.palette))
    res.send(palettes);
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = authRouter;