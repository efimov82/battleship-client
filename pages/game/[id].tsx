// import { withTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMount, useUnmount } from "react-use";
import { Subscription } from "rxjs";
import { GameEvent, GameEventType } from "../../src/classes/GameEvent";
import { useService } from "../../src/di/injector";
import useStorage from "../../src/hooks/useStorage";
import { GameService } from "../../src/services/game.service";
import { ACCESS_TOKEN } from "../../src/types/constants";

// game/xxxx-xx-xxxx?player=2
const GamePage = ({ query }) => {
  const router = useRouter();
  const [gameService] = useService<GameService>(GameService);
  const { id, player } = router.query;
  const { getItemFromStorage, setItemToStorage } = useStorage();
  const [showJoinLink, setShowJoinLink] = useState(true);
  let subscription: Subscription;

  useMount(() => {
    const accessToken = getItemFromStorage(ACCESS_TOKEN);

    subscription = gameService.getEvents().subscribe((event: GameEvent) => {
      switch (event.type) {
        case GameEventType.connected:
          gameService.register(id, accessToken);
          break;
        case GameEventType.playerConnected:
          playerConnected(event);
        default:
          console.log("event:", event);
      }
    });
  });

  const playerConnected = (event: GameEvent) => {
    console.log(event);

    setShowJoinLink(false);
  };

  useUnmount(() => {
    subscription?.unsubscribe();
  });

  const link = `${process.env.NEXT_PUBLIC_HOSTNAME}/game/${id}/join`;
  return (
    <div className="container">
      {showJoinLink && (
        <p>
          Link for join:{" "}
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      )}
    </div>
  );
};

GamePage.getInitialProps = ({ query }) => {
  return { query };
};

export default GamePage;
// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["menu", "game", "popups"])),
//   },
// });
// export default withTranslation("game")(GamePage);
