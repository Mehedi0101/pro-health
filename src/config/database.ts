import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB runtime error:", err);
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
