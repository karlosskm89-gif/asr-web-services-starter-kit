# ASR Template Framework

A small, reusable Express + EJS framework for spinning up brochure-style client websites
(builders, cafés, coaches, corporate, etc.) using shared plumbing:

- Express
- EJS layouts
- CSRF protection
- Rate limiting
- Validation
- Mailer (SendGrid)
- Shared generic pages (home, services, projects, testimonials, contact)

You only swap out a **profile config** (business name, services, projects, testimonials)
to create a new client demo.

---

## 1. Requirements

- Node 18+ (or whatever you're using elsewhere)
- npm or yarn
- SendGrid (or compatible) API key for email sending

---

## 2. Getting Started

```bash
git clone <this-repo>
cd templates-framework
npm install
cp .env.example .env   # or create .env manually
Fill in .env:

env
Copy code
NODE_ENV=development
PORT=3000

SENDGRID_API_KEY=your-sendgrid-api-key-here
MAIL_FROM="Your Name <no-reply@yourdomain.com>"
MAIL_TO=you@yourdomain.com

# Which site profile to use (see below)
TEMPLATE_PROFILE=plasterer
Then run:

bash
Copy code
npm start   # or: node app.js / nodemon app.js
Visit: http://localhost:3000

3. Project Structure (high level)
text
Copy code
templates-framework/
  app.js
  .env
  package.json

  core/                     # Shared engine from ForwardSteps/ASR
    middleware/
      csrf.js
      rateLimiter.js
      helmet.js
      errorHandlers.js
      validators/
        contactValidator.js
        index.js
    utils/
      mailer.js
      asyncHandler.js
    index.js               # exports core helpers

  controllers/
    siteController.js      # feeds config into generic views

  routes/
    site.js                # /, /services, /projects, /testimonials, /contact

  modules/
    builders/
      config/
        plasterer.js       # example profile (can copy for real clients)

  views/
    layouts/
      mainLayout.ejs
    partials/
      csrfInput.ejs
    home.ejs
    services.ejs
    projects.ejs
    testimonials.ejs
    contact.ejs
    contact-success.ejs
    404.ejs
    500.ejs

  public/
    css/
      base.css             # or your ASR CSS framework
4. Profiles (plasterer, coach, café, etc.)
A profile is just a config file exporting business-specific data:

js
Copy code
// modules/builders/config/plasterer.js
module.exports = {
  businessName: "Dublin Plastering & Rendering",
  area: "Dublin & Surrounding Areas",
  phone: "087 123 4567",
  email: "info@dublinplastering.ie",

  hero: { headline, subheadline },
  services: [ ... ],
  projects: [ ... ],
  testimonials: [ ... ],
  seo: { metaDescription: "..." }
};
All generic views (home.ejs, services.ejs, projects.ejs, testimonials.ejs, contact.ejs)
use this config via the controller.

5. Switching Profile via .env
Set:

env
Copy code
TEMPLATE_PROFILE=plasterer
Then the app will load plasterer.js through a small loader (see below).

Later you can add more:

coachDemo.js

cafeDemo.js

corporateDemo.js

and just change TEMPLATE_PROFILE to swap the entire site over without touching controllers or views.

6. Creating a New Client Site in ~10 Minutes
Copy an existing profile (e.g. plasterer):

bash
Copy code
cp modules/builders/config/plasterer.js modules/builders/config/premierPlasteringKildare.js
Edit the new file and update:

businessName, area, phone, email

hero text

services, projects, testimonials

Set .env:

env
Copy code
TEMPLATE_PROFILE=premierPlasteringKildare
Run the app:

bash
Copy code
npm start
Check:

/ (home)

/services

/projects

/testimonials

/contact → submit form → confirm email is received

At this point you have a real, working site for that client.

7. Deploying
High-level deployment steps (Render, Railway, etc.):

Push this project to GitHub.

Create a new Node service on your platform.

Set environment variables:

NODE_ENV=production

PORT (platform default)

SENDGRID_API_KEY

MAIL_FROM

MAIL_TO (usually the client's email)

TEMPLATE_PROFILE (which client config to use)

Point the client's domain DNS at your hosting provider (CNAME/A).

8. Extending
Add new profiles under modules/<niche>/config/.

Reuse the same generic views for most sites.

If a niche needs something special (e.g. booking widget for coaches),
you can add extra views/routes without touching the core framework.
