import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config';
import fs from 'fs';

export default(app) => {

  if (config.swagger.enabled) {

    fs.readdirSync(`${config.base}/api`).forEach(version => {

      let options = {
        // import swaggerDefinitions
        swaggerDefinition: {
          info: {
            version : version,
            title : config.swagger.title,
            description : config.swagger.description,
            contact : config.swagger.contact,
            license : config.swagger.license,
          },
          // basePath: `/api/${version}`,
          basePath: `/`,
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
        },
        // path to the API docs
        apis:  [`${config.base}/api/${version}/**/*.yaml`,`${config.base}/lib/**/*.yaml`]
      };

      let swaggerSpec = swaggerJSDoc(options);

      app.get(`/${version}/swagger.json`, function(req, res) {
        res.json(swaggerSpec);
      });

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
