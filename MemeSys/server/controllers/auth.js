const express = require('express');
const passport = require('passport');
const validator = require('validator');

const router = new express.Router();

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
        isFormValid = false;
        errors.password = 'Password must be at least 3 characters long.';
    }

    if (!payload || typeof payload.repeatPassword !== 'string' || payload.repeatPassword.trim().length < 3) {
        isFormValid = false;
        errors.password = 'Password must be at least 3 characters long.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (payload.password !== payload.repeatPassword) {
        isFormValid = false;
        errors.password = 'Passwords do not match.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/signup', (req, res, next) => {
    console.log(req.body);
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.error(validationResult.message, 401, validationResult.errors);
    }

    return passport.authenticate('local-signup', (err, token) => {
        if (err) {
            return res.error(err, 401);
        }

        const message = 'You have successfully signed up! Now you should be able to log in.';
        return res.success({ token }, message);
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.error(validationResult.message, 401, validationResult.errors);
    }

    return passport.authenticate('local-login', (err, token) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.error(err, 401);
            }

            const message = 'Could not process the form.';
            return res.error(message, 401);
        }

        const message = 'You have successfully logged in!';
        return res.success({ token }, message);
    })(req, res, next);
});

module.exports = router;
