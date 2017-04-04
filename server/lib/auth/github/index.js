import express from 'express';
import passport from 'passport';
import auth from '../service';

const router = express.Router();

router.get('/', passport.authenticate('github')).get('/callback', passport.authenticate('github', {
    failureRedirect: '/signup',
    session: false
}), (req, res) => {
    auth.start(req, res, 'social');
});

export default router;
