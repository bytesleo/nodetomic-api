import * as redis from 'redis';
import config from './../../config';

const RedisStore = require('connect-redis')(session);

export default(app, session) => {

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
