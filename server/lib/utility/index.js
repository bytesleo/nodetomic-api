'use strict';

// Nodejs encryption with CTR

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const config = require('../../config');
const algorithm = 'aes-256-ctr';

exports.encrypt = (text) => {
    var cipher = crypto.createCipher(algorithm, config.secret);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = (text) => {
    var decipher = crypto.createDecipher(algorithm, config.secret);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

exports.setRedisKey = (id, verify) => {
    return this.encrypt(id.toString()) + ':' + this.makeid(20);
};

exports.getRedisKey = (token) => {
    return utility.encrypt(token._id) + ':' + token._verify;
};

exports.makeid = (length) => {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

/*
 * Calculate time by Rol (concat time in multiples roles)
 */
exports.getTimeRol = (roles) => {
    var time = 0;
    roles.forEach(rol => {
        config.roles.forEach(item => {
            if (rol === item.rol) {
                time += item.time;
            }
        });
    });
    return (time * 60);
};
