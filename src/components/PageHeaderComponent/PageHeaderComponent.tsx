import Head from "next/head";
import React from "react";

type PageHeaderProps = {
  title: string;
};

export default function PageHeaderComponent(props: PageHeaderProps) {
  return (
    <Head>
      <title>Battelfirld game</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}
