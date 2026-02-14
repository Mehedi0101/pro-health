// external imports
import { Router } from "express";

// internal importscle
import authRoutes from "./auth.route";
import userRoutes from "./users.route";
import serviceRoutes from "./services.route";
import branchRoutes from "./branches.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/branches", branchRoutes);

export default router;
