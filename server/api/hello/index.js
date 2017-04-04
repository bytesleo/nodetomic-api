import express from 'express';
import * as controller from './hello.controller';

// Router
const router = express.Router();

// Rest Api
router.get('/index', controller.index);

export default router;
