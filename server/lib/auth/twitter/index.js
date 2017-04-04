import express from 'express';
import passport from 'passport';
import auth from '../service';

const router = express.Router();

router.get('/', passport.authenticate('twitter')).get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
}), (req, res) => {
    auth.start(req, res, 'social');
});

export default router;
