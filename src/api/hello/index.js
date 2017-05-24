import express from 'express';
import * as controller from './hello.controller';

const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     tags:
 *       - Hello
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

router.get('/', controller.all);

/**
 * @swagger
 * /api/hello/{id}:
 *   get:
 *     tags:
 *       - Hello
 *     description: Returns a single Hello
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Hello's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Hello
 *         schema:
 *           $ref: '#/definitions/Hello'
 */

router.get('/:id', controller.read);

/**
 * @swagger
 * /api/hello:
 *   post:
 *     tags:
 *       - Hello
 *     description: Creates a new Hello
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Hello's greet
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Hello'
 *     responses:
 *       200:
 *         description: object Hello created
 */

router.post('/', controller.create);

/**
 * @swagger
 * /api/hello/{id}:
 *   put:
 *     tags:
 *       - Hello
 *     description: Updates a single Hello
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: Hello's id
 *         in: path
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Fields for the Hello resource
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Hello'
 *     responses:
 *       200:
 *         description: object Hello updated
 */

router.put('/:id', controller.update);

/**
 * @swagger
 * /api/hello/{id}:
 *  delete:
 *     tags:
 *       - Hello
 *     description: Deletes a single Hello
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Hello's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object deleted
 */

router.delete('/:id', controller.remove);

export default router;
