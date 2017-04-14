import express from 'express';
import * as auth from '../../lib/auth/middleware';
import * as controller from './user.controller';

const router = express.Router();

router.get('/all', auth.isAuthenticated(['user']), controller.all);
router.get('/me', auth.isAuthenticated(), controller.me);

export default router;
