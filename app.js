const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const productsRouter = require('./routes/products');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products API</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

module.exports = app;