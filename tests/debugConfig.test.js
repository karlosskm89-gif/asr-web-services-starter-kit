// tests/debugConfig.test.js

const test = require("node:test");
const assert = require("node:assert/strict");

const debugController = require("../controllers/debugController");

test("configDebug returns JSON snapshot without secrets", () => {
  const req = {
    id: "test-request-id",
    ip: "127.0.0.1",
    headers: {
      "user-agent": "test-agent",
    },
  };

  let statusCode;
  let body;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      body = payload;
    },
  };

  debugController.configDebug(req, res);

  assert.equal(statusCode, 200);
  assert.ok(body, "body should be set");
  assert.ok(body.env, "env section present");
  assert.ok(body.profile, "profile section present");
  assert.ok(body.rateLimit, "rateLimit section present");
  assert.ok(body.configCheck, "configCheck section present");

  // check requestId is reflected
  assert.equal(
    body.request.id,
    "test-request-id",
    "request.id should appear in snapshot"
  );

  // Ensure we didn't accidentally include raw secrets
  const stringified = JSON.stringify(body);
  assert.equal(
    stringified.includes("SENDGRID_API_KEY"),
    false,
    "snapshot should not include SENDGRID_API_KEY"
  );
});
