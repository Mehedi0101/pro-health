import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "ProHealth APIs" });
});

export default app;