// core/middleware/limits.js
const { createRateLimiter } = require("../utils/rateUtil");
const { getInt } = require("../utils/config");

const contactLimiter = createRateLimiter({
  windowMs: getInt("CONTACT_RATE_WINDOW_MS", 60 * 60 * 1000),
  limit: getInt("CONTACT_RATE_MAX", 5),
});

module.exports = {
  contactLimiter,
};
