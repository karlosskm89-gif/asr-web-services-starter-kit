// core/middleware/rateLimiter.js
const { createRateLimiter } = require("../utils/rateUtil");

const shouldBypassRateLimit =
  process.env.NODE_ENV === "test" ||
  process.env.NODE_ENV === "development" ||
  process.env.BYPASS_RATE_LIMIT === "true" ||
  process.env.ASR_TEST_BYPASS_RATE_LIMIT === "true";

const rateLimiter = shouldBypassRateLimit
  ? (req, res, next) => next()
  : createRateLimiter();

module.exports = { rateLimiter, shouldBypassRateLimit };
