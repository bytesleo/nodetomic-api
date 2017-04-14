import fs from "fs";
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import config from '../config';

export default(app) => {

    // PATHS
    app.use('/bower_components', express.static(`${config.root}/bower_components`));

    //Assets specifics
    // app.use('/vendor.bundle.js', express.static(config.root + '/dist-admin/vendor.bundle.js'));

    //Paths clients
    app.get('/:url(api|assets|lib|bower_components)/*', (req, res) => {
        res.status(404).sendFile(`${config.root}/server/views/404.html`);
    });

    // Point static path to client
    if (fs.existsSync(config.root + config.client)) {
        app.use(express.static(config.root + config.client));
        app.use(favicon(path.join(config.root, config.client, 'favicon.ico')));
    }

    //Folder client

    app.get('/*', (req, res) => {
        res.sendFile(`${config.root}/${config.client}/index.html`);
    });

    //other folder client
    // app.get('/:url(admin)/*', (req, res) => {
    //     res.sendFile(`${config.root}/${config.clientAdmin}/example.html`);
    // });

}
