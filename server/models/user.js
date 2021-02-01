const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema( {
    email: {
        type: String,
        require: true,
        unique: true
    }
});
UserSchema.plugin(passportLocalMongoose);//will add on to UserSchema a username and a field for password

module.exports = mongoose.model('User', UserSchema);