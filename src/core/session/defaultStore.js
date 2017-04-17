import config from './../../config';

export default(app, session) => {
  app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));
}
