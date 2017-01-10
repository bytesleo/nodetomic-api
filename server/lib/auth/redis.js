var redis = require('redis');

var config = require('../../core/config');

var redisClient = redis.createClient(config.redis.token.port,config.redis.token.ip);


redisClient.on('error', function(err) {
	throw err;
});

/*
*work with DB redis
redisClient.select(2, function(err,res){

});*/


/*
* Stores a token with user data for a ttl period of time
* token: String - Token used as the key in redis 
* data: Object - value stored with the token 
* ttl: Number - Time to Live in seconds (default: 24Hours)
* callback: Function
*/
exports.setTokenWithData = function(token, data, ttl, callback) {
	if (token == null) throw new Error('Token is null');
	if (data != null && typeof data !== 'object') throw new Error('data is not an Object');

	var userData = data || {};
	userData._ts = new Date();

	var timeToLive = ttl;
	if (timeToLive != null && typeof timeToLive !== 'number') throw new Error('TimeToLive is not a Number');


	redisClient.setex(token, timeToLive, JSON.stringify(userData), function(err, reply) {
		if (err) callback(err);

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
exports.getDataByToken = function(token, callback) {
	if (token == null) callback(new Error('Token is null'));

	redisClient.get(token, function(err, userData) {
		if (err) callback(err);
		if (userData != null) callback(null, JSON.parse(userData));
		else callback(new Error('Token Not Found'));
	});
};

/*
* Expires a token by deleting the entry in redis
* callback(null, true) if successfuly deleted
*/
exports.expireToken = function(token, callback) {
	if (token == null) callback(new Error('Token is null'));

	redisClient.select(1, function(err,res){
		redisClient.del(token, function(err, reply) {
			if (err) callback(err);

			if (reply) callback(null, true);
			else callback(new Error('Token not found'));
		});
	});
};


exports.getCount = function(callback) {

	redisClient.keys("*", function (err, keys) {

		callback(null, {clients: keys.length});
		/*redisClient.select(1, function(err,sessions){
			callback(null, {clients: clients.length, sessions: sessions.length });
		});*/

	});
	
};