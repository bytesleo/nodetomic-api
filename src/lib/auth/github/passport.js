import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github';

export function setup(User, config) {

  passport.use(new GitHubStrategy({
    clientID: config.oAuth.github.clientID,
    clientSecret: config.oAuth.github.clientSecret,
    callbackURL: config.oAuth.github.callbackURL
  }, (token, tokenSecret, profile, done) => {

    User.findOne({provider: 'github', 'social.id': profile.id}).exec().then(user => {

      if (!user) {
        user = new User({
          name: profile.displayName,
          username: profile.username,
          email: profile._json.email || '',
          provider: 'github',
          photo: profile._json.avatar_url,
          'social.id': profile.id,
          'social.info': profile._json
        });
      } else {
        user.social.info = profile._json;
        user.photo = profile._json.avatar_url;
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
