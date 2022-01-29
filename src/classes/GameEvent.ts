import {
  CheckInPayload,
  GameUpdatePayload,
  RivalConnectedPayload,
} from "../types/common/events.responces";
import { GameEventType } from "../types/common/game.enums";

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

export class CheckInGameEvent extends GameEvent<CheckInPayload> {
  type = GameEventType.checkIn;
}

export class RivalConnectedEvent extends GameEvent<RivalConnectedPayload> {
  type = GameEventType.rivalConnected;
}

export class GameUpdateEvent extends GameEvent<GameUpdatePayload> {
  type = GameEventType.gameUpdate;
}

export class GameStartedEvent extends GameEvent<null> {
  type = GameEventType.gameStarted;
}

export class ShotUpdateEvent extends GameEvent<null> {
  type = GameEventType.shotUpdate;
}

export type GameEvents =
  | ConnectedGameEvent
  | GameErrorEvent
  | CheckInGameEvent
  | RivalConnectedEvent
  | GameUpdateEvent
  | GameStartedEvent
  | ShotUpdateEvent;
