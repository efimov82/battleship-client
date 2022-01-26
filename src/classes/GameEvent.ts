import {
  CheckInPayload,
  FieldsUpdatePayload,
  RivalConnectedPayload,
} from "../types/common/events.responces";
import { GameEventType } from "../types/common/game.enums";
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

export class CheckInGameEvent extends GameEvent<CheckInPayload> {
  type = GameEventType.checkIn;
}

export class RivalConnectedEvent extends GameEvent<RivalConnectedPayload> {
  type = GameEventType.rivalConnected;
}
export class FieldsUpdateEvent extends GameEvent<FieldsUpdatePayload> {
  type = GameEventType.fieldsUpdate;
}

export type GameEvents =
  | ConnectedGameEvent
  | GameErrorEvent
  | CheckInGameEvent
  | RivalConnectedEvent
  | FieldsUpdateEvent;
