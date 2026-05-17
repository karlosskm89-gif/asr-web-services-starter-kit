// core/bootstrap/startupLog.js

const { ENV, isDev, isProd, get, getInt, getBool } = require("../utils/config");
const logger = require("../utils/logger");
const diagnostics = require("../utils/diagnostics");

function logStartup(builder) {
  const profileKey = builder?._profileKey || "unknown";
  const businessName = builder?.businessName || "Unknown business";
  const themeKey = builder?.themeKey || "default";

  const emailEnabled = getBool("EMAIL_ENABLED", true);
  const sendgridKey = get("SENDGRID_API_KEY");
  const mailFrom = get("MAIL_FROM");
  const hasRealSendgrid =
    !!sendgridKey && sendgridKey.startsWith("SG.");

  const rateWindowMs = getInt("RATE_WINDOW_MS", 60 * 1000);
  const rateMax = getInt("RATE_MAX", 60);
  const contactWindowMs = getInt("CONTACT_RATE_WINDOW_MS", 60 * 60 * 1000);
  const contactMax = getInt("CONTACT_RATE_MAX", 5);

  logger.info("App startup summary", {
    env: ENV,
    isDev,
    isProd,
    profileKey,
    businessName,
    themeKey,
    routeCount: diagnostics.getRouteCount(),
    email: {
      enabled: emailEnabled,
      mode: !emailEnabled
        ? "disabled"
        : hasRealSendgrid && isProd
        ? "sendgrid:live"
        : "dev/log-only",
      from: mailFrom || "not-set",
    },
    rateLimit: {
      global: {
        windowMs: rateWindowMs,
        max: rateMax,
      },
      contact: {
        windowMs: contactWindowMs,
        max: contactMax,
      },
    },
  });
}

module.exports = logStartup;
