'use strict';

/*
 *
 * MODE DEVELOPMENT
 *
 */

var path = require('path');

module.exports = {
    /*
   ** Mode: development / production
   */
    mode: 'development',
    /*
     ** Path Root
     */
    root: path.normalize(__dirname + '/../../'),
    /*
     ** Folder Client
     */
    client: 'src',
    /*
     ** IP
     */
    ip: 'localhost',
    /*
     ** Port
     */
    port: 9000,
    /*
     * livereload
     */
    livereload: {
        ip: 'localhost',
        port: 35729
    },
    /*
     *redirect
     */
    login: {
        redirect: '/home'
    },
    /*
     ** Session
     */
    secret: 's3kr3t_$k3y_&5ess10n?!%_dev',
    /*
     ** DataBase
     */
    database: {
        mongo: {
            db: {
                uri: 'mongodb://localhost/nodetomic-dev',
                options: {
                    db: {
                        safe: true
                    }
                },
                seed: {
                    user: true,
                    hello: true
                }
            }
        }
    },
    /*
     * Roles
     */
    roles: [
        {
            rol: 'user',
            time: 60 //minutes
        }
    ],

    /**
     * Redis
     */
    redis: {
        token: {
            ip: '127.0.0.1',
            port: 6379,
            time: (60 * 60 * 24), // 60*60*24 = 24 hours,
            multiple: true // if you want multiples logins or only 1 device
        }
    },
    /*
     ** Log request in console?
     */
    log: true,
    /*
     *	oAuth:  this.production ? ID_Production : ID_Development
     */
    oAuth: {
        facebook: {
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/facebook/callback'
        },
        twitter: {
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/twitter/callback'
        },
        google: {
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/google/callback'
        },
        github: {
            clientID: 'b44946eddc69246251be',
            clientSecret: 'bdaa938b78c5fd1c50ecc744a99002612b5eaea7',
            callbackURL: '/auth/github/callback'
        },
        bitbucket: {
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/bitbucket/callback'
        }
    }
};
