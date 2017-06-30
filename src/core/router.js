import fs from "fs";
import config from '../config';

export default (app) => {

  //-> api/version/example: push in noLoad 'example' or renamed api/version/_example
  fs.readdirSync(`${config.base}/api`).forEach(version => {
    fs.readdirSync(`${config.base}/api/${version}`).forEach(route => {
      if (config.router.ignore.indexOf(route) < 0)
        if (route.charAt(0) !== '_')
          app.use(`/api/${version}/${route}`, require(`../api/${version}/${route}`).default);
    });
 });

  // Routers Manual
  app.use('/auth', require('../lib/auth').default);
  // app.use('/api/version/hello', require('../api/version/hello'));

};
