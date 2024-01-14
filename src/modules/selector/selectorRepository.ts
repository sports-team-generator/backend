import { Player } from "@modules/selector/selectorModel";
import { shuffleArrayWithOffset } from "@common/utils";

interface IPlayerWithRating extends Player {
  rating: number;
}

interface ISelectorRepositoryCreateParams {
  players: IPlayerWithRating[];
  playersPerTeam: number;
  ratingOffset: number;
}

export interface ICreatedTeams {
  teams: IPlayerWithRating[][];
  remainingPlayers: IPlayerWithRating[];
  parameters: ISelectorRepositoryCreateParams;
  totalPlayers: number;
}

export interface ISelectorRepository {
  createBalancedTeams(): ICreatedTeams;
}

export class SelectorRepository implements ISelectorRepository {
  private readonly _players: IPlayerWithRating[];
  private readonly _ratingOffset: number;
  private readonly _playersPerTeam: number;

  constructor(parameters: ISelectorRepositoryCreateParams) {
    this._players = parameters.players;
    this._playersPerTeam = parameters.playersPerTeam;
    this._ratingOffset = parameters.ratingOffset;
  }

  static create(parameters: ISelectorRepositoryCreateParams) {
    return new SelectorRepository(parameters);
  }

  static getPlayerFinalRating(player: Player): IPlayerWithRating {
    return {
      ...player,
      rating:
        (player.technical * 2 + player.physical * 3 + player.tactical) / 3,
    };
  }

  createBalancedTeams() {
    // Shuffle all players
    const shuffledPlayers = shuffleArrayWithOffset<IPlayerWithRating>(
      this._players,
      this._ratingOffset
    );

    // Initialize an array to store teams
    const teams: IPlayerWithRating[][] = Array.from(
      { length: Math.ceil(shuffledPlayers.length / this._playersPerTeam) },
      () => []
    );

    // Distribute players evenly among teams
    let currentIndex = 0;

    for (let i = 0; i < this._playersPerTeam; i++) {
      teams.forEach((team) => {
        if (currentIndex < shuffledPlayers.length) {
          team.push(shuffledPlayers[currentIndex]);
          currentIndex++;
        }
      });
    }

    // Any remaining players are those who were not assigned to any team
    const remainingPlayers = shuffledPlayers.slice(currentIndex);
    const selectorParameters: ISelectorRepositoryCreateParams = {
      players: this._players,
      playersPerTeam: this._playersPerTeam,
      ratingOffset: this._ratingOffset,
    };

    return {
      teams,
      remainingPlayers,
      parameters: selectorParameters,
      totalPlayers: this._players.length,
    };
  }
}
