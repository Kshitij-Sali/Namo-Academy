import Attendance from "../models/Attendance.js";
import mongoose from "mongoose";

const normalizeDate = (inputDate) => {
  const date = inputDate ? new Date(inputDate) : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const markAttendance = async (req, res, next) => {
  try {
    const { date, batch, records } = req.body;

    if (!records || !Array.isArray(records) || !records.length) {
      return res.status(400).json({ message: "Attendance records are required." });
    }

    const normalizedDate = normalizeDate(date);

    const operations = records.map((record) => ({
      updateOne: {
        filter: {
          student: record.studentId,
          date: normalizedDate
        },
        update: {
          $set: {
            status: record.status,
            batch,
            markedBy: req.admin._id
          }
        },
        upsert: true
      }
    }));

    await Attendance.bulkWrite(operations);

    res.status(200).json({ message: "Attendance saved successfully." });
  } catch (error) {
    next(error);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { studentId, batch, dateFrom, dateTo, month, year } = req.query;
    const filter = {};

    if (studentId) {
      filter.student = studentId;
    }

    if (batch) {
      filter.batch = batch;
    }

    if (month && year) {
      const start = new Date(Number(year), Number(month) - 1, 1);
      const end = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    if (dateFrom || dateTo) {
      filter.date = filter.date || {};
      if (dateFrom) {
        filter.date.$gte = normalizeDate(dateFrom);
      }
      if (dateTo) {
        const end = normalizeDate(dateTo);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    const attendance = await Attendance.find(filter)
      .populate("student", "name classLevel batch")
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({ count: attendance.length, attendance });
  } catch (error) {
    next(error);
  }
};

const getStudentAttendanceSummary = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const now = new Date();
    const month = Number(req.query.month || now.getMonth() + 1);
    const year = Number(req.query.year || now.getFullYear());

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const summary = await Attendance.aggregate([
      {
        $match: {
          student: new mongoose.Types.ObjectId(studentId),
          date: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const present = summary.find((item) => item._id === "Present")?.count || 0;
    const absent = summary.find((item) => item._id === "Absent")?.count || 0;
    const total = present + absent;

    res.status(200).json({
      month,
      year,
      summary: {
        present,
        absent,
        total,
        percentage: total ? Number(((present / total) * 100).toFixed(2)) : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export { markAttendance, getAttendance, getStudentAttendanceSummary };
