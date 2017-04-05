import path from 'path';
import config from '../config';
import express from 'express';
import fs from "fs";
import favicon from 'serve-favicon';

export default(app) => {

    // Point static path to client
    if (fs.existsSync(config.root + config.client)) {
        app.use(express.static(config.root + config.client));
        app.use(favicon(path.join(config.root, config.client, 'favicon.ico')));
    }

    app.use('/bower_components', express.static(`${config.root}/bower_components`));

    //Assets specifics
    // app.use('/vendor.bundle.js', express.static(config.root + '/dist-admin/vendor.bundle.js'));

    //Routers autoload
    fs.readdirSync(`${config.root}/server/api`).forEach(route => {
        if (route.charAt(0) !== '_') {
            app.use(`/api/${route}`, require(`../api/${route}`).default);
        }
    });

    //Routers Manual
    app.use('/auth', require('../lib/auth').default);
    // app.use('/api/hello', require('../api/hello'));

    //Paths clients
    app.get('/:url(api|assets|lib|bower_components)/*', (req, res) => {
        res.status(404).sendFile(`${config.root}/server/views/404.html`);
    });

    //Folder client
    app.get('/*', (req, res) => {
        res.sendFile(`${config.root}/${config.client}/index.html`);
    });

    //other folder client
    // app.get('/:url(admin)/*', (req, res) => {
    //     res.sendFile(`${config.root}/${config.clientAdmin}/example.html`);
    // });

};
