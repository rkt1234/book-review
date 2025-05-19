const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '📚 Book Review API',
      version: '1.0.0',
      description: 'A REST API for books, reviews, and user authentication',
    },
    servers: [
      {
        url: `${process.env.SERVER_URL || 'http://localhost:3000'}/api`
      }
    ],
    tags: [
        { name: 'Auth', description: 'Authentication routes' },
        { name: 'Books', description: 'Book management' },
        { name: 'Reviews', description: 'Review management' },
        { name: 'Search', description: 'Search functionality' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
