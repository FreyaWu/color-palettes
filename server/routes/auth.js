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
    const user = await new User({email, username});
    try {
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        res.send(registeredUser);
    } catch (e) {
        res.status(404).send(error);
    }
    
})

authRouter.post('/login', passport.authenticate('local'), async (req, res) => {
    res.send(req.user);
})
    
authRouter.get('/current-user', (req, res) => {
    res.send(req.user);
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = authRouter;