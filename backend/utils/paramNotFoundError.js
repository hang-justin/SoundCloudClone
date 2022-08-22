const paramNotFoundErrFor = (param) => {
  if (typeof param === 'string') {
    param = param[0].toUpperCase() + param.slice(1).toLowerCase();

    const err = new Error(`${param} couldn't be found.`)
    err.title = 'Param not found';
    err.status = 404;
    return err;
  }
}

const paramNotFoundErrHandler = (err, _req, res, next) => {
  if (err.title === 'Param not found') {
    res.statusCode = 404;

    return res.json({
      message: err.message,
      statusCode: err.status
    })
  }

  next(err);
}

module.exports = { paramNotFoundErrFor, paramNotFoundErrHandler }
