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
        offset: offset && !Number.isNaN(offset) ? parseInt(offset) : 1,
        playersPerTeam:
          playersPerTeam && !Number.isNaN(playersPerTeam)
            ? parseInt(playersPerTeam)
            : 7,
      };

      const controller = SelectorController.create(controllerParameters);
      const { parameters, remainingPlayers, teams, totalPlayers } =
        controller.generateTeams();

      let result =
        "<style>body{padding:2rem 0;display:flex;flex-direction:column;}table{margin:1rem 2rem;font-family:arial,sans-serif;border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;text-align:left;padding:8px}tr:nth-child(2n){background-color:#ddd}</style>";
      for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        result += `<table class="teams"><tr><th>Time ${i + 1}</th></tr><tbody>`;
        for (let player of team) {
          result += `<tr><td>${player.name}</td></tr>`;
        }
        result += "</tbody></table><br/>";
      }

      // return res.json(teams.map((t) => t.map((p) => p.name)));
      return res.send(
        `${result}<br/><div><p>Parâmetros: ${JSON.stringify({
          "Jogadores por time": parameters.playersPerTeam,
          Tolerância: parameters.ratingOffset,
        })}</p><br/><p>Total de jogadores: ${totalPlayers}</p></div>`
      );
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  }
);

router.get("/list", (req, res) => {
  const controller = SelectorController.create();
  return res.json(controller.listPlayers());
});

export const selectorRouter: Router = router;
