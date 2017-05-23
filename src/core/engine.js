import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from './../config';

export default(app) => {

  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(fileUpload());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(compression());
  app.use(helmet());
  app.use(cors({origin: true, credentials: true}));

  if (config.session)
    require(`./session/${config.session}`).default(app, session);

  app.use(passport.initialize());
  app.use(passport.session());

  require('./dev').default(app);
};
