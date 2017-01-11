
var passport = require('passport');
var BitbucketStrategy = require('passport-bitbucket').Strategy;

exports.setup = function (User, config) {

    passport.use(new BitbucketStrategy({
        consumerKey: config.bitbucket.clientID,
        consumerSecret: config.bitbucket.clientSecret,
        callbackURL: config.bitbucket.callbackURL
    },
            function (token, tokenSecret, profile, done) {

                User.findOne({
                    provider: 'bitbucket',
                    'social.id': profile.id
                }, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            username: profile.username,
                            email: profile._json.email ? profile._json.email : '',
                            provider: 'bitbucket',
                            photo: profile._json.links.avatar.href,
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
                        user.photo = profile._json.links.avatar.href;
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
