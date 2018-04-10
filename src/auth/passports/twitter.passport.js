import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from '../../api/models/user.model';
import config from '../../config';

passport.use(new TwitterStrategy({
  consumerKey: config.oAuth.twitter.clientID,
  consumerSecret: config.oAuth.twitter.clientSecret,
  callbackURL: config.oAuth.twitter.callbackURL
}, (token, tokenSecret, profile, done) => {

  let social = profile;
  social.email = profile.emails[0].value;
  social.photo = profile._json.profile_image_url;

  User.loginBySocial('twitter', social)
    .then(user => done(null, user))
    .catch(err => done(err));

}));