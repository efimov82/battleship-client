import * as React from "react";
import { Container } from "inversify";
import { Provider } from "inversify-react";
import "reflect-metadata";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useMount } from "react-use";

import { Footer } from "../src/components/FooterComponent/FooterComponent";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";
import PageHeaderComponent from "../src/components/PageHeaderComponent/PageHeaderComponent";
import "../styles/globals.scss";
import { GameService } from "../src/services/game.service";
import { IGameService } from "../src/services/game.interface";
import { TYPES } from "../src/services/types";
import AppContext from "../src/AppContext";
import { useService } from "../src/di/injector";
// import { useGameServiceHook } from "../src/di/injector";

// const gameService = new GameService();

function MyApp({ Component, pageProps }: AppProps) {
  const [soundMute, setSoundMute] = React.useState(false);
  const [gameData, setGameData] = React.useState({});
  const [gameService] = useService<GameService>(GameService);

  useMount(() => {
    gameService.connect();
  });
  //const [gameService] = React.useState(new GameService());

  return (
    // <Provider
    //   container={() => {
    //     const container = new Container();
    //     container.bind<GameService>(GameService).toSelf();
    //     //container.bind(TYPES.gameService).toSelf();
    //     //container.bind(Bar).toSelf();
    //     return container;
    //   }}
    // >
    <AppContext.Provider
      value={{
        state: {
          soundMute,
          gameData,
          // gameService,
        },
        setSoundMute,
        setGameData,
      }}
    >
      <PageHeaderComponent title="game-title" />
      <MenuComponent />
      <Component {...pageProps} />
      <Footer />
    </AppContext.Provider>
    // </Provider>
  );
}

export default appWithTranslation(MyApp);
