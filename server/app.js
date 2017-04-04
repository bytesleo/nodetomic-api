// Get dependencies
import express from 'express';
import http from 'http';
import config from './config';
const app = express();
// Core
require('./core/engine').default(app);
//Routers
require('./core/routers').default(app);
// MongoDB
require('./core/mongoose/db');
//Create HTTP server.
const server = http.createServer(app);
//Listen Server
server.listen(config.port, config.ip, () => {
    process.env.NODE_ENV = config.mode;
    console.log(`Server listening on http://${config.ip}:${config.port} in mode [${config.mode}]`);
});
