const router = require('express').Router();
const categoryService = require('../services/categoryService');

function getCategories(req, res) {
    categoryService.getAll()
        .then(categories => {
            res.success({ categories });
        })
        .catch(err => res.error(err));
}

function createCategory(req, res) {
    const category = req.body;
    categoryService
        .create(category)
        .then(newCategory => res.success({ category: newCategory }, 'Category successfully created.'))
        .catch(err => res.error(err));
}

router
    .get('/', getCategories)
    .post('/', createCategory);

module.exports = router;