import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { useMount } from "react-use";
import { withTranslation, WithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GameService } from "../../src/services/game.service";

import { useService } from "../../src/di/injector";
import { GameSettings } from "../../src/types/common/game.types";
import { GameType } from "../../src/types/common/game.enums";
import useStorage from "../../src/hooks/useStorage";
import { ACCESS_TOKEN } from "../../src/types/constants";
import { CreateGamePayload } from "../../src/types/common/events.responces";

interface GameProps extends WithTranslation {
  settings: GameSettings;
}

function GameNewPage(props: GameProps) {
  const settings: GameSettings = {
    gameType: GameType.singlePlay,
    rows: 10,
    cols: 10,
    ships: {
      x1: 4,
      x2: 3,
      x3: 2,
      x4: 1,
    },
    speed: "medium",
  };
  const router = useRouter();
  const [gameService] = useService<GameService>(GameService);

  const [state, setState] = useState({
    type: GameType.singlePlay,
    speed: "medium",
  });
  const [showGameSpeed, setShowGameSpeed] = useState(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setItemToStorage(ACCESS_TOKEN, "");
    gameService.setAccessToken("");
    gameService.setGameId(null);
    settings.gameType = state.type;
    settings.speed = state.speed;
    gameService.createGame(settings, createGameCallback);
  };

  const { setItemToStorage } = useStorage();

  const createGameCallback = (response: CreateGamePayload) => {
    if (response.gameId) {
      setItemToStorage(ACCESS_TOKEN, response.accessToken);
      gameService.setAccessToken(response.accessToken);
      gameService.setGameId(response.gameId);

      router.push(`/game/${response.gameId}`);
    }
  };

  const handleChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;

    setShowGameSpeed(val === "singlePlay");

    const newState = { ...state, type: GameType[val] };
    setState(newState);
  };

  const handleChangeGameSpeed = (event: ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;
    const newState = { ...state, speed: val };

    setState(newState);
  };

  return (
    <div className="container">
      <h1>Create new game</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select id="type" className="form-select" onChange={handleChangeType}>
            <option value="singlePlay">Single player</option>
            <option value="multyPlay">Multiplayer</option>
          </select>
        </div>
        {showGameSpeed && (
          <div className="row mb-3">
            <label htmlFor="gameSpeed" className="form-label">
              Game speed
            </label>
            <select
              id="gameSpeed"
              className="form-select"
              onChange={handleChangeGameSpeed}
            >
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        )}
        <div className="row">
          <div className="col">
            <input
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              value="Create"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["menu", "game", "popups"])),
  },
});

export default withTranslation("game")(GameNewPage);
