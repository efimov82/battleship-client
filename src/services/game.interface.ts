import { GameType } from "../types/game.enums";

export interface IGameService {
  createGame(nickname: string, type: GameType, callback: Function): void;

  joinGame(gameId: string, nickname: string, callback: Function): void;
}
