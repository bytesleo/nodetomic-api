// Nodejs encryption with CTR

const crypto = require('crypto');
const config = require('../../core/config');
const algorithm = 'aes-256-ctr';

exports.encrypt = function (text) {
    var cipher = crypto.createCipher(algorithm, config.secret);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function (text) {
    var decipher = crypto.createDecipher(algorithm, config.secret);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

exports.makeid = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

//var hw = encrypt("hello world")
// outputs hello world
//console.log(decrypt(hw));