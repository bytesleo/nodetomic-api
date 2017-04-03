'use strict';

const config = require('../config');
const express = require('express');
const fs = require("fs");

module.exports = (app) => {

    // Point static path to client
    app.use(express.static(config.root + config.client));
    app.use('/bower_components', express.static(config.root + '/bower_components'));

    //assets specials
    // app.use('/vendor.bundle.js', express.static(config.root + '/dist-admin/vendor.bundle.js'));

    //Routers autoload
    fs.readdirSync(`${config.root}/server/api`).forEach(route => {
        if (route.charAt(0) !== '_') {
            app.use('/api/' + route, require('../api/' + route));
        }
    });

    //Routers Manual
    app.use('/auth', require('../lib/auth'));
    // app.use('/api/hello', require('../api/hello'));

    //Paths clients
    app.get('/:url(api|auth|bower_components|core|app|assets)/*', (req, res) => {
        res.status(404).sendFile(`${config.root}/server/views/404.html`);
    });

    //other folder client
    // app.get('/:url(admin)/*', (req, res) => {
    //     res.sendFile(`${config.root}/${config.clientAdmin}/index.html`);
    // });

    app.get('/*', (req, res) => {
        res.sendFile(`${config.root}/${config.client}/index.html`);
    });

};
