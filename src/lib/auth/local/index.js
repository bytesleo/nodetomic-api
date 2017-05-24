import express from 'express';
import passport from 'passport';
import * as auth from '../service';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /auth/local:
 *   post:
 *     tags:
 *       - Login
 *     description: Login user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Login user
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: object user reponse
 */

router.post('/', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {

    const error = err || info;
    if (error)
      return res.status(400).json(error);
    if (!user)
      return res.status(404).json({message: 'Something went wrong, please try again.'});

    req.user = user;

    auth.start(req, res, 'local');

  })(req, res, next);

});

export default router;
