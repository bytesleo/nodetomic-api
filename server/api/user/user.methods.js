'use strict';

//libs
const bcrypt = require('bcrypt');

module.exports = (User) => {

    User.methods = {

        authenticate(candidatePassword) {
            return bcrypt.compare(candidatePassword, this.password).then(isMatch => {
                return isMatch;
            });
        }

    };

    User.pre('save', function(next) {
        var user = this;
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password'))
            return next();

        // generate a salt
        bcrypt.genSalt(10, (err, salt) => {
            if (err)
                return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err)
                    return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });
    
};
