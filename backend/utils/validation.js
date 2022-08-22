const { validationResult } = require('express-validator');
const { ValidationError } = require('sequelize')

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .map((error) => errors[error.param] = error.msg)

    const err = new ValidationError('Validation Error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }

  next();
};


module.exports = { handleValidationErrors }
