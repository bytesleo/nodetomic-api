
const mongoose = require('mongoose');
const config = require('../config');


mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.database.mongo.uri, config.database.mongo.options);

// When successfully connected
mongoose.connection.on('connected', (err) => {
    console.log('Mongoose default connection open to ' + config.database.mongo.uri);
});


// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});


// When the connection is disconnected
mongoose.connection.on('disconnected', (err) => {
    console.log('Mongoose default connection disconnected');
});


// Populate DB with sample data
if (config.database.mongo.seed) {
    require('./seed')
}
