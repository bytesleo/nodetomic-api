import express from 'express';
import http from 'http';
import colors from 'colors';
import config from './config';
const app = express();
// Core
require('./core/engine').default(app);
// Routers
require('./core/router').default(app);
// Paths
require('./core/path').default(app);
// MongoDB
require('./core/mongoose/db');
// Create HTTP server.
const server = http.createServer(app);
// Listen Server
server.listen(config.server.port, config.server.ip, () => {
  process.env.NODE_ENV = config.mode;
  console.log(`Server listening on http://${config.server.ip}:${config.server.port} in mode [${config.mode}]`.bgGreen);
});
