import express from "express";
import { body, param } from "express-validator";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

const studentValidation = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("age").isInt({ min: 3, max: 100 }).withMessage("Age must be between 3 and 100."),
  body("classLevel").trim().notEmpty().withMessage("Class level is required."),
  body("batch").trim().notEmpty().withMessage("Batch is required."),
  body("contactNumber").trim().notEmpty().withMessage("Contact number is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("joiningDate").optional().isISO8601().withMessage("Joining date must be valid.")
];

router.use(protect);

router.get("/", getStudents);

router.post("/", studentValidation, validateRequest, createStudent);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid student ID.")],
  validateRequest,
  getStudentById
);

router.put(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid student ID."), ...studentValidation],
  validateRequest,
  updateStudent
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid student ID.")],
  validateRequest,
  deleteStudent
);

export default router;
