import { Router } from "express";
import { requireAuth } from "../middlewares";
import { getMe, updateMe } from "../controllers";

const router = Router();

// get me
router.get("/me", requireAuth, getMe);

// update me
router.patch("/me", requireAuth, updateMe);

export default router;
