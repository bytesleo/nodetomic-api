'use strict';

//Required
const express = require('express');
const passport = require('passport');
const config = require('../../config');
const User = require('../../api/user/user.model');

//Call back Social Network

passport.serializeUser((user, done) => {
    done(null, user); // req.user
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

//init
require('./local/passport').setup(User, config);
require('./github/passport').setup(User, config);
// require('./twitter/passport').setup(User, config);
// require('./facebook/passport').setup(User, config);
// require('./google/passport').setup(User, config);
// require('./bitbucket/passport').setup(User, config);

//Router
const router = express.Router();

//Rest Api

router.use('/local', require('./local'));
router.use('/github', require('./github'));
router.use('/twitter', require('./twitter'));
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));
router.use('/bitbucket', require('./bitbucket'));

module.exports = router;
