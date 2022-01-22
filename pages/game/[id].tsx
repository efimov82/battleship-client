import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useService } from "../../src/di/injector";
import { GameService } from "../../src/services/game.service";

// game/xxxx-xx-xxxx?player=2
const GamePage = () => {
  const router = useRouter();
  const [gameService] = useService<GameService>(GameService);
  const { id, player } = router.query;

  return (
    <p>
      Game: {id} for {player}
    </p>
  );
};

export default GamePage;
// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["menu", "game", "popups"])),
//   },
// });
// export default withTranslation("game")(GamePage);
