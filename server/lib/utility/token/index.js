import * as jwt from 'jsonwebtoken';
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

    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        // verifies secret and checks exp
        jwt.verify(req.token, config.secret, (err, decoded) => {
            if (err)
                return callback('Token invalid.');

            // decode token
            //req.decoded = decoded;
            return callback(null, {
                value: req.token,
                decode: decoded
            });

        });
    } else {
        return callback('No token provided');
    }

}
