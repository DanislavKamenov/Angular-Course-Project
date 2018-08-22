const User = require('../models/User');
const Comment = require('../models/Comment');
const memeService = require('./memeService');
const crud = require('../infrastructure/crud');

const userCrud = crud(User);

module.exports = {
    create: (newUser) =>
        new Promise((resolve, reject) => {
            userCrud
                .create(newUser)
                .then(resolve)
                .catch(reject);
        }),
    getAll: (options, populate) =>
        new Promise((resolve, reject) => {
            userCrud
                .getAll(options, populate)
                .then(resolve)
                .catch(reject);
        }),
    get: (query, options, populate) =>
        new Promise((resolve, reject) => {
            userCrud
                .get(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    getOne: (query, options, populate) =>
        new Promise((resolve, reject) => {
            userCrud
                .getOne(query, options, populate)
                .then(resolve)
                .catch(reject);
        }),
    update: (query, updatedEntity, options) =>
        new Promise((resolve, reject) => {
            userCrud
                .update(query, updatedEntity, options)
                .then(resolve)
                .catch(reject);
        }),
    removeOne: (query) => {
        return new Promise((resolve, reject) => {
            userCrud
                .getOne(query)
                .then(user => {
                    memeService
                        .get({ creator: user._id })
                        .then(memes => {
                            const promises = [];
                            memes.forEach(m => {
                                promises.push(memeService.removeOne({_id: m._id}));
                            });

                            Promise
                                .all(promises)
                                .then(() => {
                                    user.remove()
                                        .then(() => resolve(user))
                                        .catch(reject);
                                })
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        }
        );
    }
};