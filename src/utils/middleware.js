const tokenExtractor = (req, _res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  else {
    req.token = null;
  }
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send("Unknown endpoint");
};

const errorHandler = (err, _req, res, _next) => {
  console.log(err);
  res.status(500).send("Internal server error");
};

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
};