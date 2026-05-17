// server.js
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const WEBHOOK_TOKEN = process.env.MAIL_WEBHOOK_TOKEN;
const DEFAULT_PROFILE = process.env.MAIL_DEFAULT_PROFILE || 'default';

function parseBool(v) {
  if (typeof v === 'boolean') return v;
  if (!v) return false;
  const s = String(v).toLowerCase().trim();
  return s === 'true' || s === '1' || s === 'yes' || s === 'on';
}

/**
 * Turn a profile name like "forwardsteps_info"
 * into env prefixes like "MAIL_FORWARDSTEPS_INFO_"
 */
function profileKey(profileName) {
  return profileName.toUpperCase().replace(/[^A-Z0-9]/g, '_');
}

/**
 * Load SMTP config for a given profile.
 * Expects env names like:
 *   MAIL_FORWARDSTEPS_INFO_HOST
 *   MAIL_FORWARDSTEPS_INFO_PORT
 *   MAIL_FORWARDSTEPS_INFO_SECURE
 *   MAIL_FORWARDSTEPS_INFO_USER
 *   MAIL_FORWARDSTEPS_INFO_PASS
 *   MAIL_FORWARDSTEPS_INFO_FROM  (optional)
 */
function loadProfileConfig(profileName) {
  const key = profileKey(profileName);
  const prefix = `MAIL_${key}_`;

  const host   = process.env[`${prefix}HOST`];
  const port   = process.env[`${prefix}PORT`];
  const secure = process.env[`${prefix}SECURE`];
  const user   = process.env[`${prefix}USER`];
  const pass   = process.env[`${prefix}PASS`];
  const from   = process.env[`${prefix}FROM`];

  if (!host || !user || !pass) {
    return null;
  }

  return {
    smtp: {
      host,
      port: port ? Number(port) : 465,
      secure: secure !== undefined ? parseBool(secure) : true,
      auth: { user, pass },
    },
    from: from || user, // default From address
  };
}

// ─────────────────────────────────────────────────────────────
// Middleware: auth
// ─────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  if (req.path !== '/send') return next();

  if (!WEBHOOK_TOKEN) {
    console.error('[relay] MAIL_WEBHOOK_TOKEN is not set!');
    return res.status(500).json({ ok: false, error: 'relay_not_configured' });
  }

  const token = req.get('x-mail-webhook-token');
  if (!token || token !== WEBHOOK_TOKEN) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  next();
});

// ─────────────────────────────────────────────────────────────
// Healthcheck
// ─────────────────────────────────────────────────────────────

app.get('/healthz', (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
    defaultProfile: DEFAULT_PROFILE,
  });
});

// ─────────────────────────────────────────────────────────────
// POST /send
// ─────────────────────────────────────────────────────────────
// Body example:
// {
//   "profile": "forwardsteps_info",         // optional if header set
//   "to": "tara@example.com",
//   "subject": "New booking enquiry",
//   "text": "Plain text body",
//   "html": "<p>HTML body</p>",
//   "from": "ForwardSteps <info@forwardsteps.ie>",   // optional
//   "replyTo": "parent@example.com",                 // optional
//   "cc": "...", "bcc": "..."                        // optional
// }
// ─────────────────────────────────────────────────────────────

app.post('/send', async (req, res) => {
  const start = Date.now();

  try {
    // 1) Decide which profile to use
    const headerProfile = req.get('x-mail-profile');
    const bodyProfile = req.body.profile;
    const profile = (headerProfile || bodyProfile || DEFAULT_PROFILE).trim();

    const profileConfig = loadProfileConfig(profile);
    if (!profileConfig) {
      console.error('[relay] Unknown or misconfigured profile:', profile);
      return res.status(400).json({
        ok: false,
        error: 'unknown_profile',
        profile,
      });
    }

    const { smtp, from: defaultFrom } = profileConfig;

    // 2) Validate required fields
    const { to, subject, text, html, from, replyTo, cc, bcc } = req.body;

    if (!to) {
      return res.status(400).json({ ok: false, error: 'missing_to' });
    }
    if (!subject) {
      return res.status(400).json({ ok: false, error: 'missing_subject' });
    }
    if (!text && !html) {
      return res.status(400).json({ ok: false, error: 'missing_body' });
    }

    const mailOptions = {
      from: from || defaultFrom,
      to,
      subject,
      text,
      html,
      replyTo,
      cc,
      bcc,
    };

    // 3) Create transporter and send
    const transporter = nodemailer.createTransport(smtp);

    console.log('[relay] Sending mail via profile:', profile, {
      to,
      subject,
      host: smtp.host,
      user: smtp.auth.user,
    });

    const info = await transporter.sendMail(mailOptions);

    const durationMs = Date.now() - start;
    console.log('[relay] Sent OK', {
      profile,
      messageId: info.messageId,
      durationMs,
    });

    res.json({
      ok: true,
      profile,
      messageId: info.messageId,
      durationMs,
    });
  } catch (err) {
    const durationMs = Date.now() - start;
    console.error('[relay] send failed', {
      error: err && err.message,
      stack: err && err.stack,
      durationMs,
    });

    res.status(500).json({
      ok: false,
      error: 'send_failed',
      message: err && err.message,
      durationMs,
    });
  }
});

// ─────────────────────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────────────────────

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[relay] Listening on http://0.0.0.0:${port}`);
});
