'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth');

/* Router */
const router = express.Router();

/* GET api listing. */

router.post('/', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {

        var error = err || info;
        if (error)
            return res.status(401).json(error);
        if (!user)
            return res.status(404).json({message: 'Something went wrong, please try again.'});

        req.user = user;
        auth.init(req, res, 'local');

    })(req, res, next);

});

module.exports = router;