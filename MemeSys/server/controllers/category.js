const router = require('express').Router();
const categoryService = require('../services/categoryService');

function getCategories(req, res) {
    console.log(res);
    categoryService.getAll()
        .then(categories => {
            res.success({ categories });
        })
        .catch(res.error);
}

router
    .get('/', getCategories);

module.exports = router;