// tests/profileLoader.test.js

const test = require("node:test");
const assert = require("node:assert/strict");

// This will load active builder based on TEMPLATE_PROFILE or fallback
const builder = require("../config/profileLoader");

test("profileLoader exports an active builder profile", () => {
  assert.ok(builder, "builder should be defined");
  assert.equal(typeof builder.businessName, "string");
});

test("builder has _profileKey and _availableProfiles metadata", () => {
  assert.ok(builder._profileKey, "_profileKey should be set");
  assert.ok(
    Array.isArray(builder._availableProfiles),
    "_availableProfiles should be an array"
  );
  assert.ok(
    builder._availableProfiles.includes(builder._profileKey),
    "_profileKey should be in _availableProfiles"
  );
});

test("builder.default export and .builder property both reference same instance", () => {
  const { builder: namedBuilder } = require("../config/profileLoader");

  assert.strictEqual(builder, namedBuilder);
});
