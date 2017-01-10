'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../lib/auth/auth');

/* Router */
const router = express.Router();

/* GET api listing. */

router.get('/create', controller.create);
router.get('/read', auth.verify, controller.read);



module.exports = router;
