import express from 'express';
import * as controller from './hello.controller';

const router = express.Router();

router.get('/all', controller.all);

export default router;
