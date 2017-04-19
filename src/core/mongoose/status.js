import colors from 'colors';

export default(mongoose, uri) => {

  // When successfully connected
  mongoose.connection.on('connected', (err) => {
    console.log(`MongoDB-> connected on ${uri}`.bgGreen);
  });

  // If the connection throws an error
  mongoose.connection.on('error', err => {
    console.log(`MongoDB-> connection error: ${uri} details->${err}`.bgRed);
    process.exit(-1);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', (err) => {
    console.log(`MongoDB-> disconnected: ${uri}`.bgRed);
  });

};
