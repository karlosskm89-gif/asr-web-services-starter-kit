// core/utils/config.js

const ENV = process.env.NODE_ENV || "development";

function get(key, defaultValue = undefined) {
  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
}

function getInt(key, defaultValue = undefined) {
  const raw = process.env[key];
  if (raw === undefined) return defaultValue;

  const parsed = parseInt(raw, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

function getBool(key, defaultValue = undefined) {
  const raw = process.env[key];
  if (raw === undefined) return defaultValue;

  const normalized = raw.toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;

  return defaultValue;
}

/**
 * Throw if a required env var is missing.
 */
function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const isDev = ENV === "development";
const isProd = ENV === "production";
const isTest = ENV === "test";

module.exports = {
  ENV,
  isDev,
  isProd,
  isTest,
  get,
  getInt,
  getBool,
  requireEnv,
};
