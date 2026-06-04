# Architecture Notes

This starter kit uses a simple Express/EJS structure:

- `app.js` wires middleware, static files, views and routes.
- `routes/` maps URLs to controller actions.
- `controllers/` prepares profile data and renders views.
- `views/` contains EJS pages and the shared layout.
- `modules/` contains profile definitions used by `TEMPLATE_PROFILE`.
- `public/css/` holds base, layout, component, page and theme CSS.
- `core/` contains reusable middleware, config, validation, mail, CSRF and error helpers.

The intended pattern is boring on purpose: one maintainable foundation that can be shaped for different small-business sites without duplicating the whole app.

## Release notes

- Canonical URLs are generated per request path.
- Runtime images use compressed WebP assets.
- Large source PNG files are excluded from the release package.
- The global rate limiter is bypassed in `NODE_ENV=test` or when `ASR_TEST_BYPASS_RATE_LIMIT=true`.
