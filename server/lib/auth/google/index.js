'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth');

var router = express.Router();

router

.get('/', passport.authenticate('google'))

.get('/callback', passport.authenticate('google',{
	failureRedirect: '/signup',
	//session:false
}),function(req, res) {
	auth.init(req,res,'socialnetwork');
});

module.exports = router;