## Checkpoint: ASR_ThemedBaseline_v1_Sanitized

**Date:** 2025-11-23  
**Zip:** `asr-templates-playground_cssThemes_sanitizeMiddleware_implemented.zip`

### What this baseline includes

- **Express 5** app with EJS views and a single `site` router.
- Centralised **profile system** under `/modules`, wired via `config/profileLoader.js`.
- **SEO helper** (`config/seoHelper.js`) providing per-page titles + descriptions using profile SEO config with safe fallbacks.
- Consistent **layout system** (`views/layouts/mainLayout.ejs`) with:
  - Global base CSS: `/css/index.css`
  - Optional per-profile theme CSS via `pageCss` (`/css/themes/<themeKey>.css`)
  - Header + footer driven by `builder` profile data.

### Security + robustness

- **Sanitizer middleware** (`core/middleware/sanitizeMiddleware.js`) trimming all `req.body` and `req.query` strings and normalizing newlines.
- **Rate limiting**:
  - Global soft rate limiter using `express-rate-limit` (prod only).
  - Per-contact hard cap via `contactLimiter`.
  - Request slowdown via `express-slow-down` (prod only).
- **CSRF protection**:
  - Double-submit cookie pattern with `generateCsrfToken` + `csrfProtection`.
  - CSRF token rendered into the contact form and verified on POST.
- **Safe error handling**:
  - 404 and 500 views rendering friendly pages without leaking stack traces.

### Contact form

- Post stack: `sanitize → global rate limit → CSRF → contactLimiter → slowDown → contactValidator → controller`.
- `contactValidator` built with `express-validator` (name/email/phone required, email validated, details optional).
- On validation error, form re-renders with:
  - Preserved user input (`old`)
  - Error messages (`validationErrors`)
  - Fresh CSRF token.
- Emails sent via `core/utils/mailer.js`:
  - Dev mode: logs "would send" emails.
  - Prod mode: uses SendGrid with `SENDGRID_API_KEY` and `MAIL_FROM`.

### Themes + profiles

- Profiles live in `/modules` grouped by domain (builder, coach, cafe, corporate, artist, entertainer, nonProfits).
- Each profile exposes:
  - Identity + contact info
  - Hero section
  - Services, projects, testimonials, FAQs
  - SEO configuration
  - `themeKey` for CSS theming.
- Theme CSS files live under `/public/css/themes`, layered on top of `/css/index.css`.
- Missing theme files are currently gracefully ignored (404 on second CSS link but layout remains intact).

### Health check

- **Endpoint:** `GET /healthz`
- **Response:** JSON with `status`, `env`, `uptimeSeconds`, `timestamp`, `version`.
- **Purpose:** For uptime monitoring and smoke checks. Implemented via `controllers/healthController.js` and `routes/health.js`, and mounted before heavy middleware in `app.js`.


### Intended use

This baseline is the **starting point for ASR-branded site templates** with:

- Swappable profiles via `TEMPLATE_PROFILE` env.
- Clean layout, basic security, and a thin contact pipeline.
- Ready to expand with:
  - Full theme coverage per profile,
  - Body-class hooks for fine-grained styling,
  - Friendlier error/rate-limit/CSRF UX.

