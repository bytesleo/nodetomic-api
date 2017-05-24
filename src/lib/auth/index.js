import express from 'express';
import passport from 'passport';
import User from '../../api/user/user.model';
import config from '../../config';

//Call back login Social return info in req.user

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//initialize passport
require('./local/local.passport').setup(User, config);
require('./github/github.passport').setup(User, config);
// require('./twitter/twitter.passport').setup(User, config);
// require('./facebook/facebook.passport').setup(User, config);
// require('./google/google.passport').setup(User, config);
// require('./bitbucket/bitbucket.passport').setup(User, config);

//Routers
const router = express.Router();

router.use('/local', require('./local').default);
router.use('/github', require('./github').default);
// router.use('/twitter', require('./twitter').default);
// router.use('/facebook', require('./facebook').default);
// router.use('/google', require('./google').default);
// router.use('/bitbucket', require('./bitbucket').default);

export default router;
