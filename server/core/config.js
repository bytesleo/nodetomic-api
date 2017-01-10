var path = require('path');

module.exports = {
    /*
     ** Mode
     */
     production: false,
    /*
     ** Path Root
     */
     root: path.normalize(__dirname + '/../..'),
    /*
     ** Folder Client
     */
     client: this.production ? '/dist' : '/src',
    /*
     ** IP
     */
     ip: 'localhost',
    /*
     ** Port
     */
     port: this.production ? 9000 : 9000,
    /*
     ** User
     */
     user: {


     },
     /*
     *redirect
     */
     login:{
        redirect:'/home'
    },
    /*
     ** Session
     */
     secret: 's3kr3t_$k3y_&5ess10n?!%',

     session:{
        time:{
            redis: (60*15) // 60*60*24 = 24 hours,
        }
    },

    /*
     ** DataBase
     */
     database: {
        mongo: {
            uri: 'mongodb://localhost/' + (this.production ? 'nodetomic' : 'nodetomic-dev'), 
            options: {
                db: {
                    safe: true
                }
            },
            seed: true
        },
    },
    /*
     ** Log request in console?
     */
     log: true,

    /*
     *	oAuth:  this.production ? ID_Production : ID_Development
     */
    facebook: {//dragtoolapp
        clientID: this.production ? '1761107184177486' : '1414309298866863',
        clientSecret: this.production ? '09fb3f2b822f2846bdc03193231e22e0' : 'a0e3aa719346ca3d88bc30b771395ca9',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {//dragtoolapp
        clientID: this.production ? 'hfrGIq0U4pUMaGm1lEUIittiI' : 'ECfOxu76tGIKdDFHB9aVQ09A6',
        clientSecret: this.production ? 'g8hLu1MPKt7kXnz6gqTZNVDLqdLZhLpAgnsudWA4ywOMasGiMw' : 'luQrsJXJzavTM2heOU3Ie9XHagrsYRS23fUnXYowgpU7ISulEU',
        callbackURL: '/auth/twitter/callback'
    },
    google: {//dragtoolapp
        clientID: this.production ? '959531593421-rbefifq5bid7v7j0ngmbql85i58fucuc.apps.googleusercontent.com' : '959531593421-np84t1tssmqlhmkf73rbm5m1rugmdnvo.apps.googleusercontent.com',
        clientSecret: this.production ? 'KaossMVdlEt62MKyDdr3GqAb' : 'y5pa5One-glkl7N9dOa7W0T7',
        callbackURL: '/auth/google/callback'
    },
    github: {//leonardorico
        clientID: this.production ? 'e64eae04dcf1da75dcbb' : 'b44946eddc69246251be',
        clientSecret: this.production ? '5aa562cf7c1a7b5801015e023a08536cf19fb733' : 'bdaa938b78c5fd1c50ecc744a99002612b5eaea7',
        callbackURL: '/auth/github/callback'
    },
    bitbucket: {//Login Face Apeiron
        clientID: this.production ? 'QRgAjhPUvvVFFTZyK7' : '5JXWfCwXrKQuNCyh7X',
        clientSecret: this.production ? 'EMWyqntmKXP53wqWkrLBwVAcCVcqNFWc' : 'aNFm2sFdsUtvYrQ4g5GM9XmYW5QWtFwX',
        callbackURL: '/auth/bitbucket/callback'
    }
}