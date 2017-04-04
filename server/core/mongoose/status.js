export default(mongoose, uri) => {

    // When successfully connected
    mongoose.connection.on('connected', (err) => {
        console.log(`Mongoose default connection open to ${uri}`);
    });

    // If the connection throws an error
    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: uri->${uri} details->${err}`);
        mongoose.disconnect();
        process.exit(-1);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', (err) => {
        console.log(`Mongoose default connection disconnected: ${uri}`);
    });

};
