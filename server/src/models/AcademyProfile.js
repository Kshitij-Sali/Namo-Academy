import mongoose from "mongoose";

const academyProfileSchema = new mongoose.Schema(
  {
    academyName: {
      type: String,
      default: "Namo Academy",
      trim: true
    },
    heroTitle: {
      type: String,
      default: "Master English with Confidence at Namo Academy"
    },
    tagline: {
      type: String,
      default: "Transforming learners into confident communicators."
    },
    vision: {
      type: String,
      default:
        "To build fluent, confident speakers who can thrive academically and professionally."
    },
    methodology: {
      type: String,
      default:
        "Interactive, level-based instruction with practical conversation drills, writing practice, and weekly assessments."
    },
    phone: {
      type: String,
      default: "+91 7058932710"
    },
    email: {
      type: String,
      default: "namo.academy1027@gmail.com"
    },
    address: {
      type: String,
      default: "Plot No. 15(B), Dwarka Nagar, Behind Hanuman Petrolpump, Nandurbar-425 412."
    },
    yearsExperience: {
      type: Number,
      default: 8
    },
    studentsTaught: {
      type: Number,
      default: 1200
    },
    successRate: {
      type: Number,
      default: 95
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

const AcademyProfile = mongoose.model("AcademyProfile", academyProfileSchema);

export default AcademyProfile;
