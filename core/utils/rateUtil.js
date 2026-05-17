// core/utils/rateUtil.js
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const { getInt } = require("./config");

function createRateLimiter(options = {}) {
  const windowMs = options.windowMs ?? getInt("RATE_WINDOW_MS", 60 * 1000);
  const limit = options.limit ?? getInt("RATE_MAX", 60);

  return rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler(req, res, next) {
      // Let the global error handler deal with it
      const err = new Error("Too many requests");
      err.status = 429;
      next(err);
    },
  });
}

function createSlowDown(options = {}) {
  const windowMs = options.windowMs ?? 60 * 1000;
  const delayAfter = options.delayAfter ?? 10;
  const delayMs = options.delayMs ?? 500;

  return slowDown({
    windowMs,
    delayAfter,
    // express-slow-down v2 expects a function here.
    delayMs: () => delayMs,
  });
}

module.exports = {
  createRateLimiter,
  createSlowDown,
};
