import colors from 'colors';

export default(mongoose, conf) => {

  // When successfully connected
  mongoose.connection.on('connected', (err) => {
    console.log(`MongoDB-> connected on ${conf.uri}`.bgGreen);
  });

  mongoose.connection.on('open', () => {
    // Seed
    mongoose.connection.db.listCollections().toArray(function(err, names) {
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
              require(`./seed/${seed.model}`);
            break;
          case 'alway':
            require(`./seed/${seed.model}`);
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
  mongoose.connection.on('error', err => {
    console.log(`MongoDB-> connection error: ${conf.uri} details->${err}`.bgRed);
    process.exit(-1);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', (err) => {
    console.log(`MongoDB-> disconnected: ${conf.uri}`.bgRed);
  });

};
