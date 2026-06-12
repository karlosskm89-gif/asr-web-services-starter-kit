## Showcase Mode industry examples refactor

- Reframed the old showcase layer as Showcase Mode.
- Kept ASR Web Services as the core/default identity.
- Added `/showcase-mode` profile selector.
- Added `/showcase-mode/:profileKey` demo preview routes.
- Preserved legacy `/showcase` redirects for older links.
- Added ASR shell support so industry examples render inside ASR-branded chrome.

# Changelog

## 2026-05-19 — Case-study separation pass

- Removed full client case-study pages and source documents from the starter-kit repo.
- Removed `/case-studies` routes from the public demo.
- Repositioned the starter kit as a focused technical/reusable architecture demo.
- Moved full case-study documents to the package-level `CaseStudies/` folder for website/PDF publication.


## 2026-05-18 — Showcase expansion pass

- Added three additional fictional public-safe showcase examples:
  - Cedar Legal Consulting
  - Summit Fit Studio
  - Bloomfield Florist
- Added matching SVG card and screen preview assets for the new showcase items.
- Expanded README and showcase roadmap documentation to reflect the broader set of examples.
- Cleaned showcase data export structure so all examples use the same complete data model.

## 2026-05-18 — Complete public-facing showcase and case-study pass

- Expanded `/showcase` from a partial placeholder layer into five complete fictional showcase examples:
  - Oakline Decorating Co.
  - Harbour Brew Café
  - Luma Creative Home Base
  - Haven Wellness Practice
  - Riverbend Community Club
- Added matching public-safe SVG card and screen preview assets for each showcase example.
- Added `/case-studies` route and dynamic `/case-studies/:slug` detail pages.
- Added public-safe case-study narratives for:
  - ForwardSteps Private Practice Platform
  - Aid Cancer Treatment Digital Support
  - ASR Web Services Starter Kit
- Added `data/caseStudies.js` for maintainable case-study content.
- Added documentation for proposal usage, screenshot capture, publishing checks, and completion status.
- Updated README to reflect the completed public-facing starter kit, showcase, and case-study structure.
- Updated navigation/footer links to include Case Studies.

## 2026-05-17 — Public showcase polish

- Added a public-safe `/showcase` route.
- Added dynamic showcase detail pages via `/showcase/:slug`.
- Added one concrete fictionalised showcase example: **Oakline Decorating Co.**
- Added showcase data in `data/showcaseItems.js`.
- Added SVG preview assets for showcase cards and detail pages.
- Added screenshot folder guidance for future README images.
- Expanded public documentation around industry examples, fictionalisation, public/private boundaries, and showcase strategy.

## Initial public-ready release

- Cleaned public starter kit package.
- Removed private local environment files and archive material.
- Added `.env.example`.
- Added public README and documentation.
- Verified core routes and test suite.
