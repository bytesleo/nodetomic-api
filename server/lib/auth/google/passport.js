var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = (User, config) => {
    passport.use(new GoogleStrategy({

        clientID: config.oAuth.google.clientID,
        clientSecret: config.oAuth.google.clientSecret,
        callbackURL: config.oAuth.google.callbackURL

    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({
            provider: 'google',
            'social.id': profile.id
        }, (err, user) => {
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

                user.save(err => {
                    if (err)
                        return done(err);
                    done(err, user);
                });

            } else {

                user.social.info = profile._json;
                user.photo = profile._json.image.url;
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
