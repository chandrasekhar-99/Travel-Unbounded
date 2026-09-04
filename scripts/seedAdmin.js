import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import AdminUser from "../src/models/AdminUser.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "TravelAdmin@123";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");

    const existingAdmin = await AdminUser.findOne({
      email: ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await AdminUser.create({
      email: ADMIN_EMAIL,
      passwordHash,
      role: "admin",
    });

    console.log("Admin user created successfully.");
    console.log(`Email: ${ADMIN_EMAIL}`);
  } catch (error) {
    console.error("Failed to seed admin:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();