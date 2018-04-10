import passport from 'passport';
import { initialize } from '../services/session.service';

// Callback passport
export function callback(req, res, next) {
  passport.authenticate('local', (err, user) => initialize(err, user, res))(req, res, next);
}