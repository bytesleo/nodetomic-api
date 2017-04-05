import passport from 'passport';
import {Strategy as BitbucketStrategy} from 'passport-bitbucket';

export function setup(User, config) {

    passport.use(new BitbucketStrategy({

        consumerKey: config.oAuth.bitbucket.clientID,
        consumerSecret: config.oAuth.bitbucket.clientSecret,
        callbackURL: config.oAuth.bitbucket.callbackURL

    }, (token, tokenSecret, profile, done) => {

        User.findOne({provider: 'bitbucket', 'social.id': profile.id}).exec().then(user => {

            if (!user) {

                user = new User({
                    name: profile.displayName,
                    username: profile.username,
                    email: profile._json.email || '',
                    provider: 'bitbucket',
                    photo: profile._json.links.avatar.href,
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
                user.photo = profile._json.links.avatar.href;
                user.last_login = Date.now();
                user.save(err => {
                    if (err)
                        return done(err);
                    return done(err, user);
                });

            }

        }).catch(err => done(err));

    }));
}
