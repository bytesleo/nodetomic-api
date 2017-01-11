var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },
            function (accessToken, refreshToken, profile, done) {

                User.findOne({
                    provider: 'google',
                    'social.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            username: profile.username,
                            provider: 'google',
                            photo: profile._json.image.url,
                            'social.id': profile.id,
                            'social.info': profile._json
                        });

                        user.save(function (err) {
                            if (err)
                                return done(err);
                            done(err, user);
                        });

                    } else {
                        user.social.info = profile._json;
                        user.photo = profile._json.image.url;
                        user.last_login = Date.now();
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            return done(err, user);
                        });
                    }
                });
            }));
};
