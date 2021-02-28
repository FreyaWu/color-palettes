const { Schema, model } = require('mongoose');

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    palette: {
        type: Schema.Types.ObjectId,
        ref: 'Palette'
    }
});

model('Like', LikeSchema);