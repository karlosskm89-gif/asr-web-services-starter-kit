// core/middleware/helmet.js
const helmet = require("helmet");

module.exports = (req, res, next) => {
  helmet({
    contentSecurityPolicy: false,
  })(req, res, next);
};
