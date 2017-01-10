
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


exports.setup = function (User, config) {

    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
            function (username, password, done) {

                User.findOne({
                    name: username,
                    password: password,
                    provider: 'local'
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        return done(null, false, {message: `'${username}' is not registered.`});// You can register user here
                    }

                    if (!user.authenticate(password)) {
                        return done(null, false, {message: 'This password is not correct.'});
                    }

                    user.last_login = Date.now(); //save log last_login
                    user.save(function (err) {
                        if (err)
                            return done(err);
                        return done(null, user);
                    });
                });
            }));

};