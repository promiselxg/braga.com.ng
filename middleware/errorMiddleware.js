const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let message = '';

  //  Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found.';
    statusCode = 404;
  }
  //  Mongoose Duplicate Key
  if (err.code === 11000) {
    message = 'Duplicate field value entered.';
    statusCode = 400;
  }
  //  Validation Error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message);
    statusCode = 400;
  }
  res.status(statusCode);
  return res.json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
