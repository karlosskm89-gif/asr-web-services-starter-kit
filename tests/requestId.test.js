// tests/requestId.test.js

const test = require("node:test");
const assert = require("node:assert/strict");

const requestId = require("../core/middleware/requestId");

test("requestId middleware adds req.id and X-Request-ID header", () => {
  const req = {};
  const headers = {};
  const res = {
    setHeader(name, value) {
      headers[name] = value;
    },
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  requestId(req, res, next);

  assert.ok(nextCalled, "next should be called");
  assert.ok(req.id, "req.id should be set");
  assert.equal(
    headers["X-Request-ID"],
    req.id,
    "X-Request-ID header should match req.id"
  );
});
