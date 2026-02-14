import mongoose from "mongoose";
import dotenv from "dotenv";
import { Service } from "../schemas";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pro-health";

const services = [
  { service_name: "General Checkup", duration: 30, cost: 50 },
  { service_name: "Blood Test", duration: 15, cost: 20 },
  { service_name: "X-Ray", duration: 20, cost: 40 },
  { service_name: "MRI Scan", duration: 60, cost: 200 },
  { service_name: "Vaccination", duration: 10, cost: 30 },
  { service_name: "Dental Cleaning", duration: 45, cost: 80 },
  { service_name: "Physiotherapy", duration: 50, cost: 60 },
  { service_name: "Eye Checkup", duration: 30, cost: 40 },
  { service_name: "Ultrasound", duration: 25, cost: 100 },
  { service_name: "Nutrition Consultation", duration: 40, cost: 70 },
];

const seedServices = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    // Delete old data if needed
    await Service.deleteMany({});
    console.log("Old services deleted");

    // Insert new fake services
    await Service.insertMany(services);
    console.log("Services seeded successfully!");

    process.exit(0); // exit script
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedServices();
