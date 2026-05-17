// scripts/newProfile.js
//
// Usage: node scripts/newProfile.js builder plasterer
//
// Creates: modules/builder/plasterer.js
// Template matches the live profile schema used by the app.
//

const fs = require("fs");
const path = require("path");

function toCamelCase(str) {
  return str
    .split(/[\s\-_.]+/)
    .filter(Boolean)
    .map((part, index) => {
      const lower = part.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function usageAndExit() {
  console.log("Usage: node scripts/newProfile.js <sector> <name>");
  console.log("  sector: builder, coach, cafe, corporate, artist, entertainer, nonProfits");
  console.log("  name:   short identifier, e.g. 'plasterer', 'life-coach'");
  process.exit(1);
}

const [, , sectorArg, nameArg] = process.argv;

if (!sectorArg || !nameArg) {
  usageAndExit();
}

const sector = sectorArg;
const profileKey = toCamelCase(nameArg);      // e.g. "plasterer" -> "plasterer", "life-coach" -> "lifeCoach"
const fileName = `${profileKey}.js`;          // modules/builder/lifeCoach.js
const businessSlug = toKebabCase(profileKey); // e.g. "life-coach"

const modulesDir = path.join(__dirname, "..", "modules", sector);
const targetPath = path.join(modulesDir, fileName);

if (!fs.existsSync(modulesDir)) {
  console.error(`\n[ERROR] Sector directory does not exist: ${modulesDir}\n`);
  process.exit(1);
}

if (fs.existsSync(targetPath)) {
  console.error(`\n[ERROR] Target file already exists: ${targetPath}\n`);
  process.exit(1);
}

const template = `
// Auto-generated profile module.
// Remember:
//   1) Register this profile in config/profileLoader.js
//   2) Set TEMPLATE_PROFILE=${profileKey} in your .env to preview it.

const profile = {
  // Basic identity
  businessName: "Your Business Name",
  slug: "${businessSlug}",
  ownerName: "Owner Name",
  area: "Your Town / Region",
  tagline: "A short, punchy tagline that explains what you do.",

  // Contact
  phone: "000 000 0000",
  email: "info@example.com",
  emailRecipient: "owner@example.com",

  // Theming
  themeKey: "${sector === "corporate" ? "corporate" : sector}",

  // Hero section
  hero: {
    headline: "We help your ideal clients solve a specific problem.",
    subheadline: "A short sentence explaining who you serve and what you help them achieve.",
    primaryCtaLabel: "Request a callback",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "View our work",
    secondaryCtaHref: "/portfolio",
  },

  // About section
  about: {
    heading: "About our business",
    intro: "Introduce who you are, how long you have been in business, and what makes you trustworthy.",
    paragraphs: [
      "Use 2–3 paragraphs to give enough detail that a stranger would feel comfortable contacting you.",
      "Mention any qualifications, experience, or guarantees you offer.",
    ],
  },

  // Services
  services: [
    {
      name: "core-service",
      title: "Core Service",
      shortDescription: "A simple one-line explanation of this service.",
      description: "A slightly longer explanation of the service, benefits, and typical outcomes.",
    },
    {
      name: "second-service",
      title: "Second Service",
      shortDescription: "Optional second service to show your range.",
      description: "Explain who this is for and what they get.",
    },
  ],

  // Portfolio / projects
  projects: [
    {
      title: "Sample project or client",
      summary: "Short description of what you did and the result.",
      highlight: "Key result or testimonial snippet.",
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: "Happy Client",
      quote: "They turned up when they said they would, did a great job, and we would recommend them to anyone.",
      location: "Client area / neighbourhood",
    },
  ],

  // FAQs
  faqs: [
    {
      question: "Do you offer free quotes?",
      answer: "Yes – we can usually give a free quote by phone or after a short visit.",
    },
    {
      question: "What areas do you cover?",
      answer: "List your main service areas here so people know if you're local.",
    },
  ],

  // SEO: per-page titles and descriptions
  seo: {
    homeTitle: "Your Business Name | ${sector} services in Your Town",
    homeDescription: "Brief description focused on your core service and area.",
    aboutTitle: "About | Your Business Name",
    aboutDescription: "Explain who you are and why clients trust you.",
    servicesTitle: "Services | Your Business Name",
    servicesDescription: "Overview of your main services and who they are for.",
    portfolioTitle: "Our Work | Your Business Name",
    portfolioDescription: "Highlight a few representative projects or case studies.",
    testimonialsTitle: "Reviews | Your Business Name",
    testimonialsDescription: "Social proof and testimonials from real clients.",
    faqsTitle: "FAQ | Your Business Name",
    faqsDescription: "Common questions about working with you.",
    contactTitle: "Contact | Your Business Name",
    contactDescription: "How to request a quote, book a call, or send a message.",
    metaDescription: "Default meta description for your business if a specific page description is missing.",
  },
};

module.exports = profile;
`.trimStart();

fs.writeFileSync(targetPath, template, "utf8");

console.log(`\nCreated new profile module at:\n  ${targetPath}\n`);
console.log("Next steps:");
console.log("  1) Open the file and customise the copy for this specific business.");
console.log("  2) Register it in config/profileLoader.js under an appropriate key.");
console.log(`  3) Set TEMPLATE_PROFILE=${profileKey} in your .env to preview it.\n`);
