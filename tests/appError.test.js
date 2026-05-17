// tests/appError.test.js

const test = require("node:test");
const assert = require("node:assert/strict");

const { AppError, createError } = require("../core/utils/appError");

test("AppError sets statusCode, status, and message", () => {
  const err = new AppError(404, "Not found");

  assert.equal(err.statusCode, 404);
  assert.equal(err.message, "Not found");
  assert.equal(err.status, "fail");
  assert.equal(err.name, "AppError");
  assert.equal(err.isOperational, true);
});

test("AppError sets status='error' for 5xx", () => {
  const err = new AppError(500, "Server error");
  assert.equal(err.status, "error");
});

test("createError is a convenience factory", () => {
  const err = createError(400, "Bad request", {
    code: "EBADREQUEST",
    isOperational: false,
  });

  assert.ok(err instanceof AppError);
  assert.equal(err.statusCode, 400);
  assert.equal(err.code, "EBADREQUEST");
  assert.equal(err.isOperational, false);
});
