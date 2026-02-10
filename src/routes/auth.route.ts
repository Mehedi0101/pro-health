import { Request, Response, Router } from "express";

const router = Router();

router.get("/register", (req: Request, res: Response) => {
  console.log("route hitt!!");
  res.json({ message: "auth routes" });
});

export default router;
