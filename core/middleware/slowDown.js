// core/middleware/slowDown.js
const { createSlowDown } = require("../utils/rateUtil");


const slowDownMiddleware =
  process.env.NODE_ENV === "production"
    ? createSlowDown()
    : (req, res, next) => next();

module.exports = slowDownMiddleware;