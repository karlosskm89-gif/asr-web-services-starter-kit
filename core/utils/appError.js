// core/utils/appError.js

class AppError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g. 400, 403, 404, 500)
   * @param {string} message - Human-readable message
   * @param {object} [options]
   * @param {string} [options.code] - Short error code (e.g. "EBADCSRFTOKEN")
   * @param {boolean} [options.isOperational] - True for known/expected errors
   * @param {object} [options.meta] - Extra context for logging
   */
  constructor(statusCode, message, options = {}) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.code = options.code || undefined;
    this.isOperational = options.isOperational !== false; // default true
    this.meta = options.meta || {};

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Convenience factory
 */
function createError(statusCode, message, options) {
  return new AppError(statusCode, message, options);
}

module.exports = {
  AppError,
  createError,
};
