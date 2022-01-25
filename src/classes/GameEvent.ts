import { GameEventType } from "../types/game.enums";
import { Cell } from "./Cell";

abstract class GameEvent<T> {
  private payload: T;
  abstract type: GameEventType;

  constructor(payload?: T) {
    this.payload = payload;
  }

  public getType(): GameEventType {
    return this.type;
  }

  public getPayload(): T {
    return this.payload;
  }
}

export class ConnectedGameEvent extends GameEvent<null> {
  type = GameEventType.connected;
}
export class GameErrorEvent extends GameEvent<string> {
  type = GameEventType.error;
}

export type CheckInPayload = {
  player: string;
  field: Cell[][];
  error?: string;
};

export class CheckInGameEvent extends GameEvent<CheckInPayload> {
  type = GameEventType.checkIn;
}

export class PlayerConnectedEvent extends GameEvent<any> {
  type = GameEventType.playerConnected;
}

export type GameEvents =
  | ConnectedGameEvent
  | GameErrorEvent
  | CheckInGameEvent
  | PlayerConnectedEvent;
