# Developer Guide

## Run locally

```bash
npm install
cp .env.example .env
npm start
npm test
```

## Switch profile

Set `TEMPLATE_PROFILE` in `.env`, for example:

```env
TEMPLATE_PROFILE=plasterer
```

Each profile controls business name, hero copy, services, project cards, testimonials, FAQs, theme key and metadata.

## Add a profile

1. Add a module under `modules/`.
2. Register it in `config/profileLoader.js` if needed.
3. Keep content fictional/public-safe unless this is a real private client repo.
4. Add or reuse a theme under `public/css/themes/`.
5. Run `npm test` and manually check the core routes.

## Public release checks

- No credentials or real client data.
- No unused heavyweight source assets.
- Contact route validates input and uses CSRF.
- `npm audit --omit=dev` is clean.
- `/healthz` works for deployment monitoring.
