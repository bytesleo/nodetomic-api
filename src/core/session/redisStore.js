import * as redis from 'redis';
import config from './../../config';

export default(app, session) => {

  const RedisStore = require('connect-redis')(session);
  
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
      client: redis.createClient(),
      host: config.redis.token.ip,
      port: config.redis.token.port
    })
  }));

}
