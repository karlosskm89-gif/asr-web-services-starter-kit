// core/middleware/validators/contactValidator.js
const { body, validationResult } = require("express-validator");

const contactValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("details").optional().trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.validationErrors = errors.array();
    } else {
      req.validationErrors = [];
    }
    next();
  },
];

module.exports = { contactValidator };
