// core/index.js
const mailer = require("./utils/mailer");
const { asyncHandler } = require("./utils/asyncHandler");
const validators = require("./middleware/validators");
const { rateLimiter } = require("./middleware/rateLimiter");
const { contactLimiter } = require("./middleware/limits");
const { csrfProtection, generateCsrfToken } = require("./middleware/csrf");
const helmetMiddleware = require("./middleware/helmet");
const slowDown = require("./middleware/slowDown");
const requestLogger = require("./middleware/requestLogger");

module.exports = {
  ...mailer,        // sendMail
  asyncHandler,
  ...validators,    // contactValidator, etc.
  rateLimiter,
  contactLimiter,
  csrfProtection,
  generateCsrfToken,
  helmet: helmetMiddleware,
  slowDown,
  requestLogger,
};
