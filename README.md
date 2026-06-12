# ASR Web Services Starter Kit

A public proof-asset repository demonstrating reusable website foundations ASR Web Services can use for small businesses and service organisations.

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

## Main proof routes

```text
/                         Demo overview
/starter-kit              Foundation proof
/showcase-mode            Industry examples and configurator
/showcase-mode/:example   Public-safe industry example preview
/portfolio                Example pages within the demo
/healthz                  Health check
```

The demo keeps older page routes available where useful, but primary navigation should not behave like a second ASR website. Real services, contact and case studies live on https://asrweb.ie.

## Public-safe boundary

This repo uses fictional/demo content and does not contain private client material.

## Notes

Supporting documentation and historical cleanup notes are stored in `/docs`.
