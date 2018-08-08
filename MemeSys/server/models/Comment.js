const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.String,
        ref: 'User',
        required: true,
    },
    content: {
        type: mongoose.SchemaTypes.String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    meme: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'Meme',
        required: true
    } 
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;