import config from './../../config';
import mongoose from 'mongoose';

export default(app, session) => {

  const mongoStore = require('connect-mongo')(session);

  app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions'
    })
  }));

}
