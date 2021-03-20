if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const environment = process.env.NODE_ENV || 'development'; //determine under production or development environment
const dbUrl = environment === 'development' ? 'mongodb://localhost:27017/color-palette' : process.env.DB_URL;

// same with const Palette = require('./models/palettes');
require('./models/palette');
require('./models/like');
// require('./models/User');

require('mongoose').connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: process.env.SECRET || "This is a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //the authenticate() method comes from passport 

passport.serializeUser(User.serializeUser()); //store user, method also automatically added in
passport.deserializeUser(User.deserializeUser()); //unstore user


const artworksRouter = require('./routes/artworks');
const palettesRouter = require('./routes/palettes');
const authRouter = require('./routes/auth');
const likeRouter = require('./routes/like');
const userRouter = require('./routes/user');

app.use('/api/artworks', artworksRouter);
app.use('/api/palettes', palettesRouter);
app.use('/api/auth', authRouter);
app.use('/api/like', likeRouter);
app.use('/api/user', userRouter);


app.get('/', (req, res) => {
    res.send('Welcome to homepage!');
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});