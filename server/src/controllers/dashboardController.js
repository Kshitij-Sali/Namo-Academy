import Attendance from "../models/Attendance.js";
import Inquiry from "../models/Inquiry.js";
import Student from "../models/Student.js";
import Testimonial from "../models/Testimonial.js";

const getDashboardOverview = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeBatchList = await Student.distinct("batch");
    const activeBatches = activeBatchList.length;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendanceToday = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const presentCount = attendanceToday.find((item) => item._id === "Present")?.count || 0;
    const absentCount = attendanceToday.find((item) => item._id === "Absent")?.count || 0;

    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);
    const pendingTestimonials = await Testimonial.countDocuments({ approved: false });

    res.status(200).json({
      totalStudents,
      activeBatches,
      attendanceSummary: {
        present: presentCount,
        absent: absentCount,
        total: presentCount + absentCount
      },
      recentInquiries,
      pendingTestimonials
    });
  } catch (error) {
    next(error);
  }
};

export { getDashboardOverview };
