const errorHandler = (err, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Server Error';
  res.status(statusCode).json({ message: message });
};

