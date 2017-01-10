
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var UserSchema = new Schema({ 
	name: String, 
	username: String,
	password: String, 
	provider: String,
	email: String,
	photo: String,
	role: {
		type: String,
		default: 'user'
	},
	_permissions: {
		type: Schema.Types.ObjectId,
		//ref: 'Permissions'
	},
	status: {
		type: Number,
		default: 1
	},
	date: {
		type: Date,
		default: Date.now
	},
	last_login: {
		type: Date,
		default: Date.now
	},
	social:{
		id:String,
		info:{},
	}
});

require('./user.methods')(UserSchema);

module.exports = mongoose.model('User', UserSchema);