# ASR Web Services Starter Kit

A public showcase repository demonstrating the website foundation ASR Web Services uses for small businesses and service organisations.

This project shows how a clear, maintainable website structure can support enquiry generation, service explanation, trust building and future growth.

## What this demonstrates

- Responsive public pages for service-led businesses
- Reusable layouts and content structure
- Enquiry-focused contact flows
- Industry-specific examples and business scenarios
- Public-safe demo content suitable for portfolio use
- A maintainable foundation that can later connect to deeper operational tools

## Ecosystem role

This repository represents **Foundation Proof** within the ASR ecosystem.

Related proof assets:

- ForwardSteps — Operational Proof
- Aid Cancer Treatment — Relationship Proof
- Operational Systems Demo — Workflow Proof
- ASR Website — Marketing Proof

## Live demo

https://asr-web-services-starter-kit.onrender.com

## Running locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Main routes

```text
/                         Home
/about                    About
/services                 Services
/portfolio                Portfolio examples
/testimonials             Testimonials
/faqs                     FAQ
/contact                  Contact
/showcase-mode            Industry examples
/showcase-mode/:profile   Industry example preview
/healthz                  Health check
```

## Screenshots

### Homepage

![Homepage](screenshots/homepage.png)

### Services

![Services](screenshots/services.png)

### Industry Example

![Industry Example](screenshots/showcase.png)

### Contact Flow

![Contact](screenshots/contact.png)
## Public-safe boundary

This repo uses fictional/demo content and does not contain private client material.

## Technology

- Node.js
- Express
- EJS
- HTML
- CSS
- JavaScript

## Architecture

This project follows a modular Express/EJS structure:

config/
controllers/
core/
data/
modules/
public/
routes/
views/

The structure is designed to remain maintainable as projects grow while avoiding unnecessary complexity.
## Notes

Supporting documentation and historical cleanup notes are stored in `/docs`.
