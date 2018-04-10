import express from 'express';
import { mw } from './../services/mw.service';
import * as controller from './../controllers/redis.controller';

const router = express.Router();

router.get('/:section', mw(['admin']), controller.section);

export default router;