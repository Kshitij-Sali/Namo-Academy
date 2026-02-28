import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required."],
      trim: true
    },
    age: {
      type: Number,
      required: [true, "Student age is required."],
      min: 3,
      max: 100
    },
    classLevel: {
      type: String,
      required: [true, "Class level is required."],
      trim: true
    },
    batch: {
      type: String,
      required: [true, "Batch is required."],
      trim: true
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required."],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
      trim: true
    },
    joiningDate: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

studentSchema.index({ batch: 1 });
studentSchema.index({ name: "text", email: "text", contactNumber: "text" });

const Student = mongoose.model("Student", studentSchema);

export default Student;
