const crypto = require("crypto");
const { AppError } = require("../utils/appError");

function makeToken() {
  return crypto.randomBytes(32).toString("hex");
}

function generateCsrfToken(req, res, next) {
  let token = req.cookies._csrf;

  if (!token) {
    token = makeToken();
    res.cookie("_csrf", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }

  req.csrfToken = () => token;
  res.locals.csrfToken = token;

  return next();
}

function csrfProtection(req, res, next) {
  const cookieToken = req.cookies._csrf;
  const bodyToken = req.body._csrf;

  if (!cookieToken || !bodyToken || cookieToken !== bodyToken) {
    return next(
      new AppError(403, "Invalid CSRF token", {
        code: "EBADCSRFTOKEN",
        isOperational: true,
        meta: {
          hasCookie: Boolean(cookieToken),
          hasBodyToken: Boolean(bodyToken),
        },
      })
    );
  }

  return next();
}

module.exports = {
  generateCsrfToken,
  csrfProtection,
};
