/* Requires */
const express = require('express');
const controller = require('./hello.controller');

/* Router */
const router = express.Router();

/* GET api listing. */

router.get('/', controller.show);

module.exports = router;
