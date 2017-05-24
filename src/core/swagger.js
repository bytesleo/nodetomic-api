var swaggerJSDoc = require('swagger-jsdoc');
import config from '../config';

export default(app) => {

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
    basePath: '/api'
  };

  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [config.base + '/**/*.js']
  };

  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

};
