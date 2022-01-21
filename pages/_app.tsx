import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Footer } from "../src/components/FooterComponent/FooterComponent";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";
import PageHeaderComponent from "../src/components/PageHeaderComponent/PageHeaderComponent";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageHeaderComponent title="game-title" />
      <MenuComponent />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default appWithTranslation(MyApp);
