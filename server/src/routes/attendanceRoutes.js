import express from "express";
import { body, param, query } from "express-validator";
import {
  getAttendance,
  getStudentAttendanceSummary,
  markAttendance
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.use(protect);

router.post(
  "/mark",
  [
    body("date").optional().isISO8601().withMessage("Invalid attendance date."),
    body("batch").trim().notEmpty().withMessage("Batch is required."),
    body("records").isArray({ min: 1 }).withMessage("At least one record is required."),
    body("records.*.studentId").isMongoId().withMessage("Invalid student ID in records."),
    body("records.*.status")
      .isIn(["Present", "Absent"])
      .withMessage("Status must be Present or Absent.")
  ],
  validateRequest,
  markAttendance
);

router.get(
  "/",
  [
    query("studentId").optional().isMongoId().withMessage("Invalid student ID filter."),
    query("month").optional().isInt({ min: 1, max: 12 }).withMessage("Month must be 1-12."),
    query("year").optional().isInt({ min: 2000, max: 2100 }).withMessage("Year is invalid."),
    query("dateFrom").optional().isISO8601().withMessage("dateFrom is invalid."),
    query("dateTo").optional().isISO8601().withMessage("dateTo is invalid.")
  ],
  validateRequest,
  getAttendance
);

router.get(
  "/student/:studentId/summary",
  [
    param("studentId").isMongoId().withMessage("Invalid student ID."),
    query("month").optional().isInt({ min: 1, max: 12 }).withMessage("Month must be 1-12."),
    query("year").optional().isInt({ min: 2000, max: 2100 }).withMessage("Year is invalid.")
  ],
  validateRequest,
  getStudentAttendanceSummary
);

export default router;
