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
import { SoundService } from "../src/services";
import { GameService } from "../src/services/game.service";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [soundMuted, setSoundMuted] = React.useState(false);
  const [gameService] = useService<GameService>(GameService);
  const [soundService] = useService<SoundService>(SoundService);

  useMount(() => {
    gameService.connect();
  });

  const setSoundMute = (value: boolean) => {
    setSoundMuted(value);
    soundService.setSoundMuted(value);
  };

  return (
    <AppContext.Provider
      value={{
        state: {
          soundMuted,
        },
        setSoundMute,
      }}
    >
      <PageHeaderComponent title="game-title" />
      <div className="game">
        <MenuComponent />
        <Component {...pageProps} />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);
