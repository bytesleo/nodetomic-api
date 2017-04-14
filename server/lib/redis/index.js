import * as Redis from 'redis';
import Promise from 'bluebird';
import * as utility from '../utility';
import config from '../../config';

Promise.promisifyAll(Redis);

require('redis-delete-wildcard')(Redis);

const db = Redis.createClient(config.redis.token.port, config.redis.token.ip);

db.on("connect", () => {
    console.log(`Redis connected on ${config.redis.token.ip}:${config.redis.token.port}`);
});

db.on("error", err => {
    console.log("Redis-> " + err);
});

export function set(key, ttl, value) {
    value.ttl = {
        asign: ttl,
        created: value.ts || (new Date().getTime())
    }
    let dataEncrypt = utility.encrypt(JSON.stringify(value));
    return db.setexAsync(key, ttl, dataEncrypt);
}

export function get(key) {
    return db.getAsync(key);
}

export function findByPattern(key) {

    let id = key.split(':')[0];
    db.delwild(`${id}:*`, function(err, res) {
        console.log('sessions deleted->', res);
    })
}
