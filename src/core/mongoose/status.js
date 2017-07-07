import chalk from 'chalk';

export default(db, config) => {

  // When successfully connected
  db.on('connected', (err) => {
    console.log(chalk.greenBright(`----------\nMongoDB-> connected on ${config.database.mongo.db.uri}\n----------`));
  });

  db.once('open', () => {
    // Plant seed
    require('./seed').default(db, config);
  });

  // If the connection throws an error
  db.on('error',err => {
      console.log(chalk.redBright(`MongoDB-> connection error: ${config.database.mongo.db.uri} details->${err}`));
      process.exit(-1);
  });

  // When the connection is disconnected
  db.on('disconnected',err => {
      console.log(chalk.redBright(`MongoDB-> disconnected: ${config.database.mongo.db.uri}`));
  });

};
