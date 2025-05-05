const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 4000

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Funcultura API Documentation',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Servidor de desenvolvimento',
    },
    {
      url: `https://funcultura.fourdevs.com.br`,
      description: 'Servidor de produção',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/swagger/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;