const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");
const {
  slowDown,
  contactLimiter,
  asyncHandler,
  contactValidator,
  csrfProtection,
} = require("../core");

// Public pages
router.get("/", asyncHandler(siteController.home));
router.get("/about", asyncHandler(siteController.about));
router.get("/services", asyncHandler(siteController.services));
router.get("/portfolio", asyncHandler(siteController.portfolio));
router.get("/testimonials", asyncHandler(siteController.testimonials));
router.get("/faqs", asyncHandler(siteController.faqs));
router.get("/contact", asyncHandler(siteController.contact));
router.get("/success", asyncHandler(siteController.success));

// Contact submission
router.post(
  "/contact",
  csrfProtection,
  contactLimiter,
  slowDown,
  contactValidator,
  asyncHandler(siteController.contactPost)
);

module.exports = router;
