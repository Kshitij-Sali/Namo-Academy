import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = (process.env.ADMIN_EMAIL || "namo.academy1027@gmail.com").toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || "Parita@2706";
    const name = process.env.ADMIN_NAME || "Super Admin";

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin already exists for email: ${email}`);
      process.exit(0);
    }

    await Admin.create({
      name,
      email,
      password
    });

    console.log(`Admin created: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
