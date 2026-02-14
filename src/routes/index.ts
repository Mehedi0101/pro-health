// external imports
import { Router } from "express";

// internal importscle
import authRoutes from "./auth.route";
import userRoutes from "./users.route";
import serviceRoutes from "./services.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);

export default router;
