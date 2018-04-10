import express from 'express';
import * as controller from './../controllers/example.controller';

const router = express.Router();

router.get('/greeting', controller.list);
router.post('/greeting', controller.create);
router.put('/greeting/:id', controller.update);
router.get('/greeting/:id', controller.read);
router.delete('/greeting/:id', controller.destroy);
router.get('/socket', controller.animation);

export default router;