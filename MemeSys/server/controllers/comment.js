const router = require('express').Router();
const commentService = require('../services/commentService');

function createComment(req, res) {
    const { creator, content, query } = req.body;

    commentService
        .create({ creator, content }, query.id)
        .then(comment => {
            commentService
                .getOne({ _id: comment._id }, null, 'creator')
                .then(populatedComment => {
                    res.success({ comment: populatedComment }, 'Comment created successfully!');
                })
                .catch(err => {
                    res.error(err)
                    console.log(err);
                });
        })
        .catch(err => {
            res.error(err)
            console.log(err);
        });
}

function editComment(req, res) {
    const commentId = req.params.commentId;
    const content = req.body.content;
    commentService
        .update({ _id: commentId }, { content }, { new: true })
        .then(newComment => {
            res.status(200).json({
                success: true,
                message: 'Comment edited.',
                newComment
            });
        })
        .catch(err => {
            res.error(err)
            console.log(err);
        });
}

function deleteComment(req, res) {
    const commentId = req.params.commentId;

    commentService
        .removeOne({ _id: commentId })
        .then(oldComment => {
            res.success({ comment: oldComment }, 'Comment deleted.');
        })
        .catch(err => {
            res.error(err)
            console.log(err);
        });
}

router
    .post('', createComment)
    .post('/:commentId/edit', editComment)
    .delete('/:commentId', deleteComment);

module.exports = router;