const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
}

module.exports = errorHandler;