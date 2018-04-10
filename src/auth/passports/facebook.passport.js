import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../../api/models/user.model';
import config from '../../config';

passport.use(new FacebookStrategy({
  clientID: config.oAuth.facebook.clientID,
  clientSecret: config.oAuth.facebook.clientSecret,
  callbackURL: config.oAuth.facebook.callbackURL
}, (accessToken, refreshToken, profile, done) => {

  let social = profile;
  social.email = profile.emails[0].value;
  social.photo = `http://graph.facebook.com/${profile.id}/picture?type=square`;

  User.loginBySocial('facebook', social)
    .then(user => done(null, user))
    .catch(err => done(err));

}));