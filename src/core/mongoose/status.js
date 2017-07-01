import config from '../../config';
import colors from 'colors';

export default(db, conf) => {

  // When successfully connected
  db.on('connected', (err) => {
    console.log(`MongoDB-> connected on ${conf.uri}`.bgGreen);
  });

  db.once('open', () => {
    // Seed
    db.db.listCollections().toArray((err, names) => {
      if (err)
        console.log(err);
      conf.seeds.forEach(seed => {
        switch (seed.seed) {
          case 'once':
            let found;
            names.forEach(elem => {
              if (`${seed.model.toLowerCase()}s` == elem.name) {
                found = true;
              }
            });
            if (!found)
              require(`${config.base}${seed.path}`);
            break;
          case 'alway':
            require(`${config.base}${seed.path}`);
            break;
          case 'never':
            console.log('No seeds were sown :)');
            break;
          default:
        }
      });
    });
  });

  // If the connection throws an error
  db.on('error',err => {
      console.log(`MongoDB-> connection error: ${conf.uri} details->${err}`.bgRed);
      process.exit(-1);
  });

  // When the connection is disconnected
  db.on('disconnected',err => {
      console.log(`MongoDB-> disconnected: ${conf.uri}`.bgRed);
  });

};
