const registerRouter = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

registerRouter.post('/register', async (req, res) => {
    const {email, username, password} = req.body;
    const user = await User({ email, username});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
})

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

module.exports = registerRouter;