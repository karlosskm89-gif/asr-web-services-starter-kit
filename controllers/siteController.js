// controllers/siteController.js
const { sendMail } = require("../core");
const { contactEmailHtml } = require("../core/utils/htmlEmailTemplates");
const { pageTitle, pageDescription } = require("../config/seoHelper");
const { AppError } = require("../core/utils/appError");
const { builder, loadProfile, profiles } = require("../config/profileLoader");
const { showcaseItems, useCases, getShowcaseItem } = require("../data/showcaseItems");


function pickOption(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function designOptions(query = {}) {
  return {
    layout: pickOption(query.layout, ["compact", "balanced", "spacious"], "balanced"),
    grid: pickOption(query.grid, ["2", "3", "4"], "3"),
    nav: pickOption(query.nav, ["default", "pill", "underline", "boxed", "side", "compact", "condensed"], "default"),
    cards: pickOption(query.cards, ["soft", "sharp", "elevated"], "soft"),
    background: pickOption(query.background, ["clean", "paper", "wash"], "clean"),
    font: pickOption(query.font, ["system", "serif", "compact"], "system"),
    buttons: pickOption(query.buttons, ["rounded", "square", "bold"], "rounded"),
    hero: pickOption(query.hero, ["split", "centred", "compact"], "split"),
    images: pickOption(query.images, ["framed", "full", "minimal"], "framed"),
    rhythm: pickOption(query.rhythm, ["alternating", "plain", "highlighted"], "alternating"),
    sections: pickOption(query.sections, ["standard", "collapsible"], "standard"),
    cta: pickOption(query.cta, ["direct", "soft", "campaign"], "direct"),
  };
}

function designQueryString(design = {}) {
  const params = new URLSearchParams();
  Object.entries(design).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params.toString();
}

function ensureBuilder() {
  if (!builder) {
    throw new AppError(500, "Example configuration is missing", {
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
      "Public-safe industry example.",
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
  res.render("home", baseView({
    title: "ASR Service Starter Kit Demo",
    metaDescription: "Public-safe ASR proof asset showing reusable website foundations, industry examples and enquiry-flow structure."
  }));
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
  res.render("portfolio", baseView({
    title: "Example Pages | ASR Starter Kit",
    metaDescription: "Example pages inside the ASR Service Starter Kit proof asset. For live client proof and ASR portfolio material, use asrweb.ie/portfolio."
  }));
};


exports.showcase = (req, res) => {
  res.redirect("/showcase-mode");
};

exports.showcaseMode = (req, res) => {
  ensureBuilder();

  const design = designOptions(req.query);
  res.render("showcase-mode", baseView({
    design,
    designQuery: designQueryString(design),
    title: "Industry Examples | ASR Web Services Starter Kit",
    metaDescription:
      "Explore public-safe industry examples inside the ASR Web Services Starter Kit while keeping ASR as the core identity.",
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
    return next(new AppError(404, "Industry example not found", {
      isOperational: true,
      meta: { profileKey: key },
    }));
  }

  const selectedProfile = loadProfile(key);
  const pageCss =
    selectedProfile.pageCss ||
    (selectedProfile.themeKey ? `/css/themes/${selectedProfile.themeKey}.css` : null);

  const design = designOptions(req.query);
  res.render("showcase-profile", showcaseView({
    builder: selectedProfile,
    design,
    designQuery: designQueryString(design),
    pageCss,
    title: `${selectedProfile.businessName} | Industry Examples`,
    metaDescription:
      selectedProfile.seo?.metaDescription ||
      selectedProfile.hero?.subheadline ||
      "Public-safe industry example inside the ASR Web Services Starter Kit.",
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
    metaDescription: "Public-safe Express and EJS starter system for small-business websites, enquiry flows, industry examples and maintainable foundations.",
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
  return res.redirect(303, "https://asrweb.ie/contact");
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