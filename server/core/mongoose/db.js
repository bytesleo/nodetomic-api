'use strict';

const mongoose = require('mongoose');
const config = require('../../config');

mongoose.Promise = global.Promise;

// Connect to database
var db = mongoose.connect(config.database.mongo.db.uri, config.database.mongo.db.options);

// Events
require('./status')(db, config.database.mongo.db.uri);

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
