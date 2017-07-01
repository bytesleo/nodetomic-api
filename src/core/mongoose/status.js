import colors from 'colors';

export default(db, config) => {

  // When successfully connected
  db.on('connected', (err) => {
    console.log(`MongoDB-> connected on ${config.database.mongo.db.uri}`.bgGreen);
  });

  db.once('open', () => {
    // Plant seed
    require('./seed').default(db, config);
  });

  // If the connection throws an error
  db.on('error',err => {
      console.log(`MongoDB-> connection error: ${config.database.mongo.db.uri} details->${err}`.bgRed);
      process.exit(-1);
  });

  // When the connection is disconnected
  db.on('disconnected',err => {
      console.log(`MongoDB-> disconnected: ${config.database.mongo.db.uri}`.bgRed);
  });

};
