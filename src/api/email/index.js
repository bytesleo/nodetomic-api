import express from 'express';
import * as controller from './email.controller';

const router = express.Router();

router.get('/index', controller.index);

export default router;
