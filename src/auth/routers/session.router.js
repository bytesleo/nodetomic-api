import express from 'express';
import { mw } from './../services/mw.service';
import * as controller from './../controllers/session.controller';

const router = express.Router();

router.get('/', mw(), controller.list);
router.delete('/logout', mw(), controller.logout);
router.delete('/:id', mw(), controller.destroy);

router.get('/admin/:id', mw(['admin']), controller.listAdmin);
router.delete('/admin/:id', mw(['admin']), controller.destroyAdmin);
router.delete('/admin/logout/:id', mw(['admin']), controller.logoutAdmin);

export default router;