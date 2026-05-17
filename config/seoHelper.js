// config/seoHelper.js

/**
 * Map route/controller keys to human-readable page names.
 */
const PAGE_LABELS = {
  home: "Home",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  testimonials: "Testimonials",
  faqs: "FAQs",
  contact: "Contact",
  success: "Thank You",
};

/**
 * Build a page <title> value.
 *
 * Examples:
 *   Home + "Dublin Plastering & Rendering" -> "Dublin Plastering & Rendering"
 *   About + "Dublin Plastering & Rendering" -> "About | Dublin Plastering & Rendering"
 */
function pageTitle(builder, key) {
  const base = builder?.businessName || "Website";
  const label = PAGE_LABELS[key] || "";

  if (!label || key === "home") {
    return base;
  }

  return `${label} | ${base}`;
}

/**
 * Build a meta description for the page.
 *
 * Tries, in order:
 *  - builder.seo[`${key}Description`]
 *  - builder.seo.metaDescription
 *  - a generic fall-back using business name + area
 */
function pageDescription(builder, key) {
  const seo = builder?.seo || {};

  const specificKey = `${key}Description`;
  if (seo[specificKey]) {
    return seo[specificKey];
  }

  if (seo.metaDescription) {
    return seo.metaDescription;
  }

  const businessName = builder?.businessName || "Our business";
  const area = builder?.area || "";

  return `${businessName} ${area}`.trim();
}

module.exports = {
  pageTitle,
  pageDescription,
};
