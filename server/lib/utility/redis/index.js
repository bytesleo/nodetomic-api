import * as redis from 'redis';
import * as utility from '../index';
import config from '../../../config';

require('redis-delete-wildcard')(redis);

const redisClient = redis.createClient(config.redis.token.port, config.redis.token.ip);

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
export function setTokenWithData(token, data, ttl, callback) {

    if (token.key == null || token.value == null)
        throw new Error('Token is null');
    if (data != null && typeof data !== 'object')
        throw new Error('data is not an Object');

    var info = data;
    info.jwt = token.value;
    info.ttl = ttl;
    info.ttlRol = data.ttlRol || ttl;
    info.ts = data.ts || (new Date().getTime()); //created

    const timeToLive = ttl;
    if (timeToLive != null && typeof timeToLive !== 'number')
        throw new Error('TimeToLive is not a Number');

    var dataEncrypt = utility.encrypt(JSON.stringify(info));

    redisClient.setex(token.key, timeToLive, dataEncrypt, (err, reply) => {
        if (err)
            callback(err);
        if (reply) {
            callback(null, true);
        } else {
            callback(new Error('Token not set in redis'));
        }
    });

}

/*
 * Gets the associated data of the token.
 * token: String - token used as the key in redis
 * callback: Function - returns data
 */

export function getDataByToken(token, callback) {

    if (token == null)
        callback(new Error('Token is null'));

    const key = utility.getSessionKey(token);

    redisClient.get(key, (err, userData) => {
        if (err) {
            callback(err);
        }
        if (userData != null) {

            const keyId = utility.getSessionKeyId(key);

            var dataDecrypt = JSON.parse(utility.decrypt(userData));

            if (keyId != dataDecrypt._id) {
                callback(new Error('Token Info no found'));
            } else {
                callback(null, dataDecrypt);
            }

        } else {
            callback(new Error('Token Not Found'));
        }
    });
}

/*
 * Expires a token by deleting the entry in redis
 * callback(null, true) if successfuly deleted
 */
export function expireToken(token, callback) {
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
}

export function findByPattern(key, callback) {

    const keyId = utility.getSessionKeyId(key);
    redisClient.delwild(`${keyId}:*`, (error, numberDeletedKeys) => {
        console.log('Remove others sessions: ', numberDeletedKeys);
    });
}
