require("dotenv").config();

const express = require("express");
const path = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const { isDev, getInt } = require("./core/utils/config");
const { runConfigCheck } = require("./core/bootstrap/configCheck");
const logStartup = require("./core/bootstrap/startupLog");
const { builder } = require("./config/profileLoader");
const registerShutdown = require("./core/bootstrap/shutdown");
const diagnostics = require("./core/utils/diagnostics");
const sanitize = require("./core/middleware/sanitizeMiddleware");
const requestId = require("./core/middleware/requestId");

const healthRoutes = require("./routes/health");
const siteRoutes = require("./routes/site");

const { helmet, rateLimiter, generateCsrfToken } = require("./core");
const { notFound, errorHandler } = require("./core/middleware/errorHandlers");

const app = express();

// expose dev flag to views if needed
app.locals.isDev = isDev;

// --------------------------------------------------
// Core Middleware
// --------------------------------------------------
app.use(requestId);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// simple request logging (dev only)
if (isDev) {
  const requestLogger = require("./core/middleware/requestLogger");
  app.use(requestLogger);
}

// Dev-only debug routes
if (isDev) {
  const debugRoutes = require("./routes/debug");
  app.use("/__debug", debugRoutes);
}

// Health check BEFORE rate limiting, sanitizer, etc.
app.use("/healthz", healthRoutes);

// security headers
app.use(helmet);

// --------------------------------------------------
// View Engine
// --------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Apply global soft rate-limit (good for templates)
app.use(rateLimiter);

// Request sanitization
app.use(sanitize);

app.use((req, res, next) => {
  const host = req.get("host") || "localhost:3000";
  const protocol = req.get("x-forwarded-proto") || req.protocol || "http";
  const origin = process.env.PUBLIC_SITE_URL || `${protocol}://${host}`;
  res.locals.canonicalUrl = `${origin}${req.path === "/" ? "/" : req.path}`;
  next();
});


// --------------------------------------------------
// CSRF setup
// --------------------------------------------------
app.use(generateCsrfToken);

// --------------------------------------------------
// Routes
// --------------------------------------------------
app.use("/", siteRoutes);

// --------------------------------------------------
// Error handlers
// --------------------------------------------------
app.use(notFound);
app.use(errorHandler);

// --------------------------------------------------
// Diagnostics: count routes
// --------------------------------------------------
function countRoutes(appInstance) {
  let count = 0;

  if (appInstance._router && Array.isArray(appInstance._router.stack)) {
    appInstance._router.stack.forEach((layer) => {
      if (layer.route) {
        count++;
      }
    });
  }

  diagnostics.setRouteCount(count);
}

countRoutes(app);

// --------------------------------------------------
// Startup checks + listen only when this file is run directly
// --------------------------------------------------
if (require.main === module) {
  runConfigCheck();
  logStartup(builder);

  const PORT = getInt("PORT", 3000);

  const server = app.listen(PORT, () => {
    console.log(
      `ASR Web Services Starter Kit running on http://localhost:${PORT}`
    );
  });

  // Register shutdown hooks for the actual HTTP server
  registerShutdown(server);
}

module.exports = app;
