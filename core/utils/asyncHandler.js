// core/utils/asyncHandler.js

/**
 * Wrap an async route handler so rejected promises go to next(err).
 *
 * @param {Function} fn - (req, res, next) => Promise<any>
 * @returns {Function} Express-compatible middleware
 */
function asyncHandler(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("asyncHandler expects a function");
  }

  return function wrappedAsyncHandler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Convenience helper for wrapping many controller functions:
 *
 * const wrapped = wrapHandlers(controller);
 * router.get("/", wrapped.home);
 */
function wrapHandlers(handlers) {
  const wrapped = {};

  for (const [key, value] of Object.entries(handlers)) {
    if (typeof value === "function") {
      wrapped[key] = asyncHandler(value);
    } else {
      wrapped[key] = value;
    }
  }

  return wrapped;
}

module.exports = {
  asyncHandler,
  wrapHandlers,
};
