import express from 'express';
import chalk from 'chalk';
import config from './config';
const app = express();

(async function run() {

  // Express
  await require('./lib/express').index(app);

  // Mongoose
  await require('./lib/mongoose').connect();

  // Redis-jwt
  await require('./lib/redis-jwt').connect();

  // Socket.io
  await require('./lib/socket.io').connect();

  // Passports
  await require('./auth/services/router.service').default(app);

  // Paths
  await require('./lib/express/client').default(app);

  // Server 
  app.listen(config.server.port, config.server.ip, () => {
    // Info
    console.log(chalk.greenBright(`-------\nServer-> 
          mode: [${chalk.magentaBright(`${config.mode}`)}]
          url: ${chalk.blueBright(`http://${config.server.ip}:${config.server.port}`)}\n-------`));
    // Ready!
    console.log(chalk.black.bgGreenBright(`>>nodetomic-api ready!<<`));
  });

})();