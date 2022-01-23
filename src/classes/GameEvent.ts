export enum GameEventType {
  message = "message",
  connected = "connected",
  checkIn = "checkIn",
  playerConnected = "playerConnected",
}

export type GameEvent = {
  type: GameEventType;
  payload?: any;
};
