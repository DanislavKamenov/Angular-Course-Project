const Comment = require('../models/Comment');
const Meme = require('../models/Meme');
const crud = require('../infrastructure/crud');

const commentCrud = crud(Comment);

module.exports = {
    create: (newComment, memeId) =>
        new Promise((resolve, reject) => {
            Meme.findOne({ _id: memeId })
                .then(meme => {
                    const comment = newComment;
                    comment.meme = meme._id;
                    commentCrud
                        .create(comment)
                        .then(createdComment => {
                            meme.comments.push(createdComment._id);
                            meme.save();
                            resolve(createdComment);
                        })
                        .catch(reject);
                })
                .catch(reject);

        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            commentCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            commentCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            commentCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            commentCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    removeMany: (query) =>
        new Promise((resolve, reject) =>
            commentCrud
                .removeMany(query)
                .then(resolve)
                .catch(reject)
        ),
    removeOne: (query, options) => 
        new Promise((resolve, reject) =>
            Meme
                .findOne({comments: query._id})                
                .then(Meme => {
                    Meme.comments.remove(query._id);
                                        
                    Meme.save();
                    commentCrud
                        .removeOne(query, options)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject)
        )
};