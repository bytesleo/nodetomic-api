import express from 'express';
import * as auth from '../../lib/auth/middleware';
import * as controller from './user.controller';

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns list of Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of User
 *         schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/User'
 *       401:
 *         description: Error Unauthorized
 *     security:
 *       - Bearer: []
 */

router.get('/', auth.isAuthenticated(['user']), controller.all);

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     description: Returns session User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of User
 *         schema:
 *            $ref: '#/definitions/User'
 *       401:
 *         description: Error Unauthorized
 *     security:
 *       - Bearer: []
 */

router.get('/me', auth.isAuthenticated(), controller.me);

export default router;
