import { Player } from "@modules/selector/selectorModel";
import {
  ICreatedTeams,
  SelectorRepository,
} from "@modules/selector/selectorRepository";
import { logger } from "@src/server";

interface ISelectorServiceCreateParams {
  players: Player[];
  playersPerTeam: number;
  offset: number;
}

export interface ISelectorService {
  generateTeams(
    players: Player[],
    playersPerTeam: number,
    ratingOffset: number
  ): ICreatedTeams;
}

export class SelectorService implements ISelectorService {
  private readonly repository: SelectorRepository;

  constructor(parameters: ISelectorServiceCreateParams) {
    const { players, playersPerTeam, offset } = parameters;

    const playersWithRating = players.map(
      SelectorRepository.getPlayerFinalRating
    );

    this.repository = SelectorRepository.create({
      players: playersWithRating,
      playersPerTeam,
      ratingOffset: offset,
    });
  }

  static create(parameters: ISelectorServiceCreateParams) {
    return new SelectorService(parameters);
  }

  public generateTeams(): ICreatedTeams {
    return this.repository.createBalancedTeams();
  }
}
