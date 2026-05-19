// controllers/siteController.js
const { sendMail } = require("../core");
const { contactEmailHtml } = require("../core/utils/htmlEmailTemplates");
const { pageTitle, pageDescription } = require("../config/seoHelper");
const { AppError } = require("../core/utils/appError");
const { builder, loadProfile, profiles } = require("../config/profileLoader");
const { showcaseItems, useCases, getShowcaseItem } = require("../data/showcaseItems");
const { caseStudies, getCaseStudy } = require("../data/caseStudies");

function ensureBuilder() {
  if (!builder) {
    throw new AppError(500, "Profile configuration is missing", {
      isOperational: false,
    });
  }
}


function seo(key) {
  return {
    title: pageTitle(builder, key),
    metaDescription: pageDescription(builder, key),
  };
}

function baseView(extra = {}) {
  const pageCss =
    builder.pageCss ||
    (builder.themeKey ? `/css/themes/${builder.themeKey}.css` : null);

    return {
    builder,
    pageCss,
    ...extra,
  };
}


function profileSummary(key) {
  const profile = profiles[key];
  if (!profile) return null;

  return {
    key,
    businessName: profile.businessName || key,
    area: profile.area || "",
    category: profile.themeKey || "demo",
    headline: profile.hero?.headline || profile.seo?.metaDescription || "",
    summary:
      profile.hero?.subheadline ||
      profile.about?.intro ||
      profile.seo?.metaDescription ||
      "Profile-driven demo variant.",
    badges: Array.isArray(profile.hero?.badges) ? profile.hero.badges : [],
    logo: profile.brandLogo || profile.heroImage || null,
  };
}

function allShowcaseProfiles() {
  return Object.keys(profiles)
    .filter((key) => key !== "asrWebServices")
    .map(profileSummary)
    .filter(Boolean)
    .sort((a, b) => a.businessName.localeCompare(b.businessName));
}

function showcaseView(extra = {}) {
  return {
    shellBuilder: builder,
    ...extra,
  };
}

exports.home = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("home");
  res.render("home", baseView({ title, metaDescription }));
};

exports.about = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("about");
  res.render("about", baseView({ title, metaDescription }));
};

exports.services = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("services");
  res.render("services", baseView({ title, metaDescription }));
};

exports.portfolio = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("portfolio");
  res.render("portfolio", baseView({ title, metaDescription }));
};


exports.showcase = (req, res) => {
  res.redirect("/showcase-mode");
};

exports.showcaseMode = (req, res) => {
  ensureBuilder();

  res.render("showcase-mode", baseView({
    title: "Showcase Mode | ASR Web Services Starter Kit",
    metaDescription:
      "Explore profile-driven demo variants inside the ASR Web Services Starter Kit while keeping ASR as the core identity.",
    currentPath: "showcase-mode",
    profiles: allShowcaseProfiles(),
    asrProfile: profileSummary("asrWebServices"),
  }));
};

exports.showcaseProfile = (req, res, next) => {
  ensureBuilder();

  const key = req.params.profileKey;
  const demoProfile = profiles[key];

  if (!demoProfile || key === "asrWebServices") {
    return next(new AppError(404, "Showcase profile not found", {
      isOperational: true,
      meta: { profileKey: key },
    }));
  }

  const selectedProfile = loadProfile(key);
  const pageCss =
    selectedProfile.pageCss ||
    (selectedProfile.themeKey ? `/css/themes/${selectedProfile.themeKey}.css` : null);

  res.render("showcase-profile", showcaseView({
    builder: selectedProfile,
    pageCss,
    title: `${selectedProfile.businessName} | Showcase Mode`,
    metaDescription:
      selectedProfile.seo?.metaDescription ||
      selectedProfile.hero?.subheadline ||
      "Profile-driven demo variant inside the ASR Web Services Starter Kit.",
    currentPath: "showcase-mode",
    profiles: allShowcaseProfiles(),
    selectedKey: key,
  }));
};

exports.showcaseDetail = (req, res, next) => {
  // Legacy showcase detail support retained for older links.
  const item = getShowcaseItem(req.params.slug);

  if (!item) {
    return next(new AppError(404, "Showcase item not found", {
      isOperational: true,
      meta: { slug: req.params.slug },
    }));
  }

  res.redirect(`/showcase-mode`);
};

exports.caseStudies = (req, res) => {
  ensureBuilder();
  res.render("case-studies", baseView({
    title: "Case Studies | ASR Web Services Starter Kit",
    metaDescription: "Public-safe case-study narratives showing how the starter kit approach maps to real websites, booking systems, and digital support work.",
    currentPath: "case-studies",
    caseStudies,
  }));
};

exports.caseStudyDetail = (req, res, next) => {
  ensureBuilder();
  const item = getCaseStudy(req.params.slug);

  if (!item) {
    return next(new AppError(404, "Case study not found", {
      isOperational: true,
      meta: { slug: req.params.slug },
    }));
  }

  res.render("case-study-detail", baseView({
    title: `${item.title} | ASR Web Services Starter Kit`,
    metaDescription: item.summary,
    currentPath: "case-studies",
    item,
  }));
};

exports.testimonials = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("testimonials");
  res.render("testimonials", baseView({ title, metaDescription }));
};

exports.faqs = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("faqs");
  res.render("faqs", baseView({ title, metaDescription }));
};

exports.starterKit = (req, res) => {
  ensureBuilder();
  res.render("starter-kit", baseView({
    title: "ASR Web Services Starter Kit",
    metaDescription: "Profile-driven Express and EJS starter system for small-business websites, booking flows, and enquiry-driven demos.",
    currentPath: "starter-kit",
  }));
};

exports.contact = (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("contact");
  res.render("contact", baseView({ 
    title, metaDescription, old: {},
    csrfToken: req.csrfToken(),
    validationErrors: [] }));
};

// and in contactPost re-render, also use baseView(...)
//  when rendering contact again on validation fail

exports.contactPost = async (req, res) => {
  ensureBuilder();
  const errors = req.validationErrors || [];
  const { title, metaDescription } = seo("contact");

  if (errors.length > 0) {
    return res.render("contact", {
      builder,
      title,
      metaDescription,
      csrfToken: req.csrfToken(),
      validationErrors: errors,
      old: req.body,
    });
  }

  // Send email
  await sendMail({
    to: builder?.emailRecipient || process.env.MAIL_TO,
    subject: `New contact form submission from ${req.body.name}`,
    html: contactEmailHtml({ builder, form: req.body }),
  });

  res.redirect("/success");
};

exports.success = async (req, res) => {
  ensureBuilder();
  const { title, metaDescription } = seo("success");
  res.render("success", baseView({ title, metaDescription }));
};

/*
const { AppError, createError  } = require("../core/utils/appError");

exports.portfolioDetail = async (req, res, next) => {
  const item = builder.projects.find((p) => p.slug === req.params.slug);

  if (!item) {
    return next(
      createError(404, "Project not found", {
        isOperational: true,
        meta: { slug: req.params.slug },
      })
    );
  }

  // render detail view...
};
*/