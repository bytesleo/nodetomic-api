const config = require('../../core/config');
var redisHelper = require('./redis');
var tokenHelper = require('./token');

/*
 * Initialization token session with local and social networks
 */

exports.init = function (req, res, type) {

    //var user = req.user;
    // data save Redis
    var user = {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        provider: req.user.provider,
        photo: req.user.photo,
        status: req.user.status,
        role: req.user.role
    };

    this.createAndStoreToken(user, null, function (err, token) {//key, data, time session
        if (err) {
            return res.status(400);
        }
        switch (type) {
            case 'local' :
                res.status(200).json({
                    token: token,
                    redirect: config.login.redirect
                });
                break;
            case 'socialnetwork' :
                res.cookie('token', JSON.stringify(token));
                res.redirect(config.login.redirect);
                break;
        }

    });
};


/*
 * Middleware to verify the token and store the user data in req._user
 */
exports.verify = function (req, res, next) {

    var headers = req.headers;
    if (headers === null)
        return res.status(401).send('401');

    tokenHelper.extractTokenFromHeader(req, function (err, token) {// Extract Token from header x-access-token

        if (err)
            return res.status(401).send(err);

        redisHelper.getDataByToken(token.decode, function (err, data) {

            if (err)
                return res.status(401).send('Unauthorized');

            if (token.value !== data.jwt)
                return res.status(401).send('Unauthorized, token in new device...');

            req.user = data;
            next();
        });
    });
};


/*
 * Create a new token, stores it in redis with data during ttl time in seconds
 * callback(err, token);
 */
exports.createAndStoreToken = function (data, ttl, callback) {

    data = data || {};
    ttl = ttl || config.redis.token.time;

    if (data !== null && typeof data !== 'object')
        callback(new Error('data is not an Object'));
    if (ttl !== null && typeof ttl !== 'number')
        callback(new Error('ttl is not a valid Number'));

    tokenHelper.createToken(data._id, function (err, token) {
        if (err)
            callback(err);

        if (!config.redis.token.multiple) {//delete all sessions tokens
            redisHelper.findByPattern(token.key, function (err, exits) {
                if (err)
                    callback(err);
            });
        }

        redisHelper.setTokenWithData(token, data, ttl, function (err, success) {
            if (err)
                callback(err);
            if (success) {
                callback(null, token.value);
            } else {
                callback(new Error('Error when saving token'));
            }
        });
    });

};

/*
 * Expires the token (remove from redis)
 */
exports.expireToken = function (headers, callback) {
    if (headers === null)
        callback(new Error('Headers are null'));
    // Get token
    try {
        var token = tokenHelper.extractTokenFromHeader(headers);
        if (token === null)
            callback(new Error('Token is null'));

        redisHelper.expireToken(token, callback);
    } catch (err) {
        console.log(err);
        return callback(err);
    }
};


/*
 * Get count session
 */
exports.getCount = function (callback) {
    redisHelper.getCount(callback);
};
