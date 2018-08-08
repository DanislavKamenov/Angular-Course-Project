const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    icon: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    memes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Meme',
        default: []
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;