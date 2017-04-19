import * as Redis from 'redis';
import Promise from 'bluebird';
import * as utility from '../utility';
import config from '../../config';

Promise.promisifyAll(Redis);

require('redis-delete-wildcard')(Redis);

const db = Redis.createClient({url: config.redis.token.uri});

require('./status').default(db, config.redis.token.uri);

export function set(key, ttl, value) {

  value.ttl = {
    assigned: ttl,
    created: value.ts || (new Date().getTime())
  }
  let dataEncrypt = utility.encrypt(JSON.stringify(value));
  return db.setexAsync(key, ttl, dataEncrypt);

}

export function get(key) {

  return db.getAsync(key);

}

export function remove(key) {

  return db.delAsync(key);

}

export function findAndRemoveById(key) {

  let id = key.split(':')[0];
  db.delwild(`${id}:*`, function(err, res) {
    console.log('sessions deleted->', res);
  });

}
