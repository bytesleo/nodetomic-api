'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth');

var router = express.Router();

router
        .get('/', passport.authenticate('bitbucket'))

        .get('/callback', passport.authenticate('bitbucket', {
            failureRedirect: '/signup',
            //session:false
        }), function (req, res) {
            auth.init(req, res, 'socialnetwork');
        });

module.exports = router;