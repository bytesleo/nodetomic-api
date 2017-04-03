'use strict';

// Libs
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model
var HelloSchema = new Schema({
    greet: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Hello', HelloSchema);
