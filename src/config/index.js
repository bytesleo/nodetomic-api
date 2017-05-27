// #config development
import path from 'path';
const mode = 'development'; //development / production

export default {
  mode : mode,
  // Path Root
  root : path.normalize(`${__dirname}/../../`),
  // Path Root
  base : path.normalize(`${__dirname}/..`),
  // Folder Client
  client : 'client',
  // Server listen
  server : {
    ip: 'localhost',
    port: 8000
  },
  // Secret key to Token
  secret : `s3kr3t_$k3y_&5ess10n?%-${mode}`,
  // Session: Required for Twitter oAuth or sessions local...
  session : 'defaultStore', // posibles: mongoStore, redisStore
  // login
  login : {
    redirect: '/home' // redirect when login success
  },
  // Roles
  roles : [
    {
      rol: 'user',
      time: 60 // minutes
    }
  ],
  // Routers ignore
  router : { // api/exmaple
    ignore: ['example'] //No autoload
  },
  path : {
    disabled: '/:url(api|assets|lib|bower_components)/*'
  },
  // DataBase
  database : {
    // MongoDb
    mongo: {
      db: {
        uri: `mongodb://localhost:27017/nodetomic-${mode}`, // [format-> mongodb://username:password@host:port/database?options]
        options: {
          db: {
            safe: true
          },
          server: {
            auto_reconnect: true
          }
        },
        seeds: [
          {
            name: 'users',
            seed: 'once' //once - alway - none
          }, {
            name: 'hellos',
            seed: 'once'
          }
        ]
      }
    }
    // Other DataBase
  },
  // Config email
  email : {
    host: 'hostexample',
    secure: true,
    port: 465,
    auth: {
      user: 'example@gmail.com',
      pass: 'examplePassword'
    }
  },
  swagger : {
    info: {
      title: 'Nodetomic Swagger API',
      version: '1.9.3',
      description: 'Nodetomic RESTful API with Swagger',
      "contact": {
        "name": "Nodetomic Developer",
        "url": "http://www.example.com",
        "email": "example@example.com"
      },
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    }
  },
  // Redis
  redis : {
    token: {
      uri: 'redis://127.0.0.1:6379/0', // [format-> redis://user:password@host:port/db-number?db=db-number&password=bar&option=value]
      time: 1440, // by default 1440 minutes = 24 hours,
      multiple: false // if you want multiples logins or only one device in same time
    }
  },
  // oAuth
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
  // DEV
  // livereload
  livereload : {
    enabled: false,
    ip: 'localhost',
    port: 35729
  },
  // Log request in console?
  log : true
};
