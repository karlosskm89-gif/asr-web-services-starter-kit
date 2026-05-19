const logger = require("../utils/logger");

module.exports = function registerShutdown(server) {
  const shutdown = (signal) => () => {
    logger.warn(`Received ${signal}, shutting down server...`);

    if (server && typeof server.close === "function") {
      server.close(() => {
        process.exit(0);
      });
      return;
    }

    process.exit(0);
  };

  process.on("SIGINT", shutdown("SIGINT"));
  process.on("SIGTERM", shutdown("SIGTERM"));
};
