import { Router } from "express";
import { register } from "../controllers";

const router = Router();

// user register
router.post("/register", register);

export default router;
