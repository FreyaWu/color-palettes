const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Artwork = require('./models/artwork');

mongoose.connect('mongodb://localhost:27017/color-palette', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
});

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('Welcome to homepage!');
})

app.get('/colors', (req, res) => {
    res.send('Color page');
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})
