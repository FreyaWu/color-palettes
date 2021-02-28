const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    }
    
});

UserSchema.plugin(passportLocalMongoose);//will add on to UserSchema a username and a field for password

module.exports = mongoose.model('User', UserSchema);