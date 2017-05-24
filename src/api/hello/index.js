import express from 'express';
import * as controller from './hello.controller';

const router = express.Router();

/**
 * @swagger
 * /hello/all:
 *   get:
 *     tags:
 *       - Hello
 *     summary: Add a new pet to the store
 *     description: Returns all hello
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Hello
 *         schema:
 *           type: array
 *           items:
 *            $ref: '#/definitions/Hello'
 *       500:
 *         description: Invalid status value
 */

router.get('/all', controller.all);

export default router;
