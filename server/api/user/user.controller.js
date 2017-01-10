'use strict';

/* get models */
const User = require('./user.model');
//const config = require('../../core/config');

module.exports = {

	/* Methods */
	create(req, res){

		 // create a sample user
		  var nick = new User({ 
		    name: 'admin', 
		    password: '123',
		    provider: 'local'
		  });


		 // save the sample user
		 nick.save(function(err) {
		    if (err) throw err;

		    console.log('User saved successfully');
		    res.json({ success: true });
		 });


	   // return res.status(200).json({status : true}); 
	},


	read(req, res){

		User.find({}, function(err, users) {
			res.json(users);
		});

	}


	
	
}