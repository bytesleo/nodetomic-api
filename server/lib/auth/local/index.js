'use strict';

const express = require('express');
const passport = require('passport');
const auth = require('../service');

const router = express.Router();

router.post('/', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {

        var error = err || info;
        if (error)
            return res.status(401).json(error);
        if (!user)
            return res.status(404).json({message: 'Something went wrong, please try again.'});

        req.user = user;

        auth.start(req, res, 'local');

    })(req, res, next);

});

module.exports = router;
