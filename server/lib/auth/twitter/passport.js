    var passport = require('passport');
    var TwitterStrategy = require('passport-twitter').Strategy;

    exports.setup = function (User, config) {

        passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL
        },
        function (token, tokenSecret, profile, done) {

            User.findOne({
                provider: 'twitter',
                'social.id': profile.id
            }, function (err, user) {
                if (err) 
                    return done(err);

                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        provider: 'twitter',
                        photo: profile._json.profile_image_url,
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
                    user.photo = profile._json.profile_image_url;
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
