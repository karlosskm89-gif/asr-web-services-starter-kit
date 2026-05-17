// routes/health.js
const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

// Simple health check. No CSRF, no rate limit, just a fast JSON response.
router.get("/", healthController.health);

module.exports = router;
