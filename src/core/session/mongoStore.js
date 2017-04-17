import config from './../../config';
import mongoose from 'mongoose';

export default(app, session) => {

  const mongoStore = require('connect-mongo')(session);

  app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection, collection: 'sessions' // default
    })
  }));

}
