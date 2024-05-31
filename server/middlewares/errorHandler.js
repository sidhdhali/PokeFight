const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';
  res.status(statusCode).json({ message: message });
};

export default errorHandler;