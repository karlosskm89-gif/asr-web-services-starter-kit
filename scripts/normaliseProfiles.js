// scripts/normaliseProfiles.js
// Run with: node scripts/normaliseProfiles.js
// TIP: commit or copy your repo before first run – this rewrites files in place.

const fs = require("fs");
const path = require("path");

// List of profile modules to normalise.
// You can add/remove entries as needed.
const TARGET_MODULES = [
  // Artists
  "modules/artist/author.js",
  "modules/artist/painter.js",
  "modules/artist/photographer.js",

  // Corporate
  "modules/corporate/accountant.js",
  "modules/corporate/consultant.js",
  "modules/corporate/solicitor.js",

  // Entertainers
  "modules/entertainer/band.js",
  "modules/entertainer/dj.js",
  "modules/entertainer/bouncyCastles.js",
  "modules/entertainer/clowns.js",
  "modules/entertainer/facePainter.js",

  // Non-profits
  "modules/nonProfits/charity.js",
  "modules/nonProfits/clubs.js",

  // Cafe extras
  "modules/cafe/restaurant.js",
  "modules/cafe/takeAway.js",

  // OPTIONAL: add your existing ones if you want them normalised too:
   "modules/cafe/coffeeShop.js",
   "modules/coach/lifeCoach.js",
   "modules/coach/musicLessons.js",
   "modules/coach/sportCoach.js",
   "modules/builder/plasterer.js",
   "modules/builder/carpenter.js",
   "modules/builder/electrician.js",
   "modules/builder/painter.js",
   "modules/builder/plumber.js",
];

function normaliseHero(hero = {}) {
  if (hero.heading && !hero.headline) {
    hero.headline = hero.heading;
    delete hero.heading;
  }
  if (hero.subheading && !hero.subheadline) {
    hero.subheadline = hero.subheading;
    delete hero.subheading;
  }
  return hero;
}

function normaliseServices(services = []) {
  return services.map((s, idx) => {
    const copy = { ...s };

    // Give each service a stable key if none exists
    if (!copy.key && copy.name) {
      copy.key = copy.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `service-${idx + 1}`;
    }

    // Title/description used by views
    if (!copy.title && copy.name) {
      copy.title = copy.name;
    }
    if (!copy.description) {
      if (copy.shortDescription) {
        copy.description = copy.shortDescription;
      } else if (copy.blurb) {
        copy.description = copy.blurb;
      } else {
        copy.description = "";
      }
    }

    // Keep existing fields (shortDescription, blurb, meta, details, startingPrice) as-is
    return copy;
  });
}

function normaliseFaqs(faqs = []) {
  return faqs.map((f) => {
    const copy = { ...f };
    copy.q = copy.q || copy.question || "";
    copy.a = copy.a || copy.answer || "";
    return copy;
  });
}

function normaliseTestimonials(testimonials = []) {
  return testimonials.map((t) => {
    const copy = { ...t };

    if (!copy.author) {
      if (copy.name && copy.role) {
        copy.author = `${copy.name}, ${copy.role}`;
      } else if (copy.name) {
        copy.author = copy.name;
      } else {
        copy.author = "";
      }
    }

    return copy;
  });
}

function normaliseProjects(projects = []) {
  return projects.map((p, idx) => {
    const copy = { ...p };

    if (!copy.title && copy.name) {
      copy.title = copy.name;
    } else if (!copy.title) {
      copy.title = `Project ${idx + 1}`;
    }

    if (!copy.description) {
      if (copy.summary && copy.outcome) {
        copy.description = `${copy.summary} ${copy.outcome}`;
      } else if (copy.summary) {
        copy.description = copy.summary;
      } else {
        copy.description = "";
      }
    }

    return copy;
  });
}

function normaliseContact(profile) {
  if (profile.contact) {
    const c = profile.contact;
    if (c.phone && !profile.phone) profile.phone = c.phone;
    if (c.email && !profile.email) profile.email = c.email;
    if (c.area && !profile.area) profile.area = c.area;
  }
}

function normaliseProfile(profile) {
  const copy = { ...profile };

  // Lift contact details to top-level if needed
  normaliseContact(copy);

  // Hero
  if (copy.hero) {
    copy.hero = normaliseHero(copy.hero);
  }

  // Services, FAQs, testimonials, projects
  if (Array.isArray(copy.services)) {
    copy.services = normaliseServices(copy.services);
  }

  if (Array.isArray(copy.faqs)) {
    copy.faqs = normaliseFaqs(copy.faqs);
  }

  if (Array.isArray(copy.testimonials)) {
    copy.testimonials = normaliseTestimonials(copy.testimonials);
  }

  if (Array.isArray(copy.projects)) {
    copy.projects = normaliseProjects(copy.projects);
  }

  return copy;
}

function main() {
  const root = path.join(__dirname, "..");

  TARGET_MODULES.forEach((relPath) => {
    const fullPath = path.join(root, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn("Skipping (not found):", relPath);
      return;
    }

    // Clear require cache so we always read fresh
    delete require.cache[require.resolve(fullPath)];
    const profile = require(fullPath);

    const normalised = normaliseProfile(profile);

    const output =
      "module.exports = " + JSON.stringify(normalised, null, 2) + ";\n";

    fs.writeFileSync(fullPath, output, "utf8");
    console.log("Normalised:", relPath);
  });

  console.log("Done.");
}

main();
