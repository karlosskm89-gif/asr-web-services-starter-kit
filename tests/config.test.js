// tests/config.test.js

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  get,
  getInt,
  getBool,
  ENV,
  isDev,
  isProd,
} = require("../core/utils/config");

test("config.get returns explicit env value when set", () => {
  process.env.MY_APP_TEST_KEY = "hello";
  assert.equal(get("MY_APP_TEST_KEY", "fallback"), "hello");
});

test("config.get returns fallback when env is missing", () => {
  delete process.env.MY_APP_TEST_MISSING;
  assert.equal(get("MY_APP_TEST_MISSING", "fallback"), "fallback");
});

test("config.getInt parses integers and falls back on invalid", () => {
  process.env.MY_APP_INT = "42";
  assert.equal(getInt("MY_APP_INT", 10), 42);

  process.env.MY_APP_INT = "not-a-number";
  assert.equal(getInt("MY_APP_INT", 10), 10);
});

test("config.getBool parses common truthy/falsey values", () => {
  process.env.MY_APP_BOOL = "true";
  assert.equal(getBool("MY_APP_BOOL", false), true);

  process.env.MY_APP_BOOL = "false";
  assert.equal(getBool("MY_APP_BOOL", true), false);

  process.env.MY_APP_BOOL = "not-sure";
  assert.equal(getBool("MY_APP_BOOL", true), true); // falls back
});

test("config ENV flags are consistent", () => {
  // Can't assert exact values without controlling NODE_ENV,
  // but can assert basic consistency.
  assert.ok(
    [true, false].includes(isDev),
    "isDev should be boolean"
  );
  assert.ok(
    [true, false].includes(isProd),
    "isProd should be boolean"
  );
  assert.equal(typeof ENV, "string");
});
