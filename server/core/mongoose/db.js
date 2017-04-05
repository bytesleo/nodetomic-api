import mongoose from 'mongoose';
import config from '../../config';

// mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');

// Connect to database
const db = mongoose.connect(config.database.mongo.db.uri, config.database.mongo.db.options);

// Events
require('./status').default(db, config.database.mongo.db.uri);

// Seed
if (config.database.mongo.db.seed.user) {
    setTimeout(() => {
        require('./seed/user');
    }, 800);
}
if (config.database.mongo.db.seed.hello) {
    setTimeout(() => {
        require('./seed/hello');
    }, 800);
}
