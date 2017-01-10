/* get models */
const model = require('./hello.model');
var auth = require('../../lib/auth/auth');

module.exports = {

	/* Methods */
	show(req, res, next){

		auth.getCount(function(err, count) {
			return res.status(200).json({online : count}); 
		});

	   // return res.status(200).json({status : true}); 
	},
	
	delete(req,res,next){
		

	}

}