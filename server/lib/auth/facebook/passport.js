var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function(User, config) {

    passport.use(new FacebookStrategy({

        clientID: config.oAuth.facebook.clientID,
        clientSecret: config.oAuth.facebook.clientSecret,
        callbackURL: config.oAuth.facebook.callbackURL

    }, function(accessToken, refreshToken, profile, done) {

        User.findOne({
            provider: 'facebook',
            'social.id': profile.id
        }, (err, user) => {
            if (err)
                return done(err);

            if (!user) {

                user = new User({
                    name: profile.displayName,
                    username: profile.username || '',
                    email: profile.emails[0].value || '',
                    provider: 'facebook',
                    photo: 'http://graph.facebook.com/' + profile.id + '/picture?type=square',
                    'social.id': profile.id,
                    'social.info': profile._json
                });

                user.save(err => {
                    if (err)
                        return done(err);
                    done(err, user);
                });

            } else {

                user.social.info = profile._json;
                user.photo = 'http://graph.facebook.com/' + profile.id + '/picture?type=square';
                user.last_login = Date.now();
                user.save(err => {
                    if (err)
                        return done(err);
                    return done(err, user);
                });

            }
        });

    }));
};
