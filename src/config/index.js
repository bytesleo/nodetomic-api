import path from 'path';

const APP_NAME = `your-app-name`;
const DB_NAME = `your-app-name-dev`;
const CLIENT = '/client';

export default {
  secret: `your_secret_key`, // Secret Key
  server: { // Express
    ip: 'localhost',
    port: 8000,
  },
  log: true, // show logs
  // Roles: if a user has multiple roles, will take the time of the greater role
  roles: [
    {
      role: 'user',
      ttl: '7200 minutes',
    }, {
      role: 'admin',
      ttl: '5 days'
    }
  ],
  path: {
    disabled: '/:url(api|assets|auth|config|lib|views)/*' // paths 404
  },
  "socket.io": { // Socket.io
    port: 8001, // public port listen, change also in views/default/demo.js
    example: true, // router -> http://localhost:8000/socket 
    redis: { // Redis config
      host: '127.0.0.1',
      port: 6379
    }
  },
  "redis-jwt": { // Sessions
    //host: '/tmp/redis.sock', //unix domain
    host: '127.0.0.1', //can be IP or hostname
    port: 6379, // port
    maxretries: 10, //reconnect retries, default 10
    //auth: '123', //optional password, if needed
    db: 0, //optional db selection
    secret: 'secret_key', // secret key for Tokens!
    multiple: true, // single or multiple sessions by user
    kea: false // Enable notify-keyspace-events KEA
  },
  mongoose: { // MongoDB
    // uri: mongodb://username:password@host:port/database?options
    uri: `mongodb://localhost:27017/${DB_NAME}`,
    options: {
    },
    seed: {
      path: '/api/models/seeds/',
      list: [
        {
          file: 'user.seed',
          schema: 'User',
          plant: 'once' //  once - always - never
        },
        {
          file: 'example.seed',
          schema: 'Example',
          plant: 'once'
        }
      ]
    },
  },
  oAuth: { // oAuth
    local: {
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
      enabled: true,
      clientID: '52be92c9a41f77a959eb',
      clientSecret: '76c9bb03c689d098506822fa80dba372a1fe29c8',
      callbackURL: '/auth/github/callback'
    },
    bitbucket: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/bitbucket/callback'
    }
  },
  // globals
  mode: process.env.NODE_ENV || 'development', // mode
  name: APP_NAME, // name 
  node: parseInt(process.env.NODE_APP_INSTANCE) || 0, // node instance
  root: path.normalize(`${__dirname}/../..`), // root
  base: path.normalize(`${__dirname}/..`), // base
  client: `${path.normalize(`${__dirname}/../..`)}${CLIENT}`, // client
};