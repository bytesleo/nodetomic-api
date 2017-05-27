import fs from "fs";
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import config from '../config';

export default(app) => {

  // Paths 404 from url
  app.get(config.path.disabled, (req, res) => {
    res.status(404).sendFile(`${config.base}/views/404.html`);
  });

  // Point static path to client
  if (fs.existsSync(`${config.root}/${config.client}`)) {
    app.use(express.static(`${config.root}/${config.client}`));
    app.use(favicon(path.join(config.root, config.client, 'favicon.ico')));
  }

  // Paths specials from client
  // app.use('/bower_components', express.static(`${config.root}/bower_components`));
  // app.use('/example.js', express.static(`${config.root}/admin/example.js`));
  if (config.swagger.enabled)
    app.use('/api-docs', express.static(`${config.root}/api-docs`));

  // Folder client
  app.get('/*', (req, res) => {
    res.sendFile(`${config.root}/${config.client}/index.html`);
  });

  // Other folder client
  // app.get('/:url(admin)/*', (req, res) => {
  //     res.sendFile(`${config.root}/${config.clientAdmin}/example.html`);
  // });

}
