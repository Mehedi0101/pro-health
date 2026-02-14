import { Router } from "express";
import { requireAuth } from "../middlewares";
import { getMe } from "../controllers";

const router = Router();

// get my info
router.get("/me", requireAuth, getMe);

export default router;
