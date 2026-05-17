# ASR Web Services Starter Kit

A public-safe Express/EJS starter kit for service-business websites, operational workflow demos, and portfolio-ready small-business prototypes.

This repository demonstrates how ASR Web Services structures reusable website foundations for organisations that need clear public-facing pages, maintainable content, and practical inquiry/workflow patterns.

The app is profile-driven: one Express/EJS codebase can load different demo business profiles by changing the `TEMPLATE_PROFILE` environment variable.

## Default profile

The default profile is now:

```env
TEMPLATE_PROFILE=asrWebServices
```

This gives the project a more realistic ASR Web Services demo identity for screenshots, GitHub presentation, and portfolio use.

## What this demonstrates

- Reusable EJS layouts and partials
- Profile-driven content and demo business variants
- Responsive service-business website structure
- Contact form validation and CSRF protection
- Basic security middleware
- Rate limiting and request handling
- SEO helper structure
- Public-safe placeholder visuals
- Test coverage for core utility behaviour

## Example profile types

The starter kit includes fictional/demo profiles for:

- ASR Web Services
- Trades and builders
- Cafés and restaurants
- Coaches and tutors
- Artists and creatives
- Entertainers
- Professional services
- Non-profits and clubs

These profiles are intended to show reusable structure, not real client data.

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

Then visit:

```text
http://localhost:3000
```

To switch the demo site, change `TEMPLATE_PROFILE` in `.env`, for example:

```env
TEMPLATE_PROFILE=restaurant
```

## Tests

```bash
npm test
```

## Privacy and client data

This repository does not contain production client code, real databases, real form submissions, or private client systems. It is a public-safe demonstration of reusable structure and approach.

## About ASR Web Services

ASR Web Services focuses on practical websites and digital systems for service businesses and organisations, including booking and inquiry workflows, maintainable content systems, operational dashboards, and long-term digital stewardship.
