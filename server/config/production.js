/*
 * MODE PRODUCTION
*/

import path from 'path';

export default {
    /*
   ** Mode: development / production
   */
    mode : 'production',
    /*
     ** Path Root
     */
    root : path.normalize(`${__dirname}/../../`),
    /*
     ** Folder Client
     */
    client : 'dist',
    /*
     ** IP
     */
    ip : 'localhost',
    /*
     ** Port
     */
    port : 8001,
    /*
     *redirect
     */
    login : {
        redirect: '/home'
    },
    /*
     ** Session
     */
    secret : 's3kr3t_$k3y_&5ess10n?!%_pro',
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
                    user: false,
                    hello: false
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
    log : false,
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
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/github/callback'
        },
        bitbucket: {
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/bitbucket/callback'
        }
    }
};
