const errorHandler = (err, req, res) => {
  req.send(err.message);
};

module.exports = errorHandler;
