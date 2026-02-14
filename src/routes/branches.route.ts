import { Router } from "express";
import { getBranches } from "../controllers";
import { requireAuth } from "../middlewares";

const router = Router();

// GET all branches
router.get("/", requireAuth, getBranches);

export default router;
