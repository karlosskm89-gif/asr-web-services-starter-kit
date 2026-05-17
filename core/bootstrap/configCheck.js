// core/bootstrap/configCheck.js

const { get, getInt } = require("../utils/config");
const logger = require("../utils/logger");
const builder = require("../../config/profileLoader");

let lastResult = {
  ok: false,
  issues: [],
  checkedAt: null,
};

function runConfigCheck() {
  const issues = [];

  // Profile / builder sanity
  if (!builder) {
    issues.push("Active profile (builder) failed to load.");
  } else {
    if (!builder.businessName) {
      issues.push("Active profile missing businessName.");
    }
    if (!builder.themeKey) {
      issues.push("Active profile missing themeKey.");
    }
  }

  // Mail config
  if (!get("MAIL_FROM")) {
    issues.push("MAIL_FROM is missing.");
  }
  if (!get("MAIL_TO")) {
    issues.push("MAIL_TO is missing.");
  }
  if (!get("SENDGRID_API_KEY")) {
    issues.push("SENDGRID_API_KEY is missing.");
  }

  // Rate limits
  const globalMax = getInt("RATE_MAX", 1000);
  if (globalMax <= 0) {
    issues.push("RATE_MAX must be greater than zero.");
  }

  const contactMax = getInt("CONTACT_RATE_MAX", 5);
  if (contactMax <= 0) {
    issues.push("CONTACT_RATE_MAX must be greater than zero.");
  }

  const ok = issues.length === 0;

  lastResult = {
    ok,
    issues,
    checkedAt: new Date().toISOString(),
  };

  if (ok) {
    logger.info("[configCheck] No configuration issues found.");
  } else {
    logger.warn("[configCheck] Potential configuration issues detected.", {
      issues,
    });
  }

  return lastResult;
}

function getLastConfigCheck() {
  return lastResult;
}

module.exports = {
  runConfigCheck,
  getLastConfigCheck,
};
