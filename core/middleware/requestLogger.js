// core/middleware/requestLogger.js
const logger = require("../utils/logger");

function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationNs = Number(process.hrtime.bigint() - start);
    const durationMs = durationNs / 1e6;

    logger.info(`${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      durationMs: Math.round(durationMs),
    });
  });

  next();
}

module.exports = requestLogger;
