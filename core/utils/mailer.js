// core/utils/mailer.js

const sgMail = require("@sendgrid/mail");
const { get, getBool, isProd } = require("./config");
const logger = require("./logger");

// Env config
const SENDGRID_API_KEY = get("SENDGRID_API_KEY");
const MAIL_FROM = get("MAIL_FROM");
const MAIL_TO_FALLBACK = get("MAIL_TO");

// Feature flag so you can hard-disable email in any env
const EMAIL_ENABLED = getBool("EMAIL_ENABLED", true);

function hasRealSendgridKey() {
  return !!SENDGRID_API_KEY && SENDGRID_API_KEY.startsWith("SG.");
}

function getFromAddress() {
  if (!MAIL_FROM) {
    logger.warn("MAIL_FROM is not set; using fallback 'no-reply@example.com'");
    return "no-reply@example.com";
  }
  return MAIL_FROM;
}

/**
 * Send an email.
 *
 * @param {object} options
 * @param {string} [options.to] - Recipient email. Falls back to MAIL_TO if missing.
 * @param {string} options.subject
 * @param {string} options.html
 */
async function sendMail({ to, subject, html }) {
  const target = to || MAIL_TO_FALLBACK;

  if (!target) {
    logger.warn("sendMail called without 'to' and no MAIL_TO fallback set", {
      subject,
    });
    return;
  }

  if (!EMAIL_ENABLED) {
    logger.info("Email sending disabled via EMAIL_ENABLED=false", {
      to: target,
      subject,
    });
    return;
  }

  const from = getFromAddress();

  // Dev / no-key path: log instead of send
  if (!hasRealSendgridKey() || !isProd) {
    logger.info("[mailer:DEV] Would send email", {
      to: target,
      from,
      subject,
    });
    return;
  }

  // Real send
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: target,
    from,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    logger.info("[mailer] Email sent", { to: target, subject });
  } catch (err) {
    logger.error("[mailer] Failed to send email", {
      to: target,
      subject,
      error: err.message,
    });
    throw err; // let the global error handler decide what to show
  }
}

module.exports = {
  sendMail,
};
