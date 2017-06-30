import express from 'express';
import * as auth from '../../lib/auth/middleware';
import * as controller from './user.controller';
import * as controllerAdmin from './user.controller.admin';

const router = express.Router();

router.get('/', auth.isAuthenticated(['admin']), controllerAdmin.list);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.read);
router.post('/', controller.create);
router.put('/', auth.isAuthenticated(), controller.update);
router.put('/:id', auth.isAuthenticated(['admin']), controllerAdmin.update);
router.delete('/:id', auth.isAuthenticated(['admin']), controllerAdmin.remove);

export default router;
