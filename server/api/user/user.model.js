'use strict';

// Libs
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    provider: String,
    name: String,
    photo: String,
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date
    },
    social: {
        id: String,
        info: {}
    }
});

require('./user.methods')(UserSchema);

module.exports = mongoose.model('User', UserSchema);
