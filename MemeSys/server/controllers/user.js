const router = require('express').Router();
const userService = require('../services/userService');
const generateWebToken = require('../passport/generateWebToken');

function getAllUsers(req, res) {
    userService
        .get({ isAdmin: false })
        .then(users => {
            const usersToSend = users.map(u => (
                {
                    _id: u._id,
                    email: u.email,
                    name: u.name,
                    avatar: u.avatar,
                    roleNames: u.roleNames,
                    isAdmin: u.isAdmin
                }));

            res.success({ users: usersToSend });
        })
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

function getUser(req, res) {
    const userId = req.body.userId;

    userService
        .getOne({ _id: userId })
        .then(user => {
            const userToSend = {
                id: user._id,
                email: user.email,
                name: user.name,
                roleNames: user.roleNames,
                isAdmin: user.isAdmin,
            };

            res.success({ user: userToSend });
        })
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

function removeUser(req, res) {
    const userId = req.params.userId;

    userService
        .removeOne({_id: userId})
        .then(oldUser => {
            res.success({ user: oldUser }, 'User successfuly deleted.');
        })
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

function editUser(req, res) {
    const userId = req.params.userId;
    const userToUpdate = req.body;

    userService
        .update({ _id: userId }, userToUpdate, { new: true })
        .then(newUser => {
            const userToSend = {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar,
                roleNames: newUser.roleNames,
                isAdmin: newUser.isAdmin
            };

            //Implement token refresh on logged in user update.
            // const token = generateWebToken(userToSend);

            res.success( { user: userToSend }, 'User successfully edited.');
        })
        .catch(err => {
            res.error(err);
            console.log(err);
        });
}

router
    .get('/', getAllUsers)
    .get('/:userId', getUser)
    .delete('/:userId', removeUser)
    .put('/:userId', editUser);
module.exports = router;