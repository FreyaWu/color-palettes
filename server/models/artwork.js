
const { Schema, model } = require('mongoose');

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

model('artworks', ArtworkSchema);
