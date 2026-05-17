// controllers/healthController.js
const { ENV, isProd, get } = require("../core/utils/config");
const logger = require("../core/utils/logger");
const pkg = require("../package.json");

function basicHealthInfo() {
  return {
    status: "ok",
    env: ENV,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    version: get("APP_VERSION", pkg.version),
  };
}

exports.health = (req, res) => {
  const info = basicHealthInfo();

  // Optionally log the fact that something is probing health in prod
  if (isProd) {
    logger.debug("Health check ping", {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  }

  res.status(200).json(info);
};
