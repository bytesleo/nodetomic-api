'use strict';

const jwt = require('jsonwebtoken');
const utility = require('../index');
const config = require('../../../config');

/*
 * Create Token
 * Returns the jwt
 */

exports.createToken = (id, callback) => {

    var helper = utility.setRedisKey(id);

    var token = jwt.sign({
        _id: id,
        _verify: helper.verify
    }, config.secret, {
        //noTimestamp: true
        expiresIn: config.redis.token.time
    });

    callback(null, {
        key: helper.key,
        value: token
    });
};

/*
 * Extract the token from the header Authorization.
 * Authorization: TOKEN-MECHANISM Token
 * Returns the token
 */

exports.extractTokenFromHeader = (req, callback) => {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return callback('No token provided');
    req.headers.authorization = 'Bearer ' + token;
    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded) => {

        if (err)
            return callback('Token invalid.');
        
        // decode token
        //req.decoded = decoded;
        return callback(null, {
            value: token,
            decode: decoded
        });
    });

};
