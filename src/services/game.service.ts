// import { inject, injectable } from "inversify";
// import "reflect-metadata";
import SocketIOClient, { io } from "socket.io-client";
import { Observable, ReplaySubject } from "rxjs";

import { IGameService } from "./game.interface";
import {
  CheckInGameEvent,
  ConnectedGameEvent,
  GameErrorEvent,
  GameEvents,
  RivalConnectedEvent,
  GameUpdateEvent,
  GameStartedEvent,
  ShotUpdateEvent,
} from "../classes/GameEvent";
import { GameEventType } from "../types/common/game.enums";
import { GameSettings } from "../types/common/game.types";
import {
  AddShipPayload,
  CheckInPayload,
  GameUpdatePayload,
  RivalConnectedPayload,
  ShotUpdatePayload,
} from "../types/common/events.responces";
import { Cell } from "../classes/Cell";

export const WS_GAME_HOST = "ws://test";
export class GameService implements IGameService {
  private isBrowser = typeof window !== "undefined";
  private socket: any; //Socket;
  private isConnected = false;
  private subject = new ReplaySubject<GameEvents>(10);
  private accessToken: string;
  private gameId: string;
  private animatedCell: Cell = null;
  #gameData: GameUpdatePayload;

  constructor(private wsHost: string = WS_GAME_HOST) {
    console.log("Game service created: ", this.wsHost);
  }

  public setGameId(gameId: string) {
    this.gameId = gameId;
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getEvents(): Observable<GameEvents> {
    return this.subject.asObservable();
  }

  public setAnimatedCell(cell: Cell) {
    this.animatedCell = cell;
  }

  public getAnimatedCell(): Cell {
    return this.animatedCell;
  }

  public connect(): void {
    if (this.isBrowser) {
      console.log("connect...");
      this.socket = io(this.wsHost, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        this.isConnected = true;
        console.log("ws connected");

        this.addEvent(new ConnectedGameEvent());
      });

      this.socket.on(
        GameEventType.rivalConnected,
        (data: RivalConnectedPayload) => {
          this.addEvent(new RivalConnectedEvent(data));
        }
      );

      this.socket.on(GameEventType.gameStarted, () => {
        this.addEvent(new GameStartedEvent());
      });

      this.socket.on(GameEventType.gameUpdate, (data: GameUpdatePayload) => {
        this.#gameData = data;
        this.addEvent(new GameUpdateEvent(data));
      });

      this.socket.on(GameEventType.shotUpdate, (data: ShotUpdatePayload) => {
        this.addEvent(new ShotUpdateEvent(data));
      });
    }
  }

  /**
   * Register connected socketId in gameId by accessTocken
   * @param gameId
   * @param accessToken
   */
  public checkIn(gameId: string | string[]): void {
    console.log("checkIn", gameId);

    this.socket.emit(
      GameEventType.checkIn,
      { gameId, accessToken: this.accessToken },
      (result: CheckInPayload) => {
        if (result.error) {
          this.addEvent(new GameErrorEvent(result.error));
        } else {
          this.gameId = gameId as string;
          this.accessToken = this.accessToken;
          this.addEvent(new CheckInGameEvent(result));
        }
      }
    );
  }

  public createGame(settings: GameSettings, callback: Function): void {
    this.socket.emit(
      GameEventType.createGame,
      {
        gameType: settings.gameType,
        speed: settings.speed,
      },
      callback
    );
  }

  public joinGame(gameId: string, nickname: string, callback: Function): void {
    console.log("joinGame", gameId, nickname);

    this.socket.emit(
      GameEventType.joinGame,
      {
        gameId,
        nickname,
      },
      callback
    );
  }

  public autoFill(): void {
    this.socket.emit(
      GameEventType.autoFill,
      { gameId: this.gameId, accessToken: this.accessToken },
      (result: CheckInPayload) => {
        if (result.error) {
          this.addEvent(new GameErrorEvent(result.error));
        }
      }
    );
  }

  public startGame(): boolean {
    const shipsCount = this.#gameData.player.shipsCount;
    if (
      shipsCount.x1 === 0 &&
      shipsCount.x2 === 0 &&
      shipsCount.x3 === 0 &&
      shipsCount.x4 === 0
    ) {
      this.socket.emit(GameEventType.playerReady, {
        gameId: this.gameId,
        accessToken: this.accessToken,
      });
      return true;
    }

    return false;
  }

  public addShip(
    payload: AddShipPayload,
    callback: (result: boolean) => void
  ): void {
    this.socket.emit(
      GameEventType.addShip,
      {
        gameId: this.gameId,
        accessToken: this.accessToken,
        payload,
      },
      callback
    );
  }

  public deleteShip(
    row: number,
    col: number,
    callback: (result: boolean) => void
  ): void {
    this.socket.emit(
      GameEventType.deleteShip,
      {
        gameId: this.gameId,
        accessToken: this.accessToken,
        row,
        col,
      },
      callback
    );
  }

  public takeShot(row: number, col: number): void {
    this.socket.emit(GameEventType.takeShot, {
      gameId: this.gameId,
      accessToken: this.accessToken,
      row,
      col,
    });
  }

  private addEvent(event: GameEvents): void {
    return this.subject.next(event);
  }
}
