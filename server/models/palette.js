const { Schema, model } = require('mongoose');

const PaletteSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    size: Number,
    image: String,
    colors: [String]
});

model('Palette', PaletteSchema);
