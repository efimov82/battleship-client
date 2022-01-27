import { Observable } from "rxjs";
import { GameEvents } from "../classes/GameEvent";
import { GameSettings } from "../types/common/game.types";

export interface IGameService {
  createGame(
    nickname: string,
    settings: GameSettings,
    callback: Function
  ): void;

  connect(): void;
  checkIn(gameId: string | string[], accessToken: string): void;

  createGame(
    nickname: string,
    settings: GameSettings,
    callback: Function
    //settings?: GameSettings
  ): void;

  joinGame(gameId: string, nickname: string, callback: Function): void;
  autoFill(gameId: string | string[], accessToken: string): void;

  // addEvent(event: GameEvents): void;

  // clearEvents(): void;

  getEvents(): Observable<GameEvents>;
}
