import express, { Router, Request } from "express";
import { SelectorController } from "@modules/selector/selectorController";

const router: Router = express.Router();

router.get(
  "/",
  (
    req: Request<{}, {}, {}, { offset: string; playersPerTeam: string }>,
    res
  ) => {
    try {
      const {
        query: { offset, playersPerTeam },
      } = req;

      const controllerParameters = {
        offset: offset && !Number.isNaN(offset) ? parseInt(offset) : 0,
        playersPerTeam:
          playersPerTeam && !Number.isNaN(playersPerTeam)
            ? parseInt(playersPerTeam)
            : 7,
      };

      const controller = SelectorController.create(controllerParameters);
      const teams = controller.generateTeams();

      return res.json(teams);
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  }
);

export const selectorRouter: Router = router;
