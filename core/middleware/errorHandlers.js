// core/middleware/errorHandlers.js
const { builder } = require("../../config/profileLoader");
const logger = require("../utils/logger");
const { AppError } = require("../utils/appError");

function notFound(req, res, next) {
  // Create a 404 AppError and let errorHandler decide how to render
  const err = new AppError(404, `Not Found: ${req.originalUrl}`, {
    isOperational: true,
    meta: { path: req.originalUrl, method: req.method },
  });
  next(err);
}

function errorHandler(err, req, res, next) {
  // Normalize to AppError where possible
  let error = err;

  if (!(err instanceof AppError)) {
    const statusCode = err.status || err.statusCode || 500;
    error = new AppError(statusCode, err.message || "Internal Server Error", {
      isOperational: false,
    });
    // Preserve original stack if available
    if (err.stack) {
      error.stack = err.stack;
    }
  }

  const statusCode = error.statusCode || 500;

  // Log error
  const logMeta = {
    path: req.originalUrl,
    method: req.method,
    code: error.code,
    statusCode,
    meta: error.meta,
  };

  if (error.isOperational) {
    logger.warn(error.message, logMeta);
  } else {
    logger.error(error.message, {
      ...logMeta,
      stack: error.stack,
    });
  }

  // Decide which view to render
  if (statusCode === 403) {
    return res.status(403).render("403", { builder });
  }

  if (statusCode === 404) {
    return res.status(404).render("404", { builder });
  }

  if (statusCode === 429) {
    return res.status(429).render("429", { builder });
  }

  // Default: 500
  return res.status(500).render("500", { builder });
}

module.exports = {
  notFound,
  errorHandler,
};
