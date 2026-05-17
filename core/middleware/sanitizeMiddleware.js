// core/middleware/sanitizeMiddleware.js
module.exports = function sanitizeMiddleware(req, res, next) {
  ["body", "query"].forEach((src) => {
    if (!req[src]) return;
    for (const key of Object.keys(req[src])) {
      const val = req[src][key];
      if (typeof val === "string") {
        // trim + collapse weird whitespace
        req[src][key] = val.replace(/\r\n/g, "\n").trim();
      }
    }
  });

  next();
};
