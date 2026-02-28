import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";

const getStudents = async (req, res, next) => {
  try {
    const { search, batch, classLevel } = req.query;
    const filter = {};

    if (batch) {
      filter.batch = batch;
    }

    if (classLevel) {
      filter.classLevel = classLevel;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { contactNumber: searchRegex }
      ];
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ count: students.length, students });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ message: "Student created successfully.", student });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student updated successfully.", student });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    await Attendance.deleteMany({ student: req.params.id });

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
