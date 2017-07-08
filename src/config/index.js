//-------------development-----------------
import path from 'path';
const mode = 'development'; // development or production
const project = 'nodetomic-api'; //DB example name: nodetomic-api-development / swagger title: nodetomic-api / secret: s3kr3t_$k3y_&5ess10n?%-nodetomic-api-development
const pathRoot = path.normalize(`${__dirname}/../..`);
const pathBase = path.normalize(`${__dirname}/..`);

export default {
  mode : mode, // Mode
  root : pathRoot, // Path Root
  base : pathBase, // Path Base
  client : `${pathRoot}/client`, // Path Client
  name: project,
  server : { // Server listen
    ip: 'localhost',
    port: 8000
  },
  secret : `s3kr3t_$k3y_&5ess10n?%-${project}-${mode}`, // Secret key
  session : 'defaultStore', // defaultStore, mongoStore, redisStore / [Required for Twitter oAuth or sessions local (no redis)...]
  // Roles
  roles : [
    {
      rol: 'user',
      time: 120 // 120 minutes
    }, {
      rol: 'admin',
      time: 1440 // 24 hours
    }
  ],
  router : {
    ignore: ['example'] //Ignore Routers in /api/example
  },
  path : { // paths 404
    disabled: '/:url(api|assets|lib|bower_components)/*'
  },
  database : { // DataBase
    mongo: { // MongoDb
      db: {
        uri: `mongodb://localhost:27017/${project}-${mode}`, // [format-> mongodb://username:password@host:port/database?options]
        options: {
          useMongoClient: false
        },
        seeds: [
          {
            path: '/api/v1/user/user.seed',
            plant: 'once' //once - alway - never
          }, {
            path: '/api/v1.x/hello/hello.seed',
            plant: 'once' //once - alway - never
          }
        ]
      }
    }
    // Other DataBase
  },
  email : { // Email Config
    host: 'hostexample',
    secure: true,
    port: 465,
    auth: {
      user: 'example@gmail.com',
      pass: 'examplePassword'
    }
  },
  swagger : { // Swagger Config
    enabled: true,
    title: `${project}`,
    description: `RESTful API ${project}`,
    "contact": {
      "name": "Developer",
      "url": "http://www.example.com",
      "email": "example@example.com"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/kevoj/nodetomic-api/blob/master/LICENSE"
    }
  },
  redis : { // Redis
    token: {
      uri: 'redis://127.0.0.1:6379/0', // [format-> redis://user:password@host:port/db-number?db=db-number&password=bar&option=value]
      time: 1440, // by default 1440 minutes = 24 hours (Only if have property time in roles),
      multiple: false // if you want multiples logins or only one device in same time
    }
  },
  oAuth : { // oAuth
    local:{
      enabled: true
    },
    facebook: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/facebook/callback'
    },
    twitter: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/twitter/callback'
    },
    google: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/google/callback'
    },
    github: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/github/callback'
    },
    bitbucket: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/bitbucket/callback'
    }
  },
  // DEV
  livereload : { // livereload
    enabled: false,
    ip: 'localhost',
    port: 35729
  },
  log : true // Log request in console?
};
