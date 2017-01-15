// Get dependencies
const express = require('express');
const http = require('http');
const config = require('./config');
const app = express();
// Core
require('./core/engine')(app);
// MongoDB
require('./core/database/mongoose');
//Routers
require('./core/routers')(app);
//Create HTTP server. 
const server = http.createServer(app);
// Listen on provided port, on all network interfaces. 
server.listen(config.port, config.ip, () => {
    console.log(`Server listening on ${config.ip}:${config.port} in mode (${config.mode})`);
});
