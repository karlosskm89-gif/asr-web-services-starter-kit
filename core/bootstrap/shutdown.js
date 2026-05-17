module.exports = function registerShutdown(server) {
  const shutdown = (signal) => () => {
    logger.warn(`Received ${signal}, shutting down server...`);
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown("SIGINT"));
  process.on("SIGTERM", shutdown("SIGTERM"));
};
