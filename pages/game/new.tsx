import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useMount } from "react-use";
import { withTranslation, WithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GameService } from "../../src/services/game.service";
import { FieldComponent } from "../../src/components/FieldComponent/FieldComponent";

import { useService } from "../../src/di/injector";
import { GameSettings } from "../../src/types/game.types";
import { GameType } from "../../src/types/game.enums";
import useStorage from "../../src/hooks/useStorage";
import { ACCESS_TOKEN } from "../../src/types/constants";

interface GameProps extends WithTranslation {
  settings: GameSettings;
}
type GameState = {};

function GameNewPage(props: GameProps) {
  const settings: GameSettings = {
    type: GameType.singlePlay,
    rows: 10,
    cols: 10,
    ships: {
      x1: 4,
      x2: 3,
      x3: 2,
      x4: 1,
    },
  };
  const router = useRouter();
  const [gameService] = useService<GameService>(GameService);

  const [state, setState] = useState({
    name: "",
    type: GameType.singlePlay,
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!state.name) {
      return;
    }

    gameService.createGame(state.name, state.type, createGameCallback);
  };

  const { setItemToStorage } = useStorage();

  // TODO types
  const createGameCallback = (response: any) => {
    // const data = JSON.parse(response);
    console.log("callback createGame", response);
    if (response.gameId) {
      setItemToStorage(ACCESS_TOKEN, response.accessToken);
      gameService.setAccessToken(response.accessToken);
      gameService.setGameId(response.gameId);

      router.push(`/game/${response.gameId}`);
    }
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newState = { ...state, name: event.target.value };
    setState(newState);
  };

  const handleChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
    const newState = { ...state, type: GameType[event.target.value] };
    setState(newState);
  };

  return (
    <div className="container">
      <h1>Create new game</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={state.name}
            onChange={handleChangeName}
            placeholder="Name"
          />
        </div>
        <div className="row mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select id="type" className="form-select" onChange={handleChangeType}>
            <option value="singlePlay">Single play</option>
            <option value="multyPlay">Multy play</option>
          </select>
        </div>

        {/* <div className="row">
          <FieldComponent rows={10} cols={10} onCellClick={handleFieldClick} />
        </div> */}

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
