// #production

import path from 'path';

export default {
  // Mode: development / production
  mode : 'production',
  // Path Root
  root : path.normalize(`${__dirname}/../../`),
  // Path Root
  base : path.normalize(`${__dirname}/..`),
  //Folder Client
  client : 'client',
  //Server listen
  server : {
    ip: 'localhost',
    port: 8000
  },
  //Redis
  redis : {
    token: {
      uri: 'redis://127.0.0.1:6379/0', //format-> redis://user:password@host:port/db-number?db=db-number&password=bar&option=value
      time: 1440, // by default 1440 = 24 hours,
      multiple: false // if you want multiples logins or only 1 device
    }
  },
  //Secret
  secret : 's3kr3t_$k3y_&5ess10n?!%_pro',
  //login
  login : {
    redirect: '/home' // redirect when login success
  },
  //DataBase
  database : {
    //MongoDb
    mongo: {
      db: {
        uri: 'mongodb://localhost:27017/nodetomic-pro', //format-> mongodb://username:password@host:port/database?options
        options: {
          db: {
            safe: true
          },
          server: {
            auto_reconnect: true
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
  //Roles
  roles : [
    {
      rol: 'user',
      time: 5 //minutes
    }
  ],
  //oAuth
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
      clientID: '52be92c9a41f77a959eb',
      clientSecret: '76c9bb03c689d098506822fa80dba372a1fe29c8',
      callbackURL: '/auth/github/callback'
    },
    bitbucket: {
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/bitbucket/callback'
    }
  },
  router : { // api/exmaple
    ignore: ['example'] //No autoload
  }
};
