const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
    title: String,
    image: String,
    username: String,
    description: String,
    colorPalette: [String],
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

module.exports = mongoose.model('Artwork', ArtworkSchema);