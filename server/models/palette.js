const { Schema, model } = require('mongoose');

const PaletteSchema = new Schema({
    title: String,
    image: String,
    size: Number,
    colors: [String],
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

model('palettes', PaletteSchema);
