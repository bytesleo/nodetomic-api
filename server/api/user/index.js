'use strict';

//require
const express = require('express');
const controller = require('./user.controller');
const auth = require('../../lib/auth/middleware');

// Router
const router = express.Router();

// Rest Api

router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/read', auth.isAuthenticated(), controller.read);

module.exports = router;
