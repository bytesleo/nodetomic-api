import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import User from '../../api/models/user.model';
import config from '../../config';

passport.use(new GitHubStrategy({
  clientID: config.oAuth.github.clientID,
  clientSecret: config.oAuth.github.clientSecret,
  callbackURL: config.oAuth.github.callbackURL
}, (accessToken, refreshToken, profile, done) => {

  let social = profile;
  social.email = profile._json.email;
  social.photo = profile._json.avatar_url;

  User.loginBySocial('github', social)
    .then(user => done(null, user))
    .catch(err => done(err));

}));