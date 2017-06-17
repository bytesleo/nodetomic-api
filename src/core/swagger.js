import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config';

export default(app) => {

  if (config.swagger.enabled) {

    // let host = `${config.server.ip}:${config.server.port}`;
    let host = null;

    // swagger definition
    let swaggerDefinition = {
      info: config.swagger.info,
      // host: host,
      basePath: '/',
      schemes: [
        'http', 'https'
      ],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization', in: 'header'
        },
        "iss_a": {
          "type": "oauth2",
          "authorizationUrl": `/auth/github`,
          "flow": "authorization_code",
          // "tokenUrl": "https://xxxxxxxxxxxx.xxx.co...",
        }
      }
    };
    // options for the swagger docs
    let options = {
      // import swaggerDefinitions
      swaggerDefinition: swaggerDefinition,
      // path to the API docs
      apis: [`${config.base}/**/*.yaml`]
    };
    // initialize swagger-jsdoc
    let swaggerSpec = swaggerJSDoc(options);
    // serve swagger
    app.get('/swagger.json', function(req, res) {
      // console.log(req.header('http'));
      // console.log(req.secure);
      // console.log(req.header('X-Forwaded-Proto'));
      // console.log(req.params.pepe);
      // let host = req.headers.host;
      // let host = req.headers.host;
      // console.log(req.get('host'));
      // console.log(req.headers.origin);
      // swaggerSpec.host = host;
      // swaggerSpec.securityDefinitions.iss_a.authorizationUrl =
      // console.log(swaggerSpec.securityDefinitions.iss_a.authorizationUrl);
      res.json(swaggerSpec);
    });
  }

  // If you want use Swagger into .js = ${config.base}/**/*.js

  /**
   * @swagger
   * definitions:
   *   Example:
   *     properties:
   *       field1:
   *         type: string
   *       field2:
   *         type: string
   */

  /**
   * @swagger
   * /api/example:
   *   get:
   *     tags:
   *       - Example
   *     description: Returns all Example's
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of Example's
   *         schema:
   *           type: array
   *           items:
   *            $ref: '/definitions/Example'
   *       500:
   *         description: Invalid status value
   */

};
