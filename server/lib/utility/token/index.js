import jwt from 'jsonwebtoken';
import * as utility from '../index';
import config from '../../../config';

/*
 * Create Token
 * Returns the jwt
 */

export function createToken(id, callback) {

    const helper = utility.setRedisKey(id);

    const token = jwt.sign({
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
}

/*
 * Extract the token from the header Authorization.
 * Authorization: TOKEN-MECHANISM Token
 * Returns the token
 */

export function extractTokenFromHeader(req, callback) {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return callback('No token provided');
    req.headers.authorization = `Bearer ${token}`;
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

}
