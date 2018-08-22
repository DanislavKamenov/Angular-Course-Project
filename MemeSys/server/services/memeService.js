const Meme = require('../models/Meme');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const crud = require('../infrastructure/crud');

const memeCrud = crud(Meme);

module.exports = {
    create: meme =>
        new Promise((resolve, reject) => {
            memeCrud
                .create(meme)
                .then(creationResult => {
                    if (Array.isArray(creationResult)) {
                        const memes = creationResult;
                        const promises = [];

                        memes.forEach(m => {
                            promises.push(Category.findById(m.category)
                                .then(category => {
                                    category.memes.push(m._id);
                                    category.save();
                                })
                                .catch(reject));
                        });

                        Promise
                            .all(promises)
                            .then(() => resolve(memes))
                            .catch(reject);
                    } else {
                        const meme = creationResult;

                        Category.findById(meme.category)
                            .then(category => {
                                category.memes.push(meme._id);
                                category.save();
                                resolve(meme);
                            })
                            .catch(reject);
                    }
                })
                .catch(reject);
        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            memeCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            memeCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            memeCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            memeCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    //Remove functions need to be expanded to handle the DB hierarcy
    removeOne: (query, options) =>
        new Promise((resolve, reject) => {
            memeCrud
                .removeOne(query, options)
                .then(meme => {
                    Comment
                        .remove({ meme: meme._id })
                        .then(() => Category
                            .findById(meme.category)
                            .then(category => {
                                if (category) {
                                    category.memes.remove(meme._id);
                                    try {
                                        category.save()
                                            .then(() => resolve(meme))
                                            .catch(reject);

                                    }
                                    catch (err) {
                                        console.log(err);
                                    }
                                }

                            }).catch(reject))
                        .catch(reject);
                })
                .catch(reject);
        }),
    removeMany: (query) =>
        new Promise((resolve, reject) => {
            memeCrud
                .removeMany(query)
                .then(resolve)
                .catch(reject);
        })
};