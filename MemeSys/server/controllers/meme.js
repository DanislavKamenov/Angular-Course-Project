const router = require('express').Router();
const memeService = require('../services/memeService');

function getAllMemes(req, res) {
    memeService
        .getAll()
        .then(memes => res.success({ memes }))
        .catch(err => res.error(404, err));
}

router
    .get('', getAllMemes);

module.exports = router;