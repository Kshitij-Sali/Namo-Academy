import express from "express";
import { body, param, query } from "express-validator";
import {
  approveTestimonial,
  createPublicTestimonial,
  deleteTestimonial,
  getAdminTestimonials,
  getPublicTestimonials
} from "../controllers/testimonialController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/public", getPublicTestimonials);

router.post(
  "/public",
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters.")
  ],
  validateRequest,
  createPublicTestimonial
);

router.use(protect);

router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn(["pending", "approved"])
      .withMessage("Status must be pending or approved.")
  ],
  validateRequest,
  getAdminTestimonials
);

router.patch(
  "/:id/approve",
  [param("id").isMongoId().withMessage("Invalid testimonial ID.")],
  validateRequest,
  approveTestimonial
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid testimonial ID.")],
  validateRequest,
  deleteTestimonial
);

export default router;
