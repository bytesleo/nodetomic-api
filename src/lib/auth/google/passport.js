import passport from 'passport';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

export function setup(User, config) {
    passport.use(new GoogleStrategy({
        clientID: config.oAuth.google.clientID,
        clientSecret: config.oAuth.google.clientSecret,
        callbackURL: config.oAuth.google.callbackURL
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({provider: 'google', 'social.id': profile.id}).exec().then(user => {

            if (!user) {
                user = new User({
                    name: profile.displayName,
                    username: profile.username,
                    provider: 'google',
                    photo: profile._json.image.url,
                    'social.id': profile.id,
                    'social.info': profile._json
                });
            } else {
                user.social.info = profile._json;
                user.photo = profile._json.image.url;
                user.last_login = Date.now();
            }

            user.save(err => {
                if (err)
                    return done(err);
                done(err, user);
            });

        }).catch(err => done(err));

    }));
}
