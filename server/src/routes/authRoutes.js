import express from "express";
import { body } from "express-validator";
import { changePassword, getCurrentAdmin, loginAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required.")
  ],
  validateRequest,
  loginAdmin
);

router.get("/me", protect, getCurrentAdmin);

router.patch(
  "/password",
  protect,
  [
    body("currentPassword").notEmpty().withMessage("Current password is required."),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters.")
  ],
  validateRequest,
  changePassword
);

export default router;
