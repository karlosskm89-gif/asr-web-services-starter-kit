// routes/healthz.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// /healthz – quick readiness check (no auth; OK to put behind token in prod if you want)
router.get('/healthz', (req, res) => {
  // Always OK; keep protected checks on /readyz if needed
  return res.status(200).json({ ok: true });
});

// /readyz – slightly deeper check (DB connected)
router.get('/readyz', async (req, res) => {
  let mongo = 'disconnected';
  try {
    if (mongoose.connection?.readyState === 1) {
      if (mongoose.connection.db?.admin) {
        await mongoose.connection.db.admin().ping();
      }
      mongo = 'connected';
    } else {
      const map = ['disconnected','connected','connecting','disconnecting'];
      mongo = map[mongoose.connection.readyState] || 'unknown';
    }
  } catch (_) {}
  const ready = mongo === 'connected';
  res.status(ready ? 200 : 503).json({ ready, mongo });
});

// Optional: a single consolidated status endpoint if you like
router.get('/status', async (req, res) => {
  const map = ['disconnected','connected','connecting','disconnecting'];
  let mongoState = map[mongoose.connection?.readyState || 0] || 'unknown';
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mongo: mongoState });
});

module.exports = router;
