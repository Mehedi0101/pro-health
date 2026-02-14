// src/routes/services.route.ts
import { Router } from "express";
import { getServices } from "../controllers";
import { requireAuth } from "../middlewares";

const router = Router();

// GET all services
router.get("/", requireAuth, getServices);

export default router;
