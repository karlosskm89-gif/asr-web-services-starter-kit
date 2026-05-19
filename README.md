# ASR Web Services Starter Kit

A public-safe Express/EJS starter system for small-business websites, booking and enquiry flows, profile-driven demos, fictional showcase examples, and public case-study narratives.

This repository demonstrates how **ASR Web Services** structures maintainable website foundations for organisations that need more than a static brochure site: clear public pages, profile-driven content, reusable layouts, practical workflow patterns, and safe portfolio presentation.

> This is not a production client repository. It is a public portfolio/demo version of a reusable starter architecture. Real client repositories, private data, admin internals, and secrets are intentionally excluded.

## Live demo

[https://asr-web-services-starter-kit.onrender.com](https://asr-web-services-starter-kit.onrender.com)

## What this repo is meant to show

This repo is designed to prove more than “I can make pages”. It shows:

- a reusable Express/EJS architecture
- content/profile switching via environment variables
- reusable layouts and partials
- public pages for common small-business needs
- contact/enquiry flow foundations
- showcase examples that are fictionalised and safe to publish
- case-study narratives that explain real work without exposing private client code
- documentation habits and public repo hygiene

## Core features

- Express 5 application structure
- EJS layouts and reusable partials
- profile-driven content via `TEMPLATE_PROFILE`
- modular CSS structure with theme support
- public pages for home, about, services, portfolio, testimonials, FAQ, contact, starter-kit, and showcase
- contact form validation and CSRF protection
- basic security middleware with Helmet
- global and contact-specific rate limiting
- SEO helper structure for per-page titles and descriptions
- health check route for deployment checks
- test coverage for core utility behaviour
- fictional showcase examples for multiple business types
- external case-study links can be added from the ASR website proof layer
- docs covering setup, architecture, publishing boundaries, screenshots, and proposal usage

## Profile switching

The app loads a complete demo business profile from the `TEMPLATE_PROFILE` environment variable.

Default:

```env
TEMPLATE_PROFILE=asrWebServices
```

Switch profile examples:

```env
TEMPLATE_PROFILE=plasterer
TEMPLATE_PROFILE=restaurant
TEMPLATE_PROFILE=painter
TEMPLATE_PROFILE=photographer
TEMPLATE_PROFILE=lifeCoach
TEMPLATE_PROFILE=charity
```

Changing the profile swaps the business identity, copy, services, projects, theme key, and page metadata without changing the shared routes or views.

## Included demo profile types

The starter kit includes fictional/demo profiles for:

- ASR Web Services
- trades and builders
- cafés and restaurants
- coaches and tutors
- artists and creatives
- entertainers
- professional services
- non-profits and clubs

These profiles are demonstration content only. They are not real client data.

## Showcase examples

The `/showcase` route includes eight fictional public-safe examples:

| Example | Use case | Status |
| --- | --- | --- |
| Oakline Decorating Co. | Trades / decorating website | Complete fictional example |
| Harbour Brew Café | Café / local hospitality website | Complete fictional example |
| Luma Creative Home Base | Creator / personal brand hub | Complete fictional example |
| Haven Wellness Practice | Private practice / wellness website | Complete fictional example |
| Riverbend Community Club | Charity / club / community organisation | Complete fictional example |
| Cedar Legal Consulting | Professional services / advisory website | Complete fictional example |
| Summit Fit Studio | Fitness / studio website | Complete fictional example |
| Bloomfield Florist | Local retail / florist website | Complete fictional example |

Each showcase item includes:

- summary
- problem statement
- solution pattern
- typical page sections
- proof/use-case notes
- public-safe placeholder visual assets

These are not fake client claims. They are clearly marked fictional examples showing reusable patterns and proposal/mockup thinking.

## Case-study boundary

This starter kit is informed by real ASR project work, but full case studies are deliberately kept outside this repo. Publish those on `asrweb.ie` or as downloadable PDFs, then link to them from the live demo or README if needed.

## Example use cases

This project can support:

- local trades websites
- private practice or wellness websites
- café / restaurant starter sites
- creative portfolio websites
- charity or club websites
- enquiry-driven business sites
- early-stage booking or enquiry workflows
- public-safe proposal mockups
- client discovery concepts
- portfolio proof for agencies or clients

## Local setup

```bash
npm install
cp .env.example .env
npm start
```

Then open:

```text
http://localhost:3000
```

## Tests

```bash
npm test
```

## Useful routes

```text
/                                      Home
/about                                 About page
/services                              Services overview
/portfolio                             Portfolio / project cards
/starter-kit                           Starter kit explanation and profile list
/showcase                              Redirects to Showcase Mode
/showcase-mode                         Fictional profile selector
/showcase-mode/:profileKey             Profile-driven demo preview
/testimonials                          Testimonials / demo notes
/faqs                                  Frequently asked questions
/contact                               Contact form
/healthz                               Health check
```

## Project structure

```text
config/        Profile loading and SEO helpers
controllers/   Page controller logic
core/          Shared middleware, utilities, validation, mail helper
modules/       Demo business profiles
public/        CSS, images, and placeholder showcase assets
routes/        Express route definitions
scripts/       Profile helper scripts
views/         EJS views, layout, and partials
data/          Showcase items, case-study data, and reusable public data
docs/          Public documentation, portfolio notes, publishing guidance
screenshots/   GitHub screenshot checklist and future image location
tests/         Node test runner tests
```

## Privacy and client data

This repository does **not** contain production client code, private databases, real form submissions, private admin systems, real `.env` secrets, or client credentials.

The public version is intended to demonstrate structure, approach, and reusable patterns while keeping real client work private.

## Screenshot status

The project includes public-safe SVG preview assets and a screenshot checklist. Real browser screenshots should be added to `screenshots/` when convenient, but the repository is structured and documented to be understandable without them.

Recommended screenshots:

- homepage desktop
- homepage mobile
- starter-kit page
- showcase page
- one showcase detail page
- case-studies page
- contact form

See `docs/screenshot-guide.md`.

## About ASR Web Services

ASR Web Services is a Cork-based web studio focused on practical websites and digital systems for small businesses, charities, service providers, and independent organisations.

The focus is on clear communication, maintainable systems, enquiry/booking flows, and long-term digital stewardship — not just surface-level design.


## Project proof boundary

This starter kit is informed by real ASR project work, but full client case studies are deliberately kept outside the repo. Publish those on asrweb.ie or as downloadable PDFs, then link to them from the live website rather than embedding them here.


## Showcase Mode

The public demo keeps ASR Web Services as the core identity and exposes profile switching through `/showcase-mode`.

This avoids treating showcase examples as separate disconnected mockups. Instead, Showcase Mode demonstrates the real architecture: the same Express/EJS starter system rendering different fictional/public-safe business profiles through structured profile data.

- `/` remains the ASR core profile.
- `/showcase-mode` lists available demo profiles.
- `/showcase-mode/:profileKey` previews a selected profile inside the ASR-branded shell.

This is intended as proof of modular profile-driven architecture, not as a claim that the fictional profiles are real client websites.
