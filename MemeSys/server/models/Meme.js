const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        default: []
    }],
    votes: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    upVoted: [{
        type: mongoose.SchemaTypes.String,
        default: []
    }],
    downVoted: [{
        type: mongoose.SchemaTypes.String,
        default: []
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

memeSchema.pre('save', function() {
    this.votes = this.upVoted.length - this.downVoted.length;
});

memeSchema.index({
    title: 'text'
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;