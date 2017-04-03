'use strict';
// Get dependencies
const express = require('express');
const http = require('http');
const config = require('./config');
const app = express();
// Core
require('./core/engine')(app);
//Routers
require('./core/routers')(app);
// MongoDB
require('./core/mongoose/db');
//Create HTTP server.
const server = http.createServer(app);
//Listen Server
server.listen(config.port, config.ip, () => {
    process.env.NODE_ENV = config.mode;
    console.log(`Server listening on http://${config.ip}:${config.port} in mode [${config.mode}]`);
});
