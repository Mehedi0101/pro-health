import mongoose from "mongoose";
import dotenv from "dotenv";
import { Branch } from "../schemas";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pro-health";

const branches = [
  {
    branch_name: "Main City Branch",
    location: "Downtown",
  },
  {
    branch_name: "North Side Clinic",
    location: "North Avenue",
  },
  {
    branch_name: "East Medical Center",
    location: "East Street",
  },
  {
    branch_name: "West Health Hub",
    location: "West Market Road",
  },
  {
    branch_name: "Suburban Care Unit",
    location: "Green Valley",
  },
];

const seedBranches = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected for branch seeding...");

    await Branch.deleteMany({});
    console.log("Old branches deleted");

    await Branch.insertMany(branches);
    console.log("Branches seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Branch seeding error:", error);
    process.exit(1);
  }
};

seedBranches();
