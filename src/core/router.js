import fs from "fs";
import config from '../config';

export default (app) => {

  //-> api/example: push in noLoad 'example' or renamed api/_example
  fs.readdirSync(`${config.base}/api`).forEach(route => {
    if (config.router.ignore.indexOf(route) < 0)
      if (route.charAt(0) !== '_')
        app.use(`/api/${route}`, require(`../api/${route}`).default);
  });

  // Routers Manual
  app.use('/auth', require('../lib/auth').default);
  // app.use('/api/hello', require('../api/hello'));

};
