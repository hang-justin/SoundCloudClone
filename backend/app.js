const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const { ValidationError } = require('sequelize')

const app = express();

// Logging information about requests and responses
app.use(morgan('dev'));

// Middleware for parsing cookies and
// parsing for JSON bodies with 'Content-Type' of 'application/json'
app.use(cookieParser());
app.use(express.json());

// Only use cors in development
if (!isProduction) app.use(cors());

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
  })
);

// Set the _csrf token and create req.csrfToken method
// adds a _csrf token that is HTTP-ONLY (can't be read by JS)
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

// <-------------------- ROUTES -------------------->
const routes = require('./routes');
app.use(routes);


// <----------> ERROR HANDLERS <---------->
// Catch unhandled requests
app.use((req, res, next) => {
  const err = new Error(`The requested resource couldn't be found`);
  err.title = `Resource Not Found`;
  err.errors = [`The requested resource couldn't be found.`];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.statusCode = 400;
    return res.json({
      message: err.message,
      statusCode: err.status,
      errors: err.errors
    })
  }

  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);

  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
