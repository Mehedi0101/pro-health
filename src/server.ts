// internal imports
import app from "./app";
import { connectDB } from "./config/database";
import { config } from "./config";

const startServer = async () => {
  await connectDB(config.mongoUri);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
