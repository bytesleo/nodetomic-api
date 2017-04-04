// Get dependencies

import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import config from './../config';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import fileUpload from 'express-fileupload';

export default(app) => {

    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(fileUpload());
    app.use(cookieParser());
    app.use(methodOverride());
    app.use(compression());
    app.use(helmet());
    app.use(cors({origin: true, credentials: true}));

    /*SessionStore with Mongo*/
    /*
     const mongoStore = require('connect-mongo')(session);
     const mongoose = require('mongoose');
     app.use(session({
     secret: config.secret,
     saveUninitialized: true,
     resave: true,
     store: new mongoStore({
     mongooseConnection: mongoose.connection,
     collection: 'sessions' // default
     })
     }));
     */

    /*SessionStore with Redis*/
    //const RedisStore = require('connect-redis')(session);
    //Use for Twitter Auth -_-
    app.use(session({
        /* store: new RedisStore({
         //client: redisClient,
         host: config.redis.session.ip,
         port: config.redis.session.port,
         db: config.redis.session.db,
         ttl: config.redis.session.time
         }),*/
        secret: config.secret,
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    require('./dev').default(app);
};
