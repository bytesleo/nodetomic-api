var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {

    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
            function (accessToken, refreshToken, profile, done) {

                User.findOne({
                    provider: 'facebook',
                    'social.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            username: profile.username || '',
                            email: profile.emails ? profile.emails[0].value : '',
                            provider: 'facebook',
                            photo: 'http://graph.facebook.com/' + profile.id + '/picture?type=square',
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
                        user.photo = 'http://graph.facebook.com/' + profile.id + '/picture?type=square';
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