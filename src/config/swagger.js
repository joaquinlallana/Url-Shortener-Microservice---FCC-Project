const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'A simple URL shortener API service',
      contact: {
        name: 'API Support',
        url: 'https://github.com/yourusername/Url-Shortener-Microservice---FCC-Project'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

module.exports = swaggerJsdoc(options);
