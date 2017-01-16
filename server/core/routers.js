var path = require('path');
var config = require('../config');
const express = require('express');

module.exports = (app) => {
    
    // Point static path to client
    app.use(express.static(config.root + config.client));
    app.use('/bower_components', express.static(config.root + '/bower_components'));

    /*
     ** Routes
     */

    app.use('/api/hello', require('../api/hello'));
    app.use('/api/user', require('../api/user'));
    app.use('/auth', require('../lib/auth'));

    /*
     **Catch all other routes and return the index file
     */

    app.get('/:url(api|auth|bower_components|core|app|assets)/*', (req, res) => {
        res.sendFile(`${config.root}/server/views/404.html`);
    });



    app.get('/:url(editor)/*', (req, res) => {
        res.sendFile(`${config.root}/${config.client}/editor.html`);
    });

    app.get('/*', (req, res) => {
        res.sendFile(`${config.root}/${config.client}/index.html`);
    });


};
