# Showcase Structure

The showcase layer is now a complete public-safe portfolio section rather than a placeholder, with a wider spread of fictional business types.

## Current showcase examples

- Oakline Decorating Co. — trades/decorating website pattern
- Harbour Brew Café — café/local hospitality website pattern
- Luma Creative Home Base — creator/personal brand hub pattern
- Haven Wellness Practice — private practice/wellness website pattern
- Riverbend Community Club — charity/club/community organisation pattern

Each item is stored in `data/showcaseItems.js` and rendered through:

```text
/showcase
/showcase/:slug
```

## What each item includes

- fictional business name
- category
- status
- summary
- problem
- solution pattern
- typical sections
- public safety note
- card SVG asset
- screen preview SVG asset

## Why fictional examples are used

The aim is to show layout thinking, business logic, and proposal/mockup capability without publishing real client branding, contact details, private proposal work, or production code.

## Adding another showcase later

Only add a new showcase when it brings a genuinely different use case. Avoid filler.

Checklist:

- [ ] fictional name
- [ ] fictional contact/branding only
- [ ] no real client text
- [ ] matching SVG or screenshot
- [ ] problem/solution notes
- [ ] clear public safety note
