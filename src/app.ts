// external imports
import express, { Request, Response } from "express";

// internal imports
import { errorHandler } from "./middlewares/errorHandler.middleware";
import router from "./routes";

const app = express();

app.use(express.json());

// health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "ProHealth APIs" });
});

// all routes
app.use("/api/v1/", router);

// default error handler
app.use(errorHandler);

export default app;
