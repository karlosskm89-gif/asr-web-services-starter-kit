# RC Repair Notes — ASR Web Services Starter Kit

Applied June 2026:

- Added dynamic canonical/OG URL handling based on current request path, with PUBLIC_SITE_URL override support.
- Removed stale imported CSS files for old compare/loyalty/quote pages.
- Removed unused legacy detail views that were no longer routed as real pages.
- Added compressed WebP ASR brand assets and updated profile/docs references to use them.
- Lightly de-genericised a few public headings without rewriting the site voice.
- Re-ran tests, route smoke checks, and production dependency audit.

Validation:

- npm test: passing
- npm audit --omit=dev: 0 vulnerabilities
- Route smoke: main public routes return expected 200/404 statuses


## Deep regression repair pass

- Removed unused heavyweight PNG logo sources from the release package.
- Regenerated a compact favicon.
- Recompressed ASR WebP brand assets.
- Slimmed README/docs so the public repo reads as release support, not an internal archive.
- Added explicit test-mode rate-limit bypass via `NODE_ENV=test`, `BYPASS_RATE_LIMIT=true`, or `ASR_TEST_BYPASS_RATE_LIMIT=true`.
- Lightly de-genericised remaining headings: Proof of Work, Client Signals, Practical Questions and Business Profile Lab.

## Final RC hygiene repair pass

- Cleaned minor release-candidate documentation wording.
- Kept public-safe demo boundaries explicit.
- Preserved existing runtime behaviour and test coverage.

