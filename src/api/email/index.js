import express from 'express';
import * as controller from './email.controller';

const router = express.Router();

router.get('/', controller.index);
router.get('/v/:folder/:name', controller.preview);

export default router;
