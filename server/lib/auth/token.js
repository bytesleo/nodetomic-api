//use with JWT
var jwt = require('jsonwebtoken');
var cryptolib = require('../crypto');
//use with  crypto
//var crypto = require('crypto');
//var TOKEN_LENGTH = 32;

var config = require('../../config');
/*
 * Create a 32 bytes token - ASYNC
 * callback(err, token) 
 */
exports.createToken = function (id, callback) {
    //with  JWT

    var verify = cryptolib.makeid(20);
    var key = cryptolib.encrypt(id.toString()) + ':' + verify;

    var token = jwt.sign({_id: id, _verify: verify}, config.secret, {
        //noTimestamp: true
    });

    callback(null, {
        key: key,
        value: token
    });
    //with  crypto

    /*crypto.randomBytes(TOKEN_LENGTH, function(ex, token) {
     if (ex) callback(ex);
     
     console.log('-> ' + token);
     console.log('-> ' + token.toString('hex'));
     
     if (token) callback(null, token.toString('hex'));
     else callback(new Error('Problem when generating token'));
     });*/
};
/*
 * Extract the token from the header Authorization.
 * Authorization: TOKEN-MECHANISM Token
 * Returns the token
 */
exports.extractTokenFromHeader = function (req, callback) {

    //with  JWT

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return callback('No token provided');
    req.headers.authorization = 'Bearer ' + token;
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {

        if (err)
            return callback('Token invalid.');
        // decode token
        //req.decoded = decoded;
        return callback(null, {
            value: token,
            decode: decoded
        });
        //return callback(null, token);
    });
    //with  crypto

    /*if (headers == null) throw new Error('Header is null');
     if (headers.authorization == null) throw new Error('Authorization header is null');
     
     var authorization = headers.authorization;
     var authArr = authorization.split(' ');
     if (authArr.length != 2) throw new Error('Authorization header value is not of length 2');
     
     // retrieve token
     var token = authArr[1]; 
     if (token.length != TOKEN_LENGTH * 2) throw new Error('Token length is not the expected one');
     
     return token;
     */

};