import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(User, config) {

    passport.use(new FacebookStrategy({
        clientID: config.oAuth.facebook.clientID,
        clientSecret: config.oAuth.facebook.clientSecret,
        callbackURL: config.oAuth.facebook.callbackURL
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({provider: 'facebook', 'social.id': profile.id}).exec().then(user => {

            if (!user) {
                user = new User({
                    name: profile.displayName,
                    username: profile.username || '',
                    email: profile.emails[0].value || '',
                    provider: 'facebook',
                    photo: `http://graph.facebook.com/${profile.id}/picture?type=square`,
                    'social.id': profile.id,
                    'social.info': profile._json
                });
            } else {
                user.social.info = profile._json;
                user.photo = `http://graph.facebook.com/${profile.id}/picture?type=square`;
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
