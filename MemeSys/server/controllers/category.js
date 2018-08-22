const router = require('express').Router();
const categoryService = require('../services/categoryService');

function getCategories(req, res) {
    categoryService
        .getAll()
        .then(categories => {
            res.success({ categories });
        })
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

function getCategoriesAndMemes(req, res) {
    categoryService
        .getAll(null, 'memes')
        .then(categories => res.success({ categories }))
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

function createCategory(req, res) {
    const category = req.body;
    categoryService
        .create(category)
        .then(newCategory => res.success({ category: newCategory }, 'Category successfully created.'))
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

function deleteCategory(req, res) {
    const catId = req.params.id;

    categoryService
        .removeOne(catId)
        .then(() => res.success({ category: 'null' }, 'Category successfully deleted.'))
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

router
    .get('/', getCategories)
    .get('/memes', getCategoriesAndMemes)
    .post('/', createCategory)
    .delete('/:id', deleteCategory);

module.exports = router;