/*
 * 
 * MODE DEVELOPMENT
 * 
 */

var path = require('path');

module.exports = {
    /*
     ** Mode
     */
    mode: 'DEVELOPMENT',
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
     ** User
     */
    user: {

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
            uri: 'mongodb://localhost/nodetomic-dev',
            options: {
                db: {
                    safe: true
                }
            },
            safe: true
        }
    },
    /**
     * Redis
     */
    redis: {
        token: {
            ip: '127.0.0.1',
            port: 6379,
            time: 60 * 5, // 60*60*24 = 24 hours,
            multiple: true // if you want multiples logins or only 1 device
        },
        // Only if your use sessionStore in engine.js
        /*
         session: {
         ip: '127.0.0.1',
         port: 6379,
         time: 60 * 5,
         db: 1
         }*/
    },
    /*
     ** Log request in console?
     */
    log: true,
    /*
     *	oAuth:  this.production ? ID_Production : ID_Development
     */
    facebook: {//dragtoolapp
        clientID: '1414309298866863',
        clientSecret: 'a0e3aa719346ca3d88bc30b771395ca9',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {//dragtoolapp
        clientID: 'ECfOxu76tGIKdDFHB9aVQ09A6',
        clientSecret: 'luQrsJXJzavTM2heOU3Ie9XHagrsYRS23fUnXYowgpU7ISulEU',
        callbackURL: '/auth/twitter/callback'
    },
    google: {//dragtoolapp
        clientID: '959531593421-np84t1tssmqlhmkf73rbm5m1rugmdnvo.apps.googleusercontent.com',
        clientSecret: 'y5pa5One-glkl7N9dOa7W0T7',
        callbackURL: '/auth/google/callback'
    },
    github: {//leonardorico
        clientID: 'b44946eddc69246251be',
        clientSecret: 'bdaa938b78c5fd1c50ecc744a99002612b5eaea7',
        callbackURL: '/auth/github/callback'
    },
    bitbucket: {//Login Face Apeiron
        clientID: '5JXWfCwXrKQuNCyh7X',
        clientSecret: 'aNFm2sFdsUtvYrQ4g5GM9XmYW5QWtFwX',
        callbackURL: '/auth/bitbucket/callback'
    }
};