import mongoose from 'mongoose';
import config from './../../config';

const mongoStore = require('connect-mongo')(session);

export default(app, session) => {

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
