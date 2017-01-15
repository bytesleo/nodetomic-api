/*
 * 
 * MODE PRODUCTION
 * 
 */


var path = require('path');

module.exports = {
    /*
     ** Mode
     */
    mode: 'PRODUCTION',
    /*
     ** Path Root
     */
    root: path.normalize(__dirname + '/../../'),
    /*
     ** Folder Client
     */
    client: 'public',
    /*
     ** IP
     */
    ip: 'localhost',
    /*
     ** Port
     */
    port: 9001,
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
    secret: 's3kr3t_$k3y_&5ess10n?!%',
    /*
     ** DataBase
     */
    database: {
        mongo: {
            uri: 'mongodb://localhost/nodetomic',
            options: {
                db: {
                    safe: true
                }
            },
            safe: false
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
        /*session: {
         ip: '127.0.0.1',
         port: 6379,
         time: (60 * 60 * 24),
         db: 1
         }*/
    },
    /*
     ** Log request in console?
     */
    log: false,
    /*
     *	oAuth:  this.production ? ID_Production : ID_Development
     */
    facebook: {//dragtoolapp
        clientID: '1761107184177486',
        clientSecret: '09fb3f2b822f2846bdc03193231e22e0',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {//dragtoolapp
        clientID: 'hfrGIq0U4pUMaGm1lEUIittiI',
        clientSecret: 'g8hLu1MPKt7kXnz6gqTZNVDLqdLZhLpAgnsudWA4ywOMasGiMw',
        callbackURL: '/auth/twitter/callback'
    },
    google: {//dragtoolapp
        clientID: '959531593421-rbefifq5bid7v7j0ngmbql85i58fucuc.apps.googleusercontent.com',
        clientSecret: 'KaossMVdlEt62MKyDdr3GqAb',
        callbackURL: '/auth/google/callback'
    },
    github: {//leonardorico
        clientID: 'e64eae04dcf1da75dcbb',
        clientSecret: '5aa562cf7c1a7b5801015e023a08536cf19fb733',
        callbackURL: '/auth/github/callback'
    },
    bitbucket: {//Login Face Apeiron
        clientID: 'QRgAjhPUvvVFFTZyK7',
        clientSecret: 'EMWyqntmKXP53wqWkrLBwVAcCVcqNFWc',
        callbackURL: '/auth/bitbucket/callback'
    }
};