'use strict';

const express = require('express');
const passport = require('passport');
const auth = require('../service');

var router = express.Router();

router.get('/', passport.authenticate('twitter')).get('/callback', passport.authenticate('twitter', {
    //successRedirect: '/api/hello',
    failureRedirect: '/signup',
    session: false
}), (req, res) => {
    auth.start(req, res, 'social');
});

module.exports = router;
