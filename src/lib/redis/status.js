import colors from 'colors';
import config from '../../config';

export default(db) => {

  db.on("connect", () => {
    console.log(`Redis-> connected on ${config.redis.token.ip}:${config.redis.token.port}`.bgGreen);
  });

  db.on("error", err => {
    console.log(`Redis-> ${err}`.bgRed);
    process.exit(-1);
  });

};
