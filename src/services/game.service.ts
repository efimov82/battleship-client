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
  FieldsUpdateEvent,
} from "../classes/GameEvent";
import { GameEventType } from "../types/common/game.enums";
import { GameSettings } from "../types/common/game.types";
import {
  CheckInPayload,
  FieldsUpdatePayload,
  RivalConnectedPayload,
} from "../types/common/events.responces";

export const WS_GAME_HOST = "ws://test";
export class GameService implements IGameService {
  private isBrowser = typeof window !== "undefined";
  private socket: any; //Socket;
  private isConnected = false;
  private subject = new ReplaySubject<GameEvents>(10);
  private accessToken: string;
  private gameId: string;

  constructor(private wsHost: string = WS_GAME_HOST) {
    console.log("Game service created: ", this.wsHost);
  }

  public setGameId(gameId: string) {
    this.gameId = gameId;
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
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

  public getEvents(): Observable<GameEvents> {
    return this.subject.asObservable();
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

      this.socket.on(
        GameEventType.fieldsUpdate,
        (data: FieldsUpdatePayload) => {
          this.addEvent(new FieldsUpdateEvent(data));
        }
      );
    }
  }

  /**
   * Register connected socketId in gameId by accessTocken
   * @param gameId
   * @param accessToken
   */
  public checkIn(gameId: string | string[], accessToken: string): void {
    //console.log("checkIn", gameId, accessToken);

    this.socket.emit(
      GameEventType.checkIn,
      { gameId, accessToken },
      (result: CheckInPayload) => {
        if (result.error) {
          this.addEvent(new GameErrorEvent(result.error));
        } else {
          this.gameId = gameId as string;
          this.accessToken = accessToken;
          this.addEvent(new CheckInGameEvent(result));
        }
      }
    );
  }

  public createGame(
    nickname: string,
    settings: GameSettings,
    callback: Function
    //settings?: GameSettings
  ): void {
    this.socket.emit(
      GameEventType.createGame,
      {
        nickname,
        gameType: settings.gameType,
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

  private addEvent(event: GameEvents): void {
    return this.subject.next(event);
  }
}
