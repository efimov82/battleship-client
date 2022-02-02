// import { withTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMount, useUnmount } from "react-use";
import { Subscription } from "rxjs";
import { Cell, CellState, CellTypeEnum } from "../../src/classes/Cell";
import {
  CheckInGameEvent,
  GameErrorEvent,
  GameEvents,
  GameStartedEvent,
  GameUpdateEvent,
  RivalConnectedEvent,
  ShotUpdateEvent,
} from "../../src/classes/GameEvent";

import { useService } from "../../src/di/injector";
import useStorage from "../../src/hooks/useStorage";
import { GameService, Sound, SoundService } from "../../src/services";

import { ACCESS_TOKEN } from "../../src/types/constants";
import {
  GameEventType,
  GameState,
  GameType,
} from "../../src/types/common/game.enums";
import { ShipsCount } from "../../src/types/common/game.types";
import { GameUpdatePayload } from "../../src/types/common/events.responces";

import {
  EditShipsMode,
  GameBoardComponent,
} from "../../src/components/GameBoardComponent/GameBoardComponent";
import { GameErrorComponent } from "../../src/components/GameErrorComponent/GameErrorComponent";
import { NotificationComponent } from "../../src/components/NotificationComponent/NotificationComponent";
import GameOverComponent from "../../src/components/GameOverComponent/GameOverComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withTranslation } from "next-i18next";
import { GetStaticPaths } from "next";

// game/xxxx-xx-xxxx
const GamePage = ({ query }) => {
  const router = useRouter();
  const [gameService] = useService<GameService>(GameService);
  const [soundService] = useService<SoundService>(SoundService);
  const { id } = router.query;

  const { getItemFromStorage, setItemToStorage } = useStorage();
  const [showJoinLink, setShowJoinLink] = useState(false);
  const [gameError, setGameError] = useState("");
  const [showBoard, setShowBoard] = useState(false);
  const [showField1, setShowField1] = useState(false);
  const [showField2, setShowField2] = useState(false);
  const [field1, setField1] = useState<Cell[][]>(null);
  const [field2, setField2] = useState<Cell[][]>(null);
  const [shipsCount1, setShipCount1] = useState<ShipsCount>(null);
  const [shipsCount2, setShipCount2] = useState<ShipsCount>(null);
  const [gameEditMode, setGameEditMode] = useState(true);
  const [showNotificationGameStarted, setShowNotificationGameStarted] =
    useState(false);
  const [isShootingAvailable, setIsShootingAvailable] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [isPlayerWin, setIsPlayerWin] = useState(false);

  let subscription: Subscription;
  let accessToken: string = null;
  // let animatedCell: Cell = null;

  useMount(() => {
    accessToken = getItemFromStorage(ACCESS_TOKEN);
    gameService.setAccessToken(accessToken);
    gameService.setGameId(id as string);

    subscription = gameService.getEvents().subscribe((event: GameEvents) => {
      if (!event) return;
      switch (event.type) {
        case GameEventType.connected:
          gameService.checkIn(id);
          break;
        case GameEventType.checkIn:
          checkInHandler(event as CheckInGameEvent);
          break;
        case GameEventType.rivalConnected:
          rivalConnectedHandler(event as RivalConnectedEvent);
          break;
        case GameEventType.gameStarted:
          gameStartedHandler(event as GameStartedEvent);
          break;
        case GameEventType.gameUpdate:
          gameUpdate(event as GameUpdateEvent);
          break;
        case GameEventType.shotUpdate:
          shotUpdate(event as ShotUpdateEvent);
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
    setShowBoard(true);
  };

  const rivalConnectedHandler = (event: RivalConnectedEvent) => {
    setShowJoinLink(false);
  };

  const gameStartedHandler = (event: GameStartedEvent) => {
    setGameEditMode(false);
    setShowNotificationGameStarted(true);
  };

  const shotUpdate = (event: ShotUpdateEvent) => {
    const payload = event.getPayload();
    if (payload.player?.field) {
      const shottedCell = payload.player.field[0];

      playSoundOnShotUpdate(shottedCell);
    } else if (payload.rival?.field) {
      const shottedCell = payload.rival.field[0];

      playSoundOnShotUpdate(shottedCell);
    }
  };

  const playSoundOnShotUpdate = (cell: Cell) => {
    if (cell.type === CellTypeEnum.empty) {
      soundService.play(Sound.shotWater);
    } else {
      if (cell.state === CellState.killed) {
        soundService.play(Sound.shipKilled);
      } else {
        soundService.play(Sound.shot);
      }
    }
  };

  const gameUpdate = (event: GameUpdateEvent) => {
    console.log(event);
    const payload = event.getPayload();

    switch (payload.state) {
      case GameState.created:
        setGameEditMode(true);
        break;
      case GameState.started:
        setGameEditMode(false);
        break;
      case GameState.finished:
        gameOver(payload);
        break;
      default:
        console.log("Unkown game state ", payload.state);
    }

    setField1(payload.player.field);
    setShipCount1(payload.player.shipsCount);
    setShowField1(true);
    setIsShootingAvailable(payload.isPlayerTurn);
    if (payload.rival) {
      setField2(payload.rival.field);
      setShipCount2(payload.rival.shipsCount);
      setShowField2(true);
    } else if (payload.settings.gameType === GameType.multyPlay) {
      setShowJoinLink(true);
    }
  };

  const gameOver = (payload: GameUpdatePayload): void => {
    setShowGameOver(true);
    setIsPlayerWin(payload.isPlayerWin);

    if (payload.isPlayerWin) {
      soundService.play(Sound.playerWin);
    } else {
      soundService.play(Sound.playerLose);
    }
  };

  const handleOnAutoFillClick = () => {
    gameService.autoFill();
  };

  const handleOnStartButtonClick = () => {
    gameService.startGame();
  };

  const handleOnPlayerFieldClick = (
    row: number,
    col: number,
    editShipsData: EditShipsMode
  ) => {
    if (editShipsData.modeType === "add") {
      const payload = {
        row,
        col,
        shipSize: editShipsData.shipSize,
        isVertical: editShipsData.isShipVertical,
      };

      gameService.addShip(payload, addShipCallback);
    } else if (editShipsData.modeType === "delete") {
      gameService.deleteShip(row, col, deleteShipCallback);
    }
  };

  const addShipCallback = (result: boolean) => {
    if (result) {
      soundService.play(Sound.addShip);
    }
  };

  const deleteShipCallback = (result: boolean) => {
    if (result) {
      soundService.play(Sound.deleteShip);
    }
  };

  const handleOnRivalFieldClick = (row: number, col: number) => {
    gameService.takeShot(row, col);
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
    <div className="container gameContainer">
      {showJoinLink && (
        <p>
          Join link:{" "}
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      )}
      {showNotificationGameStarted && <NotificationComponent />}

      {gameError && <GameErrorComponent message={gameError} />}
      {showGameOver && (
        <GameOverComponent
          onNewGameClick={() => {}}
          isPlayerWin={isPlayerWin}
        />
      )}
      {!gameError && showBoard && (
        <GameBoardComponent
          editMode={gameEditMode}
          shipsCount1={shipsCount1}
          shipsCount2={shipsCount2}
          showField1={showField1}
          showField2={showField2}
          field1={field1}
          field2={field2}
          rivalName="Rival name"
          isShootingAvailable={isShootingAvailable}
          onAutoFillClick={handleOnAutoFillClick}
          onStartButtonClick={handleOnStartButtonClick}
          onPlayerFieldClick={(row, col, editShipsMode) =>
            handleOnPlayerFieldClick(row, col, editShipsMode)
          }
          onRivalFieldClick={(row, col) => handleOnRivalFieldClick(row, col)}
        ></GameBoardComponent>
      )}
    </div>
  );
};

GamePage.getInitialProps = ({ query }) => {
  return { query };
};

// export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export default GamePage;
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["menu", "game", "popups"])),
  },
});
export default withTranslation("game")(GamePage);
