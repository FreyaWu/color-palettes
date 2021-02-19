
const registerRouter = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: true })
);