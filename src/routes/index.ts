// external imports
import { Router } from "express";

// internal importscle
import authRoutes from "./auth.route";
import userRoutes from "./users.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
