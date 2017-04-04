//require
import express from 'express';
import * as auth from '../../lib/auth/middleware';
import * as controller from './user.controller';

// Router
const router = express.Router();

// Rest Api
router.get('/index', auth.isAuthenticated(), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);

export default router;
