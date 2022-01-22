import { Cell } from "../classes/Cell";
import { GameStatus, GameType } from "./game.enums";

export type GameSettings = {
  type: GameType;
  rows: number;
  cols: number;
  ships: {
    x1: number;
    x2: number;
    x3: number;
    x4: number;
  };
};

export type GameState = {
  gameId: string;
  field: { data: Cell[][] } | null;
  gameStatus: GameStatus;
  gameTimeSeconds: number;
  showModalNewGame: boolean;
};

export interface GameData {
  id: string;
  player1: Player;
  player2: Player;
}

export interface Player {
  name?: string;
}
