const authRouter = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

authRouter.post('/', async (req, res) => {
    console.log(req.body);
    const {email, username, password} = req.body;
    
    const user = await User({ email, username});
    const registeredUser = await User.register(user, password);
    res.send(registeredUser);
})

authRouter.post('/login', passport.authenticate('local'), async (req, res) => {
    res.send('Success');
})
    
authRouter.get('/current-user', (req, res) => {
    res.sendStatus(req.user ? 200 : 401);
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// authRouter.get(
//     "/github/callback",
//     passport.authenticate("github", { failureRedirect: "/" }),
//     (req, res) => res.redirect("/")
// );

// authRouter.get("/current-user", (req, res) =>
//     response.send(req.user)
// );

// authRouter.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect("/");
// });

module.exports = authRouter;