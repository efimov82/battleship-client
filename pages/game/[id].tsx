// import { withTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useMount, useUnmount } from "react-use";
import { Subscription } from "rxjs";
import { Cell } from "../../src/classes/Cell";
import { Field } from "../../src/classes/Field";
import {
  CheckInGameEvent,
  FieldsUpdateEvent,
  GameErrorEvent,
  GameEvents,
  RivalConnectedEvent,
} from "../../src/classes/GameEvent";
import { GameBoardComponent } from "../../src/components/GameBoardComponent/GameBoardComponent";
import { GameErrorComponent } from "../../src/components/GameErrorComponent/GameErrorComponent";
import { useService } from "../../src/di/injector";
import useStorage from "../../src/hooks/useStorage";
import { GameService } from "../../src/services/game.service";
import { ACCESS_TOKEN } from "../../src/types/constants";
import { GameEventType } from "../../src/types/common/game.enums";

// game/xxxx-xx-xxxx?player=2
const GamePage = ({ query }) => {
  const router = useRouter();
  const [gameService] = useService<GameService>(GameService);
  const { id, player } = router.query;

  const { getItemFromStorage, setItemToStorage } = useStorage();
  const [showJoinLink, setShowJoinLink] = useState(true);
  const [gameError, setGameError] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [showField1, setShowField1] = useState(false);
  const [showField2, setShowField2] = useState(false);
  const [field1, setField1] = useState<Cell[][]>(null); // Field
  const [field2, setField2] = useState<Cell[][]>(null);
  let subscription: Subscription;

  useMount(() => {
    const accessToken = getItemFromStorage(ACCESS_TOKEN);

    subscription = gameService.getEvents().subscribe((event: GameEvents) => {
      if (!event) return;
      switch (event.type) {
        case GameEventType.connected:
          gameService.checkIn(id, accessToken);
          break;
        case GameEventType.checkIn:
          checkInHandler(event as CheckInGameEvent);
          break;
        case GameEventType.rivalConnected:
          rivalConnectedHandler(event as RivalConnectedEvent);
          break;
        case GameEventType.fieldsUpdate:
          fieldsUpdate(event as FieldsUpdateEvent);
          break;
        case GameEventType.error: // TODO move to _app ??
          gameErrorHandler(event as GameErrorEvent);
          break;
        default:
          console.log("unkown event:", event);
      }
    });
  });

  const checkInHandler = (event: CheckInGameEvent) => {
    console.log(event);
    setShowBoard(true);
  };

  const rivalConnectedHandler = (event: RivalConnectedEvent) => {
    setShowJoinLink(false);
    // setShowBoard(true);
    // setShowField1(true);
    //setShowField2(true);
  };

  const fieldsUpdate = (event: FieldsUpdateEvent) => {
    console.log(event);

    setField1(event.getPayload().playerField);
    setShowField1(true);
    if (event.getPayload().rivalField) {
      setField2(event.getPayload().rivalField);
      setShowField2(true);
      setShowJoinLink(false);
    }
  };

  const gameErrorHandler = (event: GameErrorEvent) => {
    setShowJoinLink(false);
    setGameError(event.getPayload());
  };

  useUnmount(() => {
    console.log("unmount");
    subscription?.unsubscribe();
  });

  const link = `${process.env.NEXT_PUBLIC_HOSTNAME}/game/${id}/join`;
  return (
    <div className="container">
      {showJoinLink && (
        <p>
          Join link:{" "}
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      )}

      {gameError && <GameErrorComponent message={gameError} />}
      {!gameError && showBoard && (
        <GameBoardComponent
          showField1={showField1}
          showField2={showField2}
          field1={field1}
          field2={field2}
        ></GameBoardComponent>
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
