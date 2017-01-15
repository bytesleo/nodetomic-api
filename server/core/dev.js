/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const config = require('./../config');
const morgan = require('morgan'); //log console

module.exports = (app) => {
    app.use(require('connect-livereload')({
        src: `http://${config.livereload.ip}:${config.livereload.port}/livereload.js`
    }));
    if (config.log) {
        app.use(morgan('dev'));
    }
};