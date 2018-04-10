import express from 'express';
import { mw } from './../../auth/services/mw.service';
import * as controller from './../controllers/user.controller';

const router = express.Router();

router.post('/', controller.create);
router.put('/', mw(), controller.update);
router.get('/me', mw(), controller.me);
router.get('/public/:username', controller.read);

router.get('/admin', mw(['admin']), controller.listAdmin);
router.put('/admin/:id', mw(['admin']), controller.updateAdmin);
router.delete('/admin/:id', mw(['admin']), controller.destroyAdmin);

export default router;