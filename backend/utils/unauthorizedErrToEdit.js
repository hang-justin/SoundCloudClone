const unauthorizedErrToEdit = (field) => {

  if (typeof field === 'string') {
    field = field.toLowerCase();

    const err = new Error(`Unauthorized to edit this ${field}.`);
    err.title = 'Unauthorized';
    err.status = 403;
    return err;
  }

}

const unauthorizedEditErrHandler = (err, _req, res, next) => {
  if (err.title === 'Unauthorized') {
    res.statusCode = 403;

    return res.json({
      message: err.message,
      statusCode: err.status
    })
  }

  next(err);
}

module.exports = { unauthorizedErrToEdit, unauthorizedEditErrHandler }
