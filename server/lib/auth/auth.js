const config = require('../../core/config');

var redisHelper = require('./redis');
var tokenHelper = require('./token');


/*
* Middleware to verify the token and store the user data in req._user
*/
exports.verify = function(req, res, next) {

	var headers = req.headers;
	if (headers == null) return res.status(401).send('401');

	// Extract Token from header x-access-token
	tokenHelper.extractTokenFromHeader(req,function(err,token){

		if (err) 
			return res.status(401).send(err);

			//Verify it in redis, set data in req.user
			redisHelper.getDataByToken(token, function(err, data) {
				if (err) 
					return res.status(401).send('Unauthorized');
				req.user = data;
				next();
			});
		});
};


/*
* Create a new token, stores it in redis with data during ttl time in seconds
* callback(err, token);
*/
exports.createAndStoreToken = function(data, ttl, callback) {

	data = data || {};
	ttl = ttl || config.redis.token.time;

	if (data != null && typeof data !== 'object') callback(new Error('data is not an Object'));
	if (ttl != null && typeof ttl !== 'number') callback(new Error('ttl is not a valid Number'));

	

	tokenHelper.createToken(data,function(err, token) {
		if (err) callback(err);

		redisHelper.setTokenWithData(token, data, ttl, function(err, success) {
			if (err) callback(err);

			if (success) {
				callback(null, token);
			}
			else {
				callback(new Error('Error when saving token'));
			}
		});
	});
	
};

/*
* Expires the token (remove from redis)
*/
exports.expireToken = function(headers, callback) {
	if (headers == null) callback(new Error('Headers are null'));
	// Get token
	try {
		var token = tokenHelper.extractTokenFromHeader(headers);

		if (token == null) callback(new Error('Token is null'));

		redisHelper.expireToken(token, callback);
	} catch (err) {
		console.log(err);
		return callback(err);
	}	
}

/*
* Initialization token session
*/

exports.init = function(req, res, type) {

	var user = req.user;

	//req.user = null;
	this.createAndStoreToken(user, null, function(err, token) {//key, data, time session
		if (err) {
			return res.status(400);
		} 	
		switch(type){
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
}

/*
* Get count session
*/
exports.getCount = function(callback){
	redisHelper.getCount(callback);
};
