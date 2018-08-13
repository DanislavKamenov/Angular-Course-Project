const router = require('express').Router();
const memeService = require('../services/memeService');

function getMemes(req, res) {
    const criteria = req.query.filter || {};

    memeService
        .get(criteria, null, 'category')
        .then(memes => res.success({ memes }))
        .catch(res.error);
}

function getOneMemeById(req, res) {
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
                isAdmin: '1',
                isSilenced: '1',
                isBanned: '1'
            }
        }
    }];

    memeService
        .getOne({ _id: id }, null, populate)
        .then(meme => {
            meme.comments.sort((a, b) => b.createdOn - a.createdOn);
            res.success({ meme });
        })
        .catch(res.error);
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
    .get('/:id', getOneMemeById)
    .post('/vote', voteMeme);

module.exports = router;