
module.exports = (Schema) => {

	Schema.methods = {

		authenticate: function (plainText) {

			console.log('passss');
			//console.log(this.name);

			return true;
		}

	}

};