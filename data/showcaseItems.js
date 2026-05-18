const showcaseItems = [
  {
    slug: "oakline-decorating",
    title: "Oakline Decorating Co.",
    category: "Trades / decorating showcase",
    status: "Complete fictional example",
    image: "/images/showcase/oakline-decorating-card.svg",
    screenshot: "/images/showcase/oakline-decorating-screen.svg",
    summary:
      "A fictional painting and decorating website concept built to demonstrate an enquiry-led structure for local trades and home-improvement businesses.",
    demonstrates: [
      "Quote-request CTA",
      "Service-area messaging",
      "Trust and proof sections",
      "Mobile-first contact flow",
    ],
    problem:
      "Many local trades businesses rely on word-of-mouth, social pages, or outdated websites that do not clearly explain services, locations, trust signals, or the next step for a visitor.",
    solution:
      "This showcase demonstrates how a simple trades website can be structured around fast enquiry capture: hero CTA, services, proof points, location coverage, and a straightforward contact path.",
    sections: [
      "Hero section with quote-focused CTA",
      "Services and common job types",
      "Trust signals and local credibility",
      "Simple project/process explanation",
      "Contact and enquiry prompt",
    ],
    publicNote:
      "This is a fictionalised showcase. It does not use real client branding, phone numbers, email addresses, domains, or private project content.",
  },
  {
    slug: "harbour-brew-cafe",
    title: "Harbour Brew Café",
    category: "Café / local hospitality showcase",
    status: "Complete fictional example",
    image: "/images/showcase/harbour-brew-card.svg",
    screenshot: "/images/showcase/harbour-brew-screen.svg",
    summary:
      "A fictional café website concept showing how a local food or hospitality business can present menus, opening hours, location, events, and customer contact paths clearly.",
    demonstrates: [
      "Menu-led structure",
      "Opening-hours visibility",
      "Local trust and atmosphere",
      "Events/promotions area",
    ],
    problem:
      "Small cafés and local hospitality businesses often have scattered information across social media, Google listings, and old menu images, making it harder for customers to quickly find what they need.",
    solution:
      "This concept gathers key customer information into one structured site: menu highlights, opening hours, location, private booking enquiries, seasonal notices, and a simple contact route.",
    sections: [
      "Hero with visit/order CTA",
      "Menu highlights",
      "Opening hours and location",
      "Events or seasonal promotion section",
      "Contact/reservation enquiry prompt",
    ],
    publicNote:
      "This is a fictional hospitality showcase using placeholder branding and content. It is intended to demonstrate structure and presentation only.",
  },
  {
    slug: "luma-creative-home-base",
    title: "Luma Creative Home Base",
    category: "Creator / personal brand showcase",
    status: "Complete fictional example",
    image: "/images/showcase/luma-creative-card.svg",
    screenshot: "/images/showcase/luma-creative-screen.svg",
    summary:
      "A fictional creator home-base concept for bringing social profiles, services, campaign links, featured work, and contact options into one polished website.",
    demonstrates: [
      "Personal brand positioning",
      "Social/profile linking",
      "Campaign landing structure",
      "Content-led layout",
    ],
    problem:
      "Creators and independent professionals often have activity spread across social platforms with no clear central place to explain who they are, what they offer, and how to contact them.",
    solution:
      "This concept shows a simple home-base layout that gathers links, work examples, services, and calls-to-action into one managed website structure.",
    sections: [
      "Personal intro and positioning",
      "Featured links and platforms",
      "Services/collaboration options",
      "Media or featured work area",
      "Contact CTA",
    ],
    publicNote:
      "This is a fictional creator showcase. It is not a publication of a real influencer, agency, or personal brand proposal.",
  },
  {
    slug: "haven-wellness-practice",
    title: "Haven Wellness Practice",
    category: "Private practice / wellness showcase",
    status: "Complete fictional example",
    image: "/images/showcase/haven-wellness-card.svg",
    screenshot: "/images/showcase/haven-wellness-screen.svg",
    summary:
      "A calm private-practice website pattern for service providers who need trust, service explanation, testimonials, FAQs, and appointment enquiries.",
    demonstrates: [
      "Appointment enquiry flow",
      "Trust-led content",
      "FAQ/testimonial structure",
      "Admin-ready foundation",
    ],
    problem:
      "Private practices need websites that feel calm and credible while still guiding visitors toward a clear next step, whether that is an appointment request, enquiry, or phone call.",
    solution:
      "This pattern combines services, testimonials, FAQs, and appointment enquiry prompts into a clean structure suitable for wellness and consulting-style businesses.",
    sections: [
      "Calm hero section",
      "Service explanation blocks",
      "Testimonials and trust content",
      "FAQ structure",
      "Appointment/contact CTA",
    ],
    publicNote:
      "This is a reusable fictional pattern inspired by common private-practice website needs, not a publication of private client systems.",
  },
  {
    slug: "riverbend-community-club",
    title: "Riverbend Community Club",
    category: "Charity / club showcase",
    status: "Complete fictional example",
    image: "/images/showcase/riverbend-club-card.svg",
    screenshot: "/images/showcase/riverbend-club-screen.svg",
    summary:
      "A fictional community organisation concept showing how events, donations, updates, volunteers, and contact information can be organised into a maintainable public site.",
    demonstrates: [
      "Events and updates structure",
      "Donation/support CTA",
      "Volunteer information",
      "Public trust content",
    ],
    problem:
      "Small charities, clubs, and community groups often need to publish updates quickly, explain their work clearly, and direct supporters toward donations, volunteering, or contact forms.",
    solution:
      "This showcase demonstrates a simple public information architecture for community organisations: mission, updates, events, support pathways, and contact details.",
    sections: [
      "Mission-led hero section",
      "News/events preview",
      "Donation or support CTA",
      "Volunteer/member information",
      "Contact and trust details",
    ],
    publicNote:
      "This is a fictional community organisation showcase. It contains no real charity data, donor information, or private organisational material.",
  },
  {
    slug: "cedar-legal-consulting",
    title: "Cedar Legal Consulting",
    category: "Professional services showcase",
    status: "Complete fictional example",
    image: "/images/showcase/cedar-legal-card.svg",
    screenshot: "/images/showcase/cedar-legal-screen.svg",
    summary:
      "A professional-services website concept for consultants, solicitors, accountants, and advisory firms that need credibility, clarity, and structured enquiry paths.",
    demonstrates: [
      "Service-led navigation",
      "Trust and credentials",
      "Consultation enquiry flow",
      "Clear sector positioning",
    ],
    problem:
      "Professional service firms often have dense, generic websites that make it difficult for visitors to understand what help is offered, who it is for, and how to make a suitable enquiry.",
    solution:
      "This showcase organises services, credibility signals, process explanations, and consultation prompts into a clear structure that supports informed enquiries without overwhelming visitors.",
    sections: [
      "Authority-led hero section",
      "Service categories and client types",
      "Process / how we work section",
      "Credentials and trust markers",
      "Consultation enquiry CTA",
    ],
    publicNote:
      "This is a fictional professional-services showcase. It does not represent a real legal, accountancy, or consulting client.",
  },
  {
    slug: "summit-fit-studio",
    title: "Summit Fit Studio",
    category: "Fitness / studio showcase",
    status: "Complete fictional example",
    image: "/images/showcase/summit-fit-card.svg",
    screenshot: "/images/showcase/summit-fit-screen.svg",
    summary:
      "A fitness studio concept showing how classes, memberships, trainer profiles, timetables, and trial-session enquiries can be presented clearly for local service businesses.",
    demonstrates: [
      "Class timetable structure",
      "Membership CTA",
      "Trainer/profile sections",
      "Trial booking prompt",
    ],
    problem:
      "Gyms and studios often rely on social posts for updates while important information such as class types, pricing, schedules, and trial options is spread across different channels.",
    solution:
      "This concept brings core studio information into one structured website with programme highlights, timetable prompts, membership routes, trainer trust signals, and a clear trial-session enquiry path.",
    sections: [
      "Energetic hero with trial CTA",
      "Classes and programmes overview",
      "Timetable / schedule preview",
      "Trainer and community proof",
      "Membership or trial enquiry form",
    ],
    publicNote:
      "This is a fictional fitness/studio showcase using placeholder branding and content only.",
  },
  {
    slug: "bloomfield-florist",
    title: "Bloomfield Florist",
    category: "Local retail / florist showcase",
    status: "Complete fictional example",
    image: "/images/showcase/bloomfield-florist-card.svg",
    screenshot: "/images/showcase/bloomfield-florist-screen.svg",
    summary:
      "A local retail website concept for florists, gift shops, and boutique sellers who need product highlights, occasion-based browsing, delivery information, and enquiry paths.",
    demonstrates: [
      "Product/category highlights",
      "Occasion-led browsing",
      "Delivery information",
      "Order/enquiry CTA",
    ],
    problem:
      "Small retailers often need a web presence that supports browsing and enquiries without immediately becoming a complex ecommerce build or requiring heavy maintenance.",
    solution:
      "This showcase demonstrates a lightweight retail structure: featured ranges, occasions, delivery notes, seasonal promotions, and a clear order/enquiry path that can later grow into ecommerce if needed.",
    sections: [
      "Warm product-led hero section",
      "Featured bouquets / gift ranges",
      "Occasion-based categories",
      "Delivery and collection information",
      "Order enquiry CTA",
    ],
    publicNote:
      "This is a fictional retail showcase. It does not use real shop branding, inventory, pricing, or customer data.",
  },
];

const useCases = [
  {
    title: "Proposal mockups",
    text: "Rapidly shape a credible first version of a small-business website using reusable sections, profile data, and theme variants.",
  },
  {
    title: "Client discovery demos",
    text: "Show how a service business site could be structured before committing to a full build or custom platform.",
  },
  {
    title: "Portfolio proof",
    text: "Demonstrate real architecture and reusable thinking without exposing private client repositories or production systems.",
  },
  {
    title: "Starter builds",
    text: "Use the same foundation as a clean starting point for enquiry-driven websites, booking flows, and operational web systems.",
  },
  {
    title: "Agency handoff",
    text: "Give agencies a documented starting point for backend-ready, content-driven small-business builds.",
  },
  {
    title: "Niche testing",
    text: "Switch between profiles to test how the same structure works for trades, cafés, creators, practices, charities, and professional services.",
  },
];

function getShowcaseItem(slug) {
  return showcaseItems.find((item) => item.slug === slug);
}

module.exports = {
  showcaseItems,
  useCases,
  getShowcaseItem,
};
