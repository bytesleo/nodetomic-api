import express from 'express';
import * as controller from './file.controller';

const router = express.Router();

router.get('/upload', controller.upload);

export default router;
