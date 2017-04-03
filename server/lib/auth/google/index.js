'use strict';

const express = require('express');
const passport = require('passport');
const auth = require('../service');

const router = express.Router();

router.get('/', passport.authenticate('google')).get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
}), (req, res) => {
    auth.start(req, res, 'social');
});

module.exports = router;
