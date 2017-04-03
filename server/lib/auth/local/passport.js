var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = (User, config) => {

    passport.use(new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

    }, (username, password, done) => {

        User.findOne({
            username: username,
            password: password,
            provider: 'local'
        }, (err, user) => {
            if (err)
                return done(err);

            if (!user) {
                return done(null, false, {message: `'${username}' is not registered.`}); // You can register user here
            }

            if (!user.authenticate(password)) {
                return done(null, false, {message: 'This password is not correct.'});
            }

            user.last_login = Date.now(); //save log last_login
            user.save(err => {
                if (err)
                    return done(err);
                return done(null, user);
            });
        });
    }));

};
