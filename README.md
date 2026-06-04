# ASR Web Services Starter Kit

Public-safe Express/EJS starter demo for practical small-business websites: clear pages, reusable layouts, profile-driven content, safe enquiry handling and portfolio-ready presentation.

Live demo: https://asr-web-services-starter-kit.onrender.com

## What this demonstrates

- Express 5 + EJS route/view structure
- Reusable layouts, partials and CSS themes
- Profile switching via `TEMPLATE_PROFILE`
- Public pages for common service-business needs
- Contact/enquiry flow foundations with validation and CSRF
- Helmet, compression, rate limiting and health checks
- Page-specific SEO/canonical helpers
- Public-safe fictional profile examples through the Business Profile Lab
- Compressed public assets and compact favicon

## Ecosystem role

This is Demo Repo 1 in the ASR proof ecosystem. It shows the public website foundation. The Operational Systems Demo shows the workflow/admin layer that can sit behind a business site.

## Business Profile Lab

The profile lab previews the same build foundation shaped around fictional, public-safe businesses. These examples are labelled as demonstrations and are not presented as real clients.

```text
/showcase-mode
/showcase-mode/:profileKey
```

## Profile switching

Default profile:

```env
TEMPLATE_PROFILE=asrWebServices
```

Example alternatives include `plasterer`, `restaurant`, `photographer`, `lifeCoach` and `charity`. Changing the profile swaps identity, copy, services, sample projects, theme key and metadata while keeping the shared routes/views.

## Main routes

```text
/                         Home
/about                    About
/services                 Services
/portfolio                Proof of work
/starter-kit              Starter kit overview
/showcase-mode            Business profile selector
/showcase-mode/:profile   Profile-driven demo preview
/testimonials             Client signals
/faqs                     Practical questions
/contact                  Contact form
/healthz                  Health check
```

## Local development

```bash
npm install
cp .env.example .env
npm start
npm test
```

Open `http://localhost:3000`.

For automated smoke tests, set `NODE_ENV=test` or `ASR_TEST_BYPASS_RATE_LIMIT=true` to bypass the global limiter.

## Public-safety notes

This repo contains no production client code, real client data, credentials, private admin systems or live database records. Large source PNG logo files are excluded from the release package; runtime assets use compressed WebP files and a compact generated favicon.

## Docs

The `docs/` folder contains short supporting notes for architecture, profile switching, public-safe fictionalisation, screenshot capture and portfolio review. The docs are intentionally lightweight so the repo remains launch-clean.

## Related projects

- Main ASR website: https://asrweb.ie
- Operational Systems Demo: https://github.com/karlosskm89-gif/operational-systems-demo

## Licence

MIT — see `LICENSE`.
