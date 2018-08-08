const Category = require('../models/Category');
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
    removeOne: (query, options) => 
        new Promise((resolve, reject) => {
            categoryCrud
                .removeOne(query, options)
                .then(resolve)
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