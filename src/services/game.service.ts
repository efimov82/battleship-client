// import { inject, injectable } from "inversify";
// import "reflect-metadata";
import SocketIOClient, { io } from "socket.io-client";
import { GameType } from "../types/game.enums";
import { GameData, GameSettings } from "../types/game.types";

import { IGameService } from "./game.interface";

// export interface IProvider<T> {
//   provide(): T;
// }

export const WS_GAME_HOST = "ws://test"; // process.env.WS_GAME_HOST

// @injectable()
export class GameService implements IGameService {
  private isBrowser = typeof window !== "undefined";
  private socket: any; //Socket;
  private isConnected = false;

  constructor(private wsHost: string = WS_GAME_HOST) {
    console.log("Game service created: ", this.wsHost);
  }

  public connect(): void {
    if (this.isBrowser) {
      console.log("connect...");
      this.socket = io(this.wsHost, {
        transports: ["websocket"],
      }); // ws://localhost:9090
      // wss://game-miner-core.herokuapp.com

      this.socket.on("connect", () => {
        this.isConnected = true;
        console.log("ws connected");
      });

      this.socket.on("player2Joined", (data: string) => {
        console.log("player2Joined", data);
        console.log("data", JSON.parse(data));
      });
    }
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

  private reConnect(): void {}
}
