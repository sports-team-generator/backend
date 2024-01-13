import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => res.json({ success: true }));

export const appRouter: Router = router;
