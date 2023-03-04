require('dotenv').config({
  path: './config.env',
});
const express = require('express');
const productRoute = require('./routes/productRoute');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const port = process.env.PORT;

const app = express();

// DB connections
require('./connection/connection');

// middleware
app.use(express.json());

// own middleware
app.use('/api/v1/kabadi', productRoute);

// handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

console.log({ en: process.env.NODE_ENV });
// assign the server
app.listen(port, () => {
  console.log('server is running to the port of', port);
});
