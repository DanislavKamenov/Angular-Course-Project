const router = require('express').Router();
const memeService = require('../services/memeService');

function getAllMemes(req, res) {
    const criteria = req.query.filter || {};

    memeService
        .get(criteria)
        .then(memes => res.success({ memes }))
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
        .catch(res.error);
}

router
    .get('', getAllMemes)
    .post('/vote', voteMeme);

module.exports = router;