import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import * as React from "react";
import { useMount } from "react-use";
import "reflect-metadata";
import AppContext from "../src/AppContext";
import { Footer } from "../src/components/FooterComponent/FooterComponent";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";
import PageHeaderComponent from "../src/components/PageHeaderComponent/PageHeaderComponent";
import { useService } from "../src/di/injector";
import { GameService } from "../src/services/game.service";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [soundMute, setSoundMute] = React.useState(false);
  const [gameData, setGameData] = React.useState({});
  const [gameService] = useService<GameService>(GameService);
  // const { getItemFromStorage, setItemToStorage } = useStorage();
  // let subscription: Subscription;

  useMount(() => {
    gameService.connect();

    // const accessToken = getItemFromStorage(ACCESS_TOKEN);

    // subscription = gameService.getEvents().subscribe((event: GameEvents) => {
    //   switch (event.type) {
    //     case GameEventType.connected:
    //       gameService.checkIn(id, accessToken);
    //       break;
    //   }
    // });
  });

  return (
    <AppContext.Provider
      value={{
        state: {
          soundMute,
          gameData,
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
  );
}

export default appWithTranslation(MyApp);
