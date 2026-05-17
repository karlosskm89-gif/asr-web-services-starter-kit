// core/utils/logger.js
const { isDev } = require("./config");

function formatMessage(level, message, meta) {
  const ts = new Date().toISOString();
  const base = `[${ts}] [${level.toUpperCase()}] ${message}`;

  if (!meta || Object.keys(meta).length === 0) {
    return base;
  }

  return `${base} ${JSON.stringify(meta)}`;
}

const logger = {
  info(message, meta = {}) {
    console.log(formatMessage("info", message, meta));
  },

  warn(message, meta = {}) {
    console.warn(formatMessage("warn", message, meta));
  },

  error(message, meta = {}) {
    console.error(formatMessage("error", message, meta));
  },

  debug(message, meta = {}) {
    if (!isDev) return;
    console.debug(formatMessage("debug", message, meta));
  },
};

module.exports = logger;
