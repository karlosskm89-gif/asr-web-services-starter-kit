// tests/configCheck.test.js

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  runConfigCheck,
  getLastConfigCheck,
} = require("../core/bootstrap/configCheck");

test("configCheck runs without throwing and produces a result", () => {
  assert.doesNotThrow(() => runConfigCheck());

  const result = getLastConfigCheck();
  assert.equal(typeof result.ok, "boolean");
  assert.ok(Array.isArray(result.issues));
  assert.ok(result.checkedAt, "checkedAt should be set");
});

test("configCheck reports issues when obvious config is missing", () => {
  const originalMailFrom = process.env.MAIL_FROM;
  delete process.env.MAIL_FROM;

  const result = runConfigCheck();
  assert.equal(result.ok, false);
  assert.ok(
    result.issues.some((msg) => msg.includes("MAIL_FROM")),
    "MAIL_FROM issue should be reported"
  );

  // restore env
  if (originalMailFrom !== undefined) {
    process.env.MAIL_FROM = originalMailFrom;
  } else {
    delete process.env.MAIL_FROM;
  }
});
