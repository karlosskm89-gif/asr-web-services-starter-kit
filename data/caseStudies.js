const caseStudies = [
  {
    slug: "forwardsteps-private-practice-platform",
    title: "ForwardSteps — Operational Platform for a Modern Therapy Practice",
    category: "Operational Platform",
    projectType: "Operational Workflow System",
    role: "Founder @ ASR Web Services • Systems Developer",
    status: "Live / Ongoing",

    summary:
      "A fully connected operational platform built for a psychology and wellbeing practice, replacing fragmented workflows with a maintainable environment designed around real day-to-day operations.",

    overview:
      "ForwardSteps began with a simple but important goal: replace a fragmented collection of spreadsheets, forms, emails and disconnected administration with a single operational platform tailored to the real workflow of the practice. What emerged was not simply a booking website, but a connected environment bringing together scheduling, patient records, invoicing, exports, communication workflows and internal administration into one maintainable system.",

    challenge:
      "Before development began, many day-to-day processes relied on manual administration and disconnected tools. Core information existed across spreadsheets, emails and isolated records, creating unnecessary administrative friction and poor visibility between workflows. The goal was not simply to digitise bookings, but to create a structured operational system capable of supporting the long-term reality of the practice.",

    philosophy:
      "The platform was designed around connected workflows rather than isolated modules. One of the defining ideas behind the project became the ability to move fluidly between Patients, Bookings and Invoices as one operational environment. The system prioritised calm administration, maintainability, privacy-conscious design and low-friction workflow management.",

    implementation: [
      "Public-facing booking and enquiry workflows with structured validation",
      "Connected Patients ↔ Bookings ↔ Invoices administration environment",
      "Custom scheduling and booking-overlap handling logic",
      "Integrated messaging and testimonial workflows",
      "CSV and PDF export/reporting support",
      "Structured validation, rate-limiting and operational safeguards",
      "Environment-aware testing and deployment configuration"
    ],

    outcomes: [
      "Centralised operational visibility across workflows",
      "Reduced administrative friction and duplication",
      "Improved day-to-day booking and invoice management",
      "Faster handling of operational tasks",
      "Maintainable and scalable long-term system foundation"
    ],

    takeaway:
      "The objective was never simply to build a booking website. The real objective was to create a maintainable operational platform capable of supporting the day-to-day reality of a growing practice.",

    stack: [
      "Node.js",
      "Express",
      "EJS",
      "MongoDB",
      "Modular middleware architecture",
      "CSV/PDF export tooling"
    ],

    privacyNote:
      "This case study is intentionally narrative-focused. Private client data, internal administration screens and production code are not publicly included."
  },

  {
    slug: "aid-cancer-treatment-digital-support",
    title: "Aid Cancer Treatment — Building Digital Foundations for a Community Charity",
    category: "Charity Digital Infrastructure",
    projectType: "Long-Term Digital Stewardship",
    role: "Founder @ ASR Web Services • Technical Lead & Ongoing Digital Support",
    status: "Live / Ongoing",

    summary:
      "A long-term digital stewardship project supporting fundraising, communication, campaigns and operational reliability for a Cork-based charity organisation.",

    overview:
      "Aid Cancer Treatment approached Karl Murphy in 2021 to help establish the organisation’s first real digital presence. At the time, the charity had strong community support offline but no structured website or unified digital infrastructure. What began as a small foundational project gradually evolved into a long-term operational partnership spanning website development, fundraising support, campaign coordination, digital stewardship and broader organisational support.",

    challenge:
      "The organisation needed a trustworthy online presence capable of supporting fundraising, community communication and public engagement. The challenge was not simply technical — the platform needed to feel calm, accessible and respectful for patients, families, donors and volunteers while remaining maintainable over time.",

    philosophy:
      "The ACT project was approached as long-term stewardship rather than a once-off website build. The platform prioritised clarity, accessibility, operational simplicity and maintainability. Over time, the relationship evolved beyond technical support into ongoing operational collaboration supporting campaigns, fundraising and communication workflows.",

    implementation: [
      "Initial lightweight static website establishing ACT’s first digital foundations",
      "Donation and fundraising integration support",
      "Responsive layouts and accessible navigation",
      "Long-term content and campaign coordination",
      "Migration from static v1 platform into responsive data-driven v2 rebuild",
      "Improved fundraising, update and communication workflows",
      "Support for QR campaigns, social outreach and community fundraising"
    ],

    outcomes: [
      "Established a professional and trustworthy digital presence",
      "Improved organisational communication and visibility",
      "Simplified campaign publishing and content management",
      "Improved consistency across fundraising and donation platforms",
      "Created a scalable digital foundation supporting ongoing growth"
    ],

    takeaway:
      "The project reinforced that strong digital systems are built through long-term trust, stewardship and consistency — not simply through launching websites.",

    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express",
      "EJS",
      "Data-driven content workflows"
    ],

    impact:
      "The long-term trust built through the relationship eventually led to becoming part of the organisation’s Board of Directors.",

    privacyNote:
      "This case study focuses on public-facing operational and organisational work. Internal charity operations and private systems are intentionally omitted."
  }
];


function getCaseStudy(slug) {
  return caseStudies.find((item) => item.slug === slug);
}

module.exports = {
  caseStudies,
  getCaseStudy,
};

