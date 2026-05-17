// core/utils/htmlEmailTemplates.js

function contactEmailHtml({ builder, form }) {
  const safe = (value) => (value || "").toString().trim();

  const name = safe(form.name);
  const email = safe(form.email);
  const phone = safe(form.phone);
  const details = safe(form.details);

  const businessName = builder?.businessName || "Website enquiry";

  return `
    <h2>New contact from ${businessName}</h2>
    <p><strong>Name:</strong> ${name || "Not provided"}</p>
    <p><strong>Email:</strong> ${email || "Not provided"}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p><strong>Message:</strong><br>${details || "No message provided."}</p>
  `;
}

module.exports = {
  contactEmailHtml,
};
