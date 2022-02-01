import { Observable } from "rxjs";
import { GameEvents } from "../classes/GameEvent";
import { GameSettings } from "../types/common/game.types";

export interface IGameService {
  createGame(settings: GameSettings, callback: Function): void;
  connect(): void;
  checkIn(gameId: string | string[], accessToken: string): void;
  joinGame(gameId: string, nickname: string, callback: Function): void;
  autoFill(gameId: string | string[], accessToken: string): void;
  getEvents(): Observable<GameEvents>;
}
