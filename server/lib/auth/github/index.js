'use strict';

const express = require('express');
const passport = require('passport');
const auth = require('../service');

const router = express.Router();

router.get('/', passport.authenticate('github')).get('/callback', passport.authenticate('github', {
    failureRedirect: '/signup',
    session: false
}), (req, res) => {
    auth.start(req, res, 'social');
});

module.exports = router;
