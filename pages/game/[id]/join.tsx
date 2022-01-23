import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useService } from "../../../src/di/injector";
import useStorage from "../../../src/hooks/useStorage";
import { GameService } from "../../../src/services/game.service";
import { ACCESS_TOKEN } from "../../../src/types/constants";

// game/xxxx-xx-xxxx/join
const GameJoinPage = () => {
  const router = useRouter();
  const { id, player } = router.query;
  const [gameService] = useService<GameService>(GameService);
  const [state, setState] = useState({
    name: "",
  });

  const { setItemToStorage } = useStorage();

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const newState = { ...state, name: event.target.value };
    setState(newState);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!state.name) {
      return;
    }

    gameService.joinGame(id.toString(), state.name, joinGameCallback);
  };

  const joinGameCallback = (response: any) => {
    console.log("joinToGameCallback", response);
    if (response.gameId) {
      setItemToStorage(ACCESS_TOKEN, response.accessToken);
      router.push(`/game/${response.gameId}`);
    }
  };

  return (
    <div className="container">
      <h1>Join game</h1>
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

        <div className="row">
          <div className="col">
            <input
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              value="Join"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GameJoinPage;
// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["menu", "game", "popups"])),
//   },
// });
// export default withTranslation("game")(GamePage);
