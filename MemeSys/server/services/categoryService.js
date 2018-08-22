const Category = require('../models/Category');
const Meme = require('../models/Meme');
const memeService = require('./memeService');
const crud = require('../infrastructure/crud');

const categoryCrud = crud(Category);

module.exports = {
    create: category =>
        new Promise((resolve, reject) => {
            categoryCrud
                .create(category)
                .then(resolve)
                .catch(reject);
        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            categoryCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            categoryCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            categoryCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            categoryCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    //Remove functions need to be expanded to handle the DB hierarcy
    removeOne: (id, options) =>
        new Promise((resolve, reject) => {
            Meme.find({ category: id })
                .then(memes => {
                    const promises = memes.map(m => memeService.removeOne({ _id: m._id }));

                    Promise
                        .all(promises)
                        .then(() =>
                            Category
                                .remove({ _id: id })
                                .then((deleteCount) => resolve(id))
                                .catch(reject))
                        .catch(reject);
                })
                .catch(reject);
        }),
    removeMany: (query) =>
        new Promise((resolve, reject) => {
            categoryCrud
                .removeMany(query)
                .then(resolve)
                .catch(reject);
        })
};