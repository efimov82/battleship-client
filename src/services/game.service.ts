// import { inject, injectable } from "inversify";
// import "reflect-metadata";
import SocketIOClient, { io } from "socket.io-client";
import { Observable, Subject } from "rxjs";

import { GameType } from "../types/game.enums";
import { IGameService } from "./game.interface";
import { GameEvent, GameEventType } from "../classes/GameEvent";
import { ACCESS_TOKEN, GAME_ID } from "../types/constants";
//import { GameData, GameSettings } from "../types/game.types";

export const WS_GAME_HOST = "ws://test";
export class GameService implements IGameService {
  private isBrowser = typeof window !== "undefined";
  private socket: any; //Socket;
  private isConnected = false;
  private subject = new Subject<GameEvent>();
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

  public addEvent(event: GameEvent): void {
    return this.subject.next(event);
  }

  public clearEvents(): void {
    this.subject.next(null);
  }

  public getEvents(): Observable<GameEvent> {
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

        // auto register in game
        if (this.accessToken && this.gameId) {
          this.register(this.gameId, this.accessToken);
        }

        this.addEvent({
          type: GameEventType.connected,
        });
      });

      this.socket.on("player2Joined", (data: string) => {
        this.addEvent({
          type: GameEventType.playerConnected,
          payload: JSON.parse(data),
        });
      });
    }
  }

  /**
   * Register currect connected socketId in gameId by accessTocken
   * @param gameId
   * @param accessToken
   */
  public register(gameId: string | string[], accessToken: string): void {
    console.log("register", gameId, accessToken);

    this.socket.emit("register", { gameId, accessToken }, (result) => {
      this.addEvent({
        type: GameEventType.checkIn,
        payload: result,
      });
    });
  }

  public createGame(
    nickname: string,
    type: GameType,
    callback: Function
    //settings?: GameSettings
  ): void {
    this.socket.emit(
      "createGame",
      {
        nickname,
        type,
      },
      callback
    );
  }

  public joinGame(gameId: string, nickname: string, callback: Function): void {
    console.log("joinGame", gameId, nickname);

    this.socket.emit(
      "joinGame",
      {
        gameId,
        nickname,
      },
      callback
    );
  }
}
