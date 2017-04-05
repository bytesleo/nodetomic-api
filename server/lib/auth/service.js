import * as redisHelper from '../utility/redis';
import * as tokenHelper from '../utility/token';
import * as utility from '../utility';
import config from '../../config';

// Initialization token session with local and social networks

export function start(req, res, type) {
    //var user = req.user;
    const user = {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        provider: req.user.provider,
        photo: req.user.photo,
        status: req.user.status,
        roles: req.user.roles
    };

    const ttl = req.user.ttl || utility.getTimeRol(req.user.roles);

    this.createAndStoreToken(user, ttl, (err, token) => { //key, data, time session
        if (err) {
            return res.status(400);
        }
        switch (type) {
            case 'local':
                res.status(200).json({token, redirect: config.login.redirect});
                break;
            case 'social':
                res.cookie('token', JSON.stringify(token));
                res.redirect(config.login.redirect);
                break;
        }

    });
}

/*
 * Create a new token, stores it in redis with data during ttl time in seconds
 * callback(err, token);
 */
export function createAndStoreToken(data, ttl, callback) {

    data = data || {};
    ttl = ttl || config.redis.token.time;

    if (data !== null && typeof data !== 'object')
        callback(new Error('data is not an Object'));
    if (ttl !== null && typeof ttl !== 'number')
        callback(new Error('ttl is not a valid Number'));

    tokenHelper.createToken(data._id, (err, token) => {
        if (err)
            callback(err);

        if (!config.redis.token.multiple) { //delete all sessions tokens
            redisHelper.findByPattern(token.key, (err, exits) => {
                if (err)
                    callback(err);
                }
            );
        }

        redisHelper.setTokenWithData(token, data, ttl, (err, success) => {
            if (err)
                callback(err);
            if (success) {
                callback(null, token.value);
            } else {
                callback(new Error('Error when saving token'));
            }
        });
    });

}

/*
 * Expires the token (remove from redis)
 */
export function expireToken(headers, callback) {
    if (headers === null)
        callback(new Error('Headers are null'));

    // Get token
    try {
        const token = tokenHelper.extractTokenFromHeader(headers);
        if (token === null)
            callback(new Error('Token is null'));

        redisHelper.expireToken(token, callback);
    } catch (err) {
        console.log(err);
        return callback(err);
    }
}
