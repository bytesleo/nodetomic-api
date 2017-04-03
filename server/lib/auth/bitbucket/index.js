'use strict';

const express = require('express');
const passport = require('passport');
const auth = require('../service');

const router = express.Router();

router.get('/', passport.authenticate('bitbucket')).get('/callback', passport.authenticate('bitbucket', {
    failureRedirect: '/signup',
    session: false
}), (req, res) => {
    auth.start(req, res, 'social');
});

module.exports = router;
