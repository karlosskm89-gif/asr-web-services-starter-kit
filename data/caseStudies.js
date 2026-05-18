const caseStudies = [
  {
    slug: "forwardsteps-private-practice-platform",
    title: "ForwardSteps Private Practice Platform",
    category: "Booking and admin system",
    projectType: "Operational Platform",
    role: "Founder @ ASR Web Services • Systems Developer",
    status: "Live / Ongoing",
    summary:
      "A fully connected private-practice platform replacing fragmented manual workflows with a structured operational system used in day-to-day practice management.",
    problem:
      "The original workflow relied on email, spreadsheets, paper records, and disconnected tools. This created admin overload, poor visibility, and a fragmented scheduling process that made it difficult to manage records and workflows consistently.",
    solution:
      "The platform consolidated public enquiries, booking workflows, linked records, invoicing, exports, and admin operations into one maintainable system. The goal was not just to create a website, but to build an operational platform that reduced friction and improved day-to-day reliability.",
    outcomes: [
      "Centralised records and scheduling workflows",
      "Reduced admin friction from fragmented tools",
      "Improved visibility across bookings, invoices, and communications",
      "Faster day-to-day operational handling",
      "Platform designed for long-term maintainability and scalability",
    ],
    takeaway:
      "The goal was not simply to digitise bookings, but to connect the entire operational workflow into one maintainable system.",
    highlights: [
      "Linked Patients ↔ Bookings ↔ Invoices workflow",
      "Custom booking overlap and scheduling logic",
      "Centralised operational records",
      "CSV/PDF exports and reporting workflows",
      "Integrated messages database and admin tooling",
      "Documentation and maintainability focus",
    ],
    stack: ["Node.js", "Express", "EJS", "MongoDB", "CSV/PDF exports", "Custom middleware"],
    privacyNote:
      "This case study is narrative only. Production code, private data, admin screens, and client-specific internals are not included in this repository.",
  },
  {
    slug: "aid-cancer-treatment-digital-support",
    title: "Aid Cancer Treatment Digital Support",
    category: "Charity website and fundraising support",
    projectType: "Charity Digital Infrastructure",
    role: "Founder @ ASR Web Services • Technical Lead & Ongoing Digital Support",
    status: "Live / Ongoing",
    summary:
      "A long-term digital stewardship project covering website infrastructure, fundraising support, public communication, and ongoing operational reliability for a charity organisation.",
    problem:
      "Originally, there was no website, digital system, or structured online presence. Over time, the organisation required a more maintainable, professional, and responsive platform capable of supporting campaigns, fundraising, news updates, and public trust.",
    solution:
      "The project evolved from building the organisation’s original digital foundations into a full rebuild of the platform as a responsive, data-driven system. Particular care was taken during content migration, maintaining consistency across pages and external fundraising platforms, and improving long-term maintainability.",
    outcomes: [
      "Established a consistent digital presence for the organisation",
      "Improved public-facing professionalism and trust",
      "Simplified ongoing content and fundraising management",
      "Improved branding consistency across donation and campaign platforms",
      "Enabled faster campaign publishing and communication workflows",
    ],
    takeaway:
      "Building long-term operational trust mattered just as much as the website itself.",
    highlights: [
      "Complete rebuild from static v1 to responsive data-driven v2",
      "Fundraising and campaign support workflows",
      "Improved donation platform branding and consistency",
      "Content publishing and operational update workflows",
      "Long-term technical stewardship and organisational trust",
      "Public recognition leading to board-level involvement",
    ],
    stack: ["Express", "EJS", "MongoDB", "Content data files", "Donation links", "Responsive CSS"],
    privacyNote:
      "This case study uses public-safe narrative details only. Private communications, donor information, internal admin material, and production code are excluded.",
  },
  {
    slug: "asr-web-services-starter-kit",
    title: "ASR Web Services Starter Kit",
    category: "Reusable public starter architecture",
    status: "Open public repo",
    summary:
      "A reusable Express/EJS starter kit for small-business websites, enquiry flows, profile-driven content, and public-safe showcase examples.",
    problem:
      "Small-business website work often repeats the same foundations: clear pages, contact flow, service structure, SEO metadata, content variants, and maintainable templates.",
    solution:
      "This public starter kit packages those foundations into a documented, profile-driven Express/EJS system that can demonstrate architecture, mockups, use cases, and public-safe examples.",
    highlights: [
      "Profile switching via TEMPLATE_PROFILE",
      "Reusable Express/EJS routing and views",
      "Contact form validation and CSRF protection",
      "Showcase and case-study layers",
      "Public documentation and repo hygiene",
    ],
    stack: ["Node.js", "Express", "EJS", "CSS", "Helmet", "Rate limiting", "Node test runner"],
    privacyNote:
      "This is the public repository itself. It contains fictional/demo content only and is designed to avoid exposing production client material.",
  },
];

function getCaseStudy(slug) {
  return caseStudies.find((item) => item.slug === slug);
}

module.exports = {
  caseStudies,
  getCaseStudy,
};
