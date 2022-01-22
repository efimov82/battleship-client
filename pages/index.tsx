import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { withTranslation } from "react-i18next";

function Home() {
  const router = useRouter();
  const { t } = useTranslation(["main", "menu"]);

  return (
    <div className="container">
      <div className="row m-2">
        <div className="col">
          <div className="row">
            <div className="col col-sm-10">
              <h1>{t("title")}</h1>
              <p>{t("description")}</p>

              <h2>{t("gameplay")}</h2>
              <p>{t("rules")}</p>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <Link href="/game/new">
            <a className="btn btn-primary">{t("start-game")}</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["main", "menu"])),
  },
});

export default withTranslation(["main", "menu"])(Home);
