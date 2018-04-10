import express from 'express';
import * as controller from './../controllers/local.controller';

const router = express.Router();

router.post('/', controller.callback);

export default router;