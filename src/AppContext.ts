import React from "react";
import { GameService } from "./services/game.service";

// const gameService = new GameService();

const AppContext = React.createContext({
  state: {
    soundMute: false,
    gameData: {},
  },
  setSoundMute: (boolean) => {},
  setGameData: (any) => {},
});

export default AppContext;
