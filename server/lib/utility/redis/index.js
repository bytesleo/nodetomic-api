'use strict';

const redis = require('redis');
const utility = require('../index');
const config = require('../../../config');

require('redis-delete-wildcard')(redis);

var redisClient = redis.createClient(config.redis.token.port, config.redis.token.ip);

redisClient.on('error', err => {
    throw err;
});

/*
 * Stores a token with user data for a ttl period of time
 * token: String - Token used as the key in redis
 * data: Object - value stored with the token
 * ttl: Number - Time to Live in seconds (default: 24Hours)
 * callback: Function
 */
exports.setTokenWithData = (token, data, ttl, callback) => {

    if (token.key == null || token.value == null)
        throw new Error('Token is null');
    if (data != null && typeof data !== 'object')
        throw new Error('data is not an Object');

    var info = {
        ts: new Date(),
        user: data,
        jwt: token.value
    };

    var timeToLive = ttl;
    if (timeToLive != null && typeof timeToLive !== 'number')
        throw new Error('TimeToLive is not a Number');

    redisClient.setex(token.key, timeToLive, JSON.stringify(info), (err, reply) => {
        if (err)
            callback(err);
        if (reply) {
            callback(null, true);
        } else {
            callback(new Error('Token not set in redis'));
        }
    });

};

/*
 * Gets the associated data of the token.
 * token: String - token used as the key in redis
 * callback: Function - returns data
 */

exports.getDataByToken = (token, callback) => {

    if (token == null)
        callback(new Error('Token is null'));

    var key = utility.getRedisKey(token);

    redisClient.get(key, (err, userData) => {
        if (err)
            callback(err);
        if (userData != null)
            callback(null, JSON.parse(userData));
        else
            callback(new Error('Token Not Found'));
        }
    );
};

/*
 * Expires a token by deleting the entry in redis
 * callback(null, true) if successfuly deleted
 */
exports.expireToken = (token, callback) => {
    if (token == null)
        callback(new Error('Token is null'));

    redisClient.select(1, (err, res) => {
        redisClient.del(token, (err, reply) => {
            if (err)
                callback(err);

            if (reply)
                callback(null, true);
            else
                callback(new Error('Token not found'));
            }
        );
    });
};

exports.findByPattern = (key, callback) => {
    var id_session = key.split(':')[0];
    redisClient.delwild(id_session + ':*', (error, numberDeletedKeys) => {
        console.log(numberDeletedKeys);
    });
};
