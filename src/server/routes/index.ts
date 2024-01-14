import express, { Router } from "express";
import { SelectorController } from "@modules/selector/selectorController";

const router: Router = express.Router();

router.get("/", (req, res) => res.json({ success: true }));

router.get("/generate", (req, res) => {
  try {
    const {
      query: { offset, playersPerTeam },
    } = req;
    const controller = SelectorController.create({
      offset,
      playersPerTeam,
    } as any);
    const teams = controller.generateTeams();
    return res.json(teams);
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});

export const appRouter: Router = router;
