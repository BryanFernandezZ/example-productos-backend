// swagger-config.js
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./index.js'], // Apunta a index.js si todas tus rutas están en este archivo
};

module.exports = swaggerOptions;
