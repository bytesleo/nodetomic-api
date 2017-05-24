var swaggerJSDoc = require('swagger-jsdoc');
import config from '../config';

export default (app) => {

  // swagger definition
  var swaggerDefinition = {
    info: {
      title: 'Nodetomic Swagger API',
      version: '1.4.5',
      description: 'Nodetomic RESTful API with Swagger',
      "contact": {
        "name": "Nodetomic Developer",
        "url": "http://www.example.com",
        "email": "example@example.com"
      },
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    host: `${config.server.ip}:${config.server.port}`,
    basePath: '/',
    schemes: [
      'http', 'https'
    ],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in : 'header'
      },
      "iss_a": {
        "type": "oauth2",
        "authorizationUrl": `http://${config.server.ip}:${config.server.port}/auth/github`,
        "flow": "authorization_code",
        // "tokenUrl": "https://xxxxxxxxxxxx.xxx.co...",
      }
    }
  };

  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [`${config.base}/**/*.yaml`]
  };

  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  app.get('/swagger.json', function(req, res) {
    res.json(swaggerSpec);
  });

  // If you want Swagger into .js = ${config.base}/**/*.js

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
