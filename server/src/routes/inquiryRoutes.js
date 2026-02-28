import express from "express";
import { body, param } from "express-validator";
import {
  createInquiry,
  deleteInquiry,
  getInquiries,
  resolveInquiry
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/public",
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("phone").trim().notEmpty().withMessage("Phone is required."),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters.")
  ],
  validateRequest,
  createInquiry
);

router.use(protect);

router.get("/", getInquiries);

router.patch(
  "/:id/resolve",
  [param("id").isMongoId().withMessage("Invalid inquiry ID.")],
  validateRequest,
  resolveInquiry
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid inquiry ID.")],
  validateRequest,
  deleteInquiry
);

export default router;
