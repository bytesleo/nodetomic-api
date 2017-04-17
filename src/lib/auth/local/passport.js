import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

export function setup(User, config) {

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {

    User.findOne({username: username, provider: 'local'}).exec().then(user => {

      if (!user)
        return done(null, false, {message: `'${username}' is not registered.`}); // You can register user here

      user.authenticate(password).then((isMatch) => { //validate password

        if (!isMatch) {
          return done(null, false, {message: 'This password is not correct.'});
        }
        user.last_login = Date.now(); //save log last_login
        user.save(err => {
          if (err)
            return done(err);
          return done(null, user);
        });
      });

    }).catch(err => done(err));
  }));

}
