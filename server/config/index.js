/*
 * MODE DEVELOPMENT
*/

import path from 'path';

export default {
    /*
   ** Mode: development / production
   */
    mode : 'development',
    /*
     ** Path Root
     */
    root : path.normalize(`${__dirname}/../../`),
    /*
     ** Folder Client
     */
    client : 'src',
    /*
     ** IP
     */
    ip : 'localhost',
    /*
     ** Port
     */
    port : 8000,
    /*
     * livereload
     */
    livereload : {
        ip: 'localhost',
        port: 35729
    },
    /*
     *redirect
     */
    login : {
        redirect: '/home'
    },
    /*
     ** Session
     */
    secret : 's3kr3t_$k3y_&5ess10n?!%_dev',
    /*
     ** DataBase
     */
    database : {
        //MongoDb
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
        //Other DataBase
    },
    /*
     * Roles
     */
    roles : [
        {
            rol: 'user',
            time: 60 //minutes
        }
    ],

    /**
     * Redis
     */
    redis : {
        token: {
            ip: '127.0.0.1',
            port: 6379,
            time: (60 * 60 * 24), // by default 60*60*24 = 24 hours,
            multiple: true // if you want multiples logins or only 1 device
        }
    },
    /*
     ** Log request in console?
     */
    log : true,
    /*
     *	oAuth
     */
    oAuth : {
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
