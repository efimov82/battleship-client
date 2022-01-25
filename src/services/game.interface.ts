import { Observable } from "rxjs";
import { GameEvents } from "../classes/GameEvent";
import { GameSettings } from "../types/game.types";

export interface IGameService {
  createGame(
    nickname: string,
    settings: GameSettings,
    callback: Function
  ): void;

  joinGame(gameId: string, nickname: string, callback: Function): void;

  addEvent(event: GameEvents): void;

  clearEvents(): void;

  getEvents(): Observable<GameEvents>;
}
