import { Router } from "express";
import { requireAuth } from "../middlewares";
import { getMe, updateMe } from "../controllers";

const router = Router();

// GET me
router.get("/me", requireAuth, getMe);

// PATCH (update me)
router.patch("/me", requireAuth, updateMe);

export default router;
