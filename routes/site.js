const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");
const {
  asyncHandler,
} = require("../core");

// Public pages
router.get("/", asyncHandler(siteController.home));
router.get("/about", (req, res) => res.redirect(301, "/starter-kit"));
router.get("/services", (req, res) => res.redirect(301, "/starter-kit"));
router.get("/portfolio", asyncHandler(siteController.portfolio));
router.get("/starter-kit", asyncHandler(siteController.starterKit));
router.get("/showcase", asyncHandler(siteController.showcase));
router.get("/showcase-mode", asyncHandler(siteController.showcaseMode));
router.get("/showcase-mode/:profileKey", asyncHandler(siteController.showcaseProfile));
router.get("/showcase/:slug", asyncHandler(siteController.showcaseDetail));
router.get("/testimonials", asyncHandler(siteController.testimonials));
router.get("/faqs", (req, res) => res.redirect(301, "/showcase-mode"));
router.get("/contact", asyncHandler(siteController.contact));
router.get("/success", asyncHandler(siteController.success));

// Contact submissions are intentionally not handled inside this proof asset.
router.post("/contact", (req, res) => {
  res.redirect(303, "https://asrweb.ie/contact");
});
module.exports = router;
