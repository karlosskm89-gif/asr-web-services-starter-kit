// routes/ops.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/livez', (req, res) => {
  res.status(200).json({ ok: true, ts: new Date().toISOString() });
});

router.get('/readyz', async (req, res) => {
  const start = process.hrtime.bigint();
  let dbOk = false, dbMs = null;
  try {
    await mongoose.connection.db.admin().ping();
    dbOk = true;
  } catch (e) {
    dbOk = false;
  } finally {
    const end = process.hrtime.bigint();
    dbMs = Number(end - start) / 1e6;
  }
  const body = {
    ok: dbOk,
    dbMs,
    version: process.env.APP_VERSION || null,
    commit: process.env.GIT_SHA || null,
    now: new Date().toISOString()
  };
  res.status(dbOk ? 200 : 503).json(body);
});

module.exports = router;
