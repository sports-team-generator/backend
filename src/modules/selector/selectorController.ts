import { Player } from "@modules/selector/selectorModel";
import { SelectorService } from "@modules/selector/selectorService";

interface ISelectorControllerCreateParams {
  playersPerTeam: number;
  offset: number;
}

export class SelectorController {
  private readonly service: SelectorService;
  private readonly players: Player[] = [
    {
      name: "Andre",
      technical: 5,
      physical: 7,
      tactical: 6,
      isRecurring: true,
    },
    {
      name: "João Vitor",
      technical: 9,
      physical: 8,
      tactical: 8,
      isRecurring: true,
    },
    {
      name: "Victor",
      technical: 7,
      physical: 8,
      tactical: 9,
      isRecurring: true,
    },
    {
      name: "Thyago",
      technical: 5,
      physical: 6,
      tactical: 5,
      isRecurring: true,
    },
    {
      name: "Paschoa",
      technical: 6,
      physical: 6,
      tactical: 6,
      isRecurring: true,
    },
    { name: "Cacá", technical: 5, physical: 7, tactical: 7, isRecurring: true },
    {
      name: "Marcello",
      technical: 7,
      physical: 7,
      tactical: 7,
      isRecurring: true,
    },
    {
      name: "Brunão",
      technical: 4,
      physical: 8,
      tactical: 7,
      isRecurring: true,
    },
    {
      name: "Johnny",
      technical: 7,
      physical: 5,
      tactical: 5,
      isRecurring: true,
    },
    {
      name: "Estevão",
      technical: 4,
      physical: 7,
      tactical: 7,
      isRecurring: true,
    },
    {
      name: "Marcio",
      technical: 4,
      physical: 4,
      tactical: 4,
      isRecurring: true,
    },
    {
      name: "Fidelis",
      technical: 3,
      physical: 4,
      tactical: 4,
      isRecurring: true,
    },
    { name: "Jose", technical: 2, physical: 3, tactical: 5, isRecurring: true },
    {
      name: "Crispim",
      technical: 4,
      physical: 6,
      tactical: 8,
      isRecurring: true,
    },
    {
      name: "Gusttavo",
      technical: 9,
      physical: 8,
      tactical: 8,
      isRecurring: true,
    },
    {
      name: "Gustavo",
      technical: 7,
      physical: 5,
      tactical: 5,
      isRecurring: false,
    },
    // {
    //   name: "Eduardo",
    //   technical: 7,
    //   physical: 7,
    //   tactical: 6,
    //   isRecurring: true,
    // },
    // { name: "Nego", technical: 5, physical: 6, tactical: 5, isRecurring: true },
  ];

  constructor(parameters: ISelectorControllerCreateParams) {
    const { offset, playersPerTeam } = parameters;

    this.service = SelectorService.create({
      players: this.players,
      playersPerTeam,
      offset,
    });
  }

  static create(
    parameters: ISelectorControllerCreateParams = {
      offset: 1,
      playersPerTeam: 7,
    }
  ) {
    return new SelectorController(parameters);
  }

  listPlayers() {
    return this.players.map((p) => p.name);
  }

  generateTeams() {
    return this.service.generateTeams();
  }
}
