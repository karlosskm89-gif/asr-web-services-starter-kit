# ASR Template Framework — Architecture

This document describes the high-level architecture of the ASR Template Framework:

- Layers and responsibilities
- Boot sequence
- Request lifecycle
- Error handling model
- Profiles and themes

---

## 1. High-Level Overview

The framework is a **profile-driven**, **Express 5 + EJS** application designed for brochure-style client sites. It is structured into several layers:

- **app.js** — composition root; wires middleware, routes, and lifecycle hooks.
- **core/** — reusable engine:
  - `bootstrap/` → startup checks, logging, shutdown.
  - `middleware/` → CSRF, rate limiting, sanitization, errors, requestId, validators.
  - `utils/` → config, logging, errors, mailer, diagnostics, etc.
  - `index.js` → façade to export core building blocks.
- **config/** — profile loader + SEO helper.
- **controllers/** — HTTP-level logic (site pages, health, debug).
- **routes/** — HTTP routing definition.
- **modules/** — business profiles (builders, cafes, coaches, etc.).
- **views/** — EJS templates & layout.
- **public/** — static assets (CSS, images, themes).
- **tests/** — unit tests for core utilities and loaders.
- **docs/** — documentation (`checkpoints.md`, architecture, developer guide).

---

## 2. Boot Sequence

On `npm start` (`node app.js`), the following sequence occurs:

1. **Environment loading**
   - `require("dotenv").config()` loads `.env`.
   - `core/utils/config.js` exposes `ENV`, `isDev`, `isProd`, `get`, `getInt`, `getBool`, `requireEnv`.

2. **Profile loading**
   - `config/profileLoader.js` imports all profiles from `modules/`.
   - Chooses active profile from `TEMPLATE_PROFILE` (env) or falls back to `"plasterer"`.
   - Attaches:
     - `_profileKey`
     - `_availableProfiles` (list of all keys)

3. **Core setup in app.js**
   - Creates Express app.
   - Sets `app.locals.isDev`.
   - Registers middleware in order (see next section).
   - Mounts routes (`/healthz`, `/__debug`, `/`).
   - Applies 404 + error handlers.

4. **Diagnostics and startup**
   - `countRoutes(app)` walks `app._router.stack` and stores route count in `core/utils/diagnostics`.
   - `runConfigCheck()` validates:
     - Active profile exists and has name/themeKey.
     - MAIL_FROM / MAIL_TO / SENDGRID_API_KEY present.
     - RATE_MAX / CONTACT_RATE_MAX > 0.
   - `logStartup(builder)` logs a structured boot summary:
     - env flags
     - profile key + name
     - theme key
     - routeCount
     - email mode (live / dev / disabled)
     - global + contact rate limits.

5. **Listen & shutdown**
   - `PORT` from config (`getInt("PORT", 3000)`).
   - `app.listen(PORT)` starts HTTP server.
   - `registerShutdown(app)` attaches SIGINT / SIGTERM handlers to exit gracefully.

---

## 3. Middleware Pipeline

### 3.1 Global middleware order (simplified)

In `app.js`:

1. `requestId`  
   → attaches `req.id` and `X-Request-ID` header.

2. `express.urlencoded`, `express.json`  
   → parse request bodies.

3. `cookieParser`  
   → enables `req.cookies` (used by CSRF).

4. `compression`  
   → gzip/deflate responses.

5. `requestLogger` (dev only)  
   → logs `{ method, path, statusCode, durationMs, requestId }`.

6. `/__debug` routes (dev only)  
   → mounted early.

7. `/healthz`  
   → always accessible, not influenced by rate limiter.

8. `helmet`  
   → security headers (CSP disabled for now).

9. `rateLimiter`  
   → global soft rate limit (prod only; no-op in dev).

10. `sanitizeMiddleware`  
    → trims and normalizes all string fields in `req.body` and `req.query`.

11. View engine + static assets  
    → sets `view engine` / `views` path, configures `/public`.

12. `generateCsrfToken`  
    → ensures `_csrf` cookie exists and exposes helper for views.

13. `siteRoutes`  
    → main content routes (home, about, services, etc.).

14. `notFound` + `errorHandler`  
    → final fallback and error handling.

### 3.2 Contact POST pipeline

For `POST /contact` (defined in `routes/site.js`):

1. `csrfProtection`
2. `contactLimiter` (hard cap)
3. `slowDown`
4. `contactValidator`
5. `asyncHandler(siteController.contactPost)`

In English:

> sanitize → global rate limit → CSRF → contact-specific rate limit → slowdown → validation → controller.

---

## 4. Error Handling Model

### 4.1 AppError

`core/utils/appError.js` defines:

- `AppError` with:
  - `statusCode` (HTTP)
  - `status` (`"fail"` or `"error"`)
  - `code` (short code, optional)
  - `isOperational` (true for expected errors)
  - `meta` (structured context)
- `createError(statusCode, message, options)`

Usage examples:

- CSRF failures (`EBADCSRFTOKEN`).
- Rate limit handler (429).
- Controller-level 404 or validation failures.

### 4.2 Global error handler

`core/middleware/errorHandlers.js`:

- `notFound`:
  - Creates `AppError(404, ...)` with path info.
- `errorHandler`:
  - Normalizes unknown errors into `AppError`.
  - Uses logger:
    - `warn` for `isOperational`.
    - `error` (with stack) for unexpected bugs.
  - Renders views:
    - 403 → `403.ejs`
    - 404 → `404.ejs`
    - 429 → `429.ejs`
    - others → `500.ejs`

Views share the main layout and use the active `builder` for branding.

---

## 5. Logging & Diagnostics

### 5.1 Logger

`core/utils/logger.js`:

- `info`, `warn`, `error`, `debug`.
- `debug` logs only in development.
- Messages formatted with:
  - timestamp
  - level
  - message
  - JSON metadata

### 5.2 Request logger

`core/middleware/requestLogger.js`:

- Measures per-request duration with `process.hrtime.bigint()`.
- Logs:
  - method
  - originalUrl
  - statusCode
  - durationMs
  - requestId

### 5.3 Diagnostics

`core/utils/diagnostics.js`:

- Tracks `routeCount`.
- Populated by `countRoutes(app)` in `app.js`.
- Used by:
  - `startupLog`
  - `/__debug/config`

---

## 6. Profiles & Themes

### 6.1 Profiles

`config/profileLoader.js`:

- Imports all profile modules:
  - `modules/builder/*`
  - `modules/coach/*`
  - `modules/cafe/*`
  - `modules/corporate/*`
  - `modules/artist/*`
  - `modules/entertainer/*`
  - `modules/nonProfits/*`
- Exposes:
  - default export: `builder` (active profile)
  - named:
    - `builder`
    - `loadProfile(key)`
    - `_profiles`
    - `_fallbackKey`

Profiles include:

- identity (`businessName`, `area`, `phone`, `email`)
- theme config (`themeKey`)
- hero, services, projects, testimonials, faqs
- SEO object with per-page titles/descriptions.

### 6.2 Themes

`siteController` attaches `pageCss` based on `builder.themeKey`:

```js
const pageCss =
  builder.pageCss ||
  (builder.themeKey ? `/css/themes/${builder.themeKey}.css` : null);
Main layout:

Always loads /css/index.css.

Optionally loads pageCss.

Theme CSS files:

public/css/themes/builder.css

coach.css

cafe.css

corporate.css

artist.css

entertainer.css

nonprofit.css

Each theme can define overrides and token adjustments to differentiate sector look-and-feel.

7. Health & Debug Endpoints
7.1 Health

Route: /healthz

Controller: controllers/healthController.js

Returns JSON containing:

status

env

uptimeSeconds

timestamp

version (from package.json or env override)

7.2 Debug (dev-only)

Route: /__debug/config

Controller: controllers/debugController.js

Returns sanitized JSON:

env flags (ENV, isDev, isProd)

request info (id, ip, userAgent)

profile info (key, businessName, area, themeKey, themeConfigured)

email mode (enabled, mode, fromConfigured, toConfigured)

rateLimit settings (global + contact)

routes (count)

configCheck summary

versions (appVersion)

No secrets are ever returned (no API keys, no raw addresses).

8. Tests

Current tests include:

config.test.js — env helpers.

appError.test.js — AppError behavior.

profileLoader.test.js — builder export & metadata.

configCheck.test.js — config check behavior.

requestId.test.js — requestId middleware.

debugConfig.test.js — /__debug/config snapshot.

All tests are run via:

npm test


This architecture is designed to be:

Predictable (clear layering, explicit wiring).

Extensible (easy to add pages, modules, or integrations).

Safe (sensible defaults, non-invasive security features).

Testable (core behaviors under tests).