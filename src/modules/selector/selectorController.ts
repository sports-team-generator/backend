import { Request, Response } from "express";
import { Player } from "@modules/selector/selectorModel";
import { SelectorService } from "@modules/selector/selectorService";

interface ISelectorControllerCreateParams {
  playersPerTeam: number;
  offset: number;
}

export class SelectorController {
  private readonly service: SelectorService;
  private readonly players: Player[] = [
    { name: "Andre", technical: 5, physical: 7, tactical: 6 },
    { name: "Cacá", technical: 5, physical: 7, tactical: 7 },
    { name: "Estevão", technical: 4, physical: 7, tactical: 7 },
    { name: "Brunão", technical: 4, physical: 8, tactical: 7 },
    { name: "Marcio", technical: 4, physical: 4, tactical: 4 },
    { name: "Fidelis", technical: 3, physical: 4, tactical: 4 },
    { name: "Crispim", technical: 4, physical: 6, tactical: 8 },
    { name: "Jose", technical: 2, physical: 3, tactical: 5 },
    { name: "Paschoa", technical: 6, physical: 6, tactical: 6 },
    { name: "Gusttavo", technical: 9, physical: 8, tactical: 8 },
    { name: "Thyago", technical: 5, physical: 6, tactical: 5 },
    { name: "Marcello", technical: 7, physical: 7, tactical: 7 },
    { name: "Eduardo", technical: 7, physical: 7, tactical: 6 },
    { name: "Nego", technical: 5, physical: 6, tactical: 5 },
    { name: "João Vitor", technical: 9, physical: 8, tactical: 8 },
    { name: "Victor", technical: 7, physical: 8, tactical: 9 },
    { name: "Johnny", technical: 7, physical: 5, tactical: 5 },
  ];

  constructor(parameters: ISelectorControllerCreateParams) {
    const { offset, playersPerTeam } = parameters;

    this.service = SelectorService.create({
      players: this.players,
      playersPerTeam,
      offset,
    });
  }

  static create(parameters: ISelectorControllerCreateParams) {
    return new SelectorController(parameters);
  }

  generateTeams() {
    return this.service.generateTeams();
  }
}
