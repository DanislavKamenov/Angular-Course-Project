const router = require('express').Router();
const memeService = require('../services/memeService');

function getMemes(req, res) {
    const criteria = req.query.filter || {};
    const skip = +req.query.skip || null;
    const limit = +req.query.limit || null;

    memeService
        .get(criteria, {sort: { createdOn: -1 }, skip: skip * limit, limit: limit }, 'category')
        .then(memes => {
            res.success({ memes });
        })
        .catch(err => res.error(err));
}

function getMemesByUpvotes(req, res) {
    const sort = +req.params.sort;
    const skip = +req.params.skip;
    const limit = +req.params.limit;

    memeService
        .getAll({ sort: { votes: sort }, skip: skip * limit, limit: limit }, 'category')
        .then(memes => {
            res.success({ memes });
        })
        .catch(err => res.error(err));
}

function getFreshMemes(req, res) {
    const sort = +req.params.sort;
    const skip = +req.params.skip;
    const limit = +req.params.limit;

    memeService
        .getAll({ sort: { createdOn: sort }, skip: skip * limit, limit: limit }, 'category')
        .then(memes => {
            res.success({ memes });
        })
        .catch(err => res.error(err));
}

function getMemeById(req, res) {
    const id = req.params.id;
    const populate = [{
        path: 'comments',
        model: 'Comment',
    }, {
        path: 'comments',
        populate: {
            path: 'creator',
            model: 'User',
            select: {
                _id: '1',
                name: '1',
                avatar: '1',
                roleNames: '1',
                isAdmin: '1'
            }
        }
    }];

    memeService
        .getOne({ _id: id }, null, populate)
        .then(meme => {
            meme.comments.sort((a, b) => b.createdOn - a.createdOn);
            res.success({ meme });
        })
        .catch(err => res.error(err));
}

function createMeme(req, res) {
    const meme = req.body;

    memeService
        .create(meme)
        .then(newMeme => res.success({ meme: newMeme }, 'Meme successfully created.'))
        .catch(err => res.error(err));
}

function deleteMemeById(req, res) {
    const memeId = req.params.id;

    memeService
        .removeOne(memeId)
        .then(oldMeme => res.success({ meme: oldMeme }, 'Meme successfully deleted.'))
        .catch(err => res.error(err));

}

function voteMeme(req, res) {
    const userId = req.body.userId;
    const memeId = req.body.memeId;
    const voteType = req.body.type;

    memeService
        .getOne({ _id: memeId })
        .then(meme => {
            if (voteType === 'up') {
                if (!meme.upVoted.includes(userId)) {
                    meme.downVoted.remove(userId);
                    meme.upVoted.push(userId);
                    meme.votes = meme.upVoted.length - meme.downVoted.length;
                }
            } else if (voteType === 'down') {
                if (!meme.downVoted.includes(userId)) {
                    meme.upVoted.remove(userId);
                    meme.downVoted.push(userId);
                    meme.votes = meme.upVoted.length - meme.downVoted.length;
                }
            }
            meme.save();
            res.success({ meme });
        })
        .catch(err => res.error(err));
}

router
    .get('', getMemes)
    .get('/:id', getMemeById)
    .get('/vote/:sort/:skip/:limit', getMemesByUpvotes)
    .get('/fresh/:sort/:skip/:limit', getFreshMemes)
    .post('/create', createMeme)
    .delete('/:id', deleteMemeById)
    .post('/vote', voteMeme);

module.exports = router;