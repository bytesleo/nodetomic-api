'use strict';

const config = require('./../config');
const morgan = require('morgan'); //log console

module.exports = (app) => {
    app.use(require('connect-livereload')({src: `http://${config.livereload.ip}:${config.livereload.port}/livereload.js`}));
    if (config.log) {
        app.use(morgan('dev', {
            //            skip: function (req, res) {
            //                if (res.statusCode == 304) {
            //                    return true;
            //                }else{
            //                    return false;
            //                }
            //                return res.statusCode == 304;
            //            }
        }));

    }
};
