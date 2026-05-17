// core/middleware/rateLimiter.js
const { createRateLimiter } = require("../utils/rateUtil");

const rateLimiter =
  process.env.NODE_ENV === "production"
    ? createRateLimiter()              // your real options
    : (req, res, next) => next();      // no-op in dev 
  
module.exports = { rateLimiter };
