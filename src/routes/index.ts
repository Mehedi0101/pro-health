// external imports
import { Router } from "express";

// internal importscle
import authRoutes from "./auth.route";

const router = Router();

router.use("/auth", authRoutes);

export default router;
