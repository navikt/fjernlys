import "@navikt/ds-css";
import type { AppProps } from "next/app";
import Head from "next/head";
import dotenv from "dotenv";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon-nav.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
