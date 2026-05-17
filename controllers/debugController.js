// controllers/debugController.js

const {
  ENV,
  isDev,
  isProd,
  get,
  getInt,
  getBool,
} = require("../core/utils/config");
const logger = require("../core/utils/logger");
const builder = require("../config/profileLoader");
const diagnostics = require("../core/utils/diagnostics");
const { getLastConfigCheck } = require("../core/bootstrap/configCheck");
const pkg = require("../package.json");

exports.configDebug = (req, res) => {
  // This route is only mounted in dev via app.js, so we don't hard-block on isDev here.
  // If someone hits it in another env by mistake, it's on the router wiring, not this controller.
  if (!isDev) {
    logger.warn("Access to /__debug/config outside dev environment", {
      ip: req.ip,
      env: ENV,
    });
  }

  const sendgridKey = get("SENDGRID_API_KEY");
  const hasRealSendgrid =
    !!sendgridKey && sendgridKey.startsWith("SG.");

  const configCheck = getLastConfigCheck();
  const themeConfigured = Boolean(builder?.themeKey);

  const snapshot = {
    env: {
      ENV,
      isDev,
      isProd,
    },
    request: {
      id: req.id || null,
      ip: req.ip || null,
      userAgent: req.headers["user-agent"] || null,
    },
    profile: {
      key: builder?._profileKey || null,
      businessName: builder?.businessName || null,
      area: builder?.area || null,
      themeKey: builder?.themeKey || null,
      themeConfigured,
    },
    email: {
      enabled: getBool("EMAIL_ENABLED", true),
      mode: !getBool("EMAIL_ENABLED", true)
        ? "disabled"
        : hasRealSendgrid && isProd
        ? "sendgrid:live"
        : "dev/log-only",
      fromConfigured: !!get("MAIL_FROM"),
      toConfigured: !!get("MAIL_TO"),
      // NOTE: we do NOT include actual addresses or API keys here.
    },
    rateLimit: {
      global: {
        windowMs: getInt("RATE_WINDOW_MS", 60 * 1000),
        max: getInt("RATE_MAX", 60),
      },
      contact: {
        windowMs: getInt("CONTACT_RATE_WINDOW_MS", 60 * 60 * 1000),
        max: getInt("CONTACT_RATE_MAX", 5),
      },
    },
    routes: {
      count: diagnostics.getRouteCount(),
    },
    configCheck: configCheck || {
      ok: false,
      issues: ["configCheck has not been run yet"],
      checkedAt: null,
    },
    versions: {
      appVersion: get("APP_VERSION", pkg.version),
    },
  };

  res.status(200).json(snapshot);
};
