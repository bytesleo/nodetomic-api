import colors from 'colors';

export default(mongoose, uri) => {

    // When successfully connected
    mongoose.connection.on('connected', (err) => {
        console.log(`MongoDB-> default connection open to ${uri}`.bgGreen);
    });

    // If the connection throws an error
    mongoose.connection.on('error', err => {
        console.log(`MongoDB-> connection error: uri->${uri} details->${err}`.bgRed);
        process.exit(-1);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', (err) => {
        console.log(`MongoDB-> default connection disconnected: ${uri}`.bgRed);
    });

};
