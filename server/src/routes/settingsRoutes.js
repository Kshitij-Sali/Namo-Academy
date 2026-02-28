import express from "express";
import { body } from "express-validator";
import {
  getProfile,
  updateAdminPassword,
  updateProfile
} from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/public-profile", getProfile);

router.use(protect);

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.patch(
  "/password",
  [
    body("currentPassword").notEmpty().withMessage("Current password is required."),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters.")
  ],
  validateRequest,
  updateAdminPassword
);

export default router;
