'use strict';

//require
const express = require('express');
const controller = require('./hello.controller');

// Router
const router = express.Router();

// Rest Api

router.get('/read', controller.read);

module.exports = router;
