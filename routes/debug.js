// routes/debug.js

const express = require("express");
const router = express.Router();
const debugController = require("../controllers/debugController");

// GET /__debug/config
router.get("/config", debugController.configDebug);

module.exports = router;
