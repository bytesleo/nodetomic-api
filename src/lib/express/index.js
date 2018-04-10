import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import config from '../../config';

export function index(app) {

  return new Promise((resolve, reject) => {

    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(methodOverride());
    app.use(compression());
    app.use(helmet());
    app.use(cors({ origin: true, credentials: true }));

    if ("twitter" in config.oAuth && config.oAuth.twitter.enabled)
      app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Morgan
    if (config.log)
      app.use(morgan('dev'));

    resolve();

  })

};
