# ASR Template Framework — Developer Guide

This guide explains how to work with the ASR Template Framework as a developer:

- Running the app
- Debugging and diagnostics
- Working with profiles and themes
- Adding pages and routes
- Testing
- Deployment guidance
- Conventions and best practices

---

## 1. Running the App

### 1.1 Install dependencies

```bash
npm install
1.2 Configure environment
Copy the example env and edit:

bash
Copy code
cp .env.example .env
Set (minimum):

env
Copy code
NODE_ENV=development
PORT=3000

SENDGRID_API_KEY=your-sendgrid-api-key-or-dev-string
MAIL_FROM="Your Name <no-reply@yourdomain.com>"
MAIL_TO=you@yourdomain.com
EMAIL_ENABLED=true

TEMPLATE_PROFILE=plasterer
1.3 Start the server
bash
Copy code
npm start
Visit:

Main site: http://localhost:3000

Health: http://localhost:3000/healthz

Debug (dev only): http://localhost:3000/__debug/config

2. Debugging & Diagnostics
2.1 Startup logs
On startup you’ll see something like:

text
Copy code
[INFO] [configCheck] No configuration issues found.
[INFO] App startup summary {
  env: "development",
  isDev: true,
  isProd: false,
  profileKey: "charity",
  businessName: "BrightSteps Community Trust",
  themeKey: "nonprofit",
  routeCount: 7,
  email: { ... },
  rateLimit: { ... }
}
Use this to verify:

Active profile and theme

Email mode (dev vs live)

Rate limit configuration

2.2 Request logging
In development, each request produces a log entry with:

method

URL

statusCode

durationMs

requestId

You can correlate logs via requestId and the X-Request-ID response header.

2.3 Debug endpoint
GET /__debug/config (dev only) shows:

env flags (ENV, isDev, isProd)

request metadata (id, ip, userAgent)

active profile info (key, businessName, area, themeKey)

email mode/config flags (without secrets)

rate limits

routeCount

configCheck summary

appVersion

Use this when wiring new environments or debugging weird behavior.

3. Profiles & Themes
3.1 How profiles work
Profiles live under modules/ and represent a single site’s business:

Identity & contact info

Hero section

Services

Projects/portfolio

Testimonials

FAQs

SEO metadata

Theme key

config/profileLoader.js:

Loads all profiles into a map.

Picks active profile from TEMPLATE_PROFILE env.

Adds metadata:

_profileKey

_availableProfiles

Exports the active builder.

3.2 Switching profile
In .env:

env
Copy code
TEMPLATE_PROFILE=lifeCoach
Restart the server, and the site will now reflect the lifeCoach profile copy, SEO, and theme.

3.3 Creating a new profile (script)
Use scripts/newProfile.js:

bash
Copy code
node scripts/newProfile.js builder plastererPro
This will:

Create modules/builder/plastererPro.js.

Insert a template config aligned with the live schema.

Remind you to:

Register the profile in config/profileLoader.js (if not already).

Set TEMPLATE_PROFILE=plastererPro in .env.

Then:

Edit the new profile file (business name, area, hero text, services, etc.).

Restart the app with the new TEMPLATE_PROFILE.

4. Working with Themes
Each profile has a themeKey:

js
Copy code
themeKey: "nonprofit"
The layout includes:

/css/index.css (base).

/css/themes/<themeKey>.css (optional overlay).

To create or tweak a theme:

Add or edit public/css/themes/<theme>.css.

Set themeKey on the relevant profiles.

Use the body classes for finer control:

html
Copy code
<body class="profile-<%= builder._profileKey %> theme-<%= builder.themeKey %>">
This lets you target sectors or individual profiles in CSS.

5. Adding Pages & Routes
5.1 Flow
New page requires:

Route in routes/site.js

Controller function in controllers/siteController.js

View in views/

Optional SEO entry in config/seoHelper.js

5.2 Example: adding /pricing
Controller method in siteController.js:

js
Copy code
exports.pricing = async (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("pricing");

  res.render("pricing", baseView({
    title,
    metaDescription,
    currentPath: "/pricing",
  }));
};
Route in routes/site.js:

js
Copy code
const { asyncHandler } = require("../core/utils/asyncHandler");
// ...
router.get("/pricing", asyncHandler(siteController.pricing));
SEO in seoHelper.js:

Add pricing to page labels and description helper.

View at views/pricing.ejs:

ejs
Copy code
<%- include("./layouts/mainLayout", {
  title,
  metaDescription,
  builder,
  currentPath: "/pricing",
  body: `
    <section class="page page-pricing">
      <div class="page-inner">
        <h1 class="page-title">Pricing</h1>
        <p>Explain your pricing model here.</p>
      </div>
    </section>
  `,
}) %>
Restart the app and navigate to /pricing.

6. Contact Form Pipeline
The contact form is one of the most important flows. It uses:

sanitizeMiddleware — normalizes body/query.

Global rate limiter — protects the app.

csrfProtection — double-submit cookie.

contactLimiter — strict limits for POST /contact.

slowDown — adds delay after repeated requests.

contactValidator — express-validator rules.

siteController.contactPost — orchestrates sendMail + redirect.

In the controller:

On validation error:

Re-renders contact view with old values, validationErrors, new csrfToken.

On success:

Calls sendMail.

Redirects to /success (PRG pattern).

Email sending uses core/utils/mailer.js, which:

Uses SendGrid in production (when SENDGRID_API_KEY looks real).

Logs “would send” in dev or when disabled.

Controlled via EMAIL_ENABLED and env config.

7. Testing
Run tests:

bash
Copy code
npm test
Current tests cover:

core/utils/config — config helpers.

core/utils/appError — AppError semantics.

config/profileLoader — builder export and metadata.

core/bootstrap/configCheck — environment validation.

core/middleware/requestId — request ID injection.

controllers/debugController — /__debug/config snapshot and secrecy.

Adding new tests
Place under tests/.

Use Node’s test runner (node:test).

Import modules using relative paths (../core/...).

Example skeleton:

js
Copy code
const test = require("node:test");
const assert = require("node:assert/strict");
const myModule = require("../core/utils/myModule");

test("myModule does something useful", () => {
  const result = myModule.doThing();
  assert.equal(result, "expected");
});
8. Deployment Tips
When deploying to Render, Railway, Fly.io, etc.:

Set NODE_ENV=production.

Configure:

PORT (often provided by platform, but you can map it).

SENDGRID_API_KEY (real key).

MAIL_FROM, MAIL_TO.

EMAIL_ENABLED=true.

TEMPLATE_PROFILE (e.g. plasterer, lifeCoach, charity).

Ensure HTTPS for CSRF cookies:

secure: isProd in CSRF cookie is already wired; platform needs TLS.

Monitor:

/healthz for basic uptime checks.

Application logs for startup summary and request logs.

9. Conventions & Best Practices
Never access process.env directly:

Use core/utils/config.js (get, getInt, getBool).

For errors:

Use AppError or createError when you expect a user-facing problem.

Let the global errorHandler decide which view to render.

For new routes/controllers:

Wrap controller functions with asyncHandler.

Keep controllers thin; push reusable logic into core or utils.

For new middleware:

Place under core/middleware/.

Keep them stateless and composable.

For new profiles:

Use scripts/newProfile.js to maintain schema consistency.

Update config/profileLoader.js only when adding entirely new categories.

This guide should give you enough to confidently extend, debug, and operate the ASR Template Framework as your core template engine.