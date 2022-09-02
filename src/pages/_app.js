import "../../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Is there a fucking {process.env.homeTeam} game?</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={process.env.websiteDescription} name="description" />

        {/* TODO: Add These */}
        <meta content="website" property="og:type" />
        <meta content="" property="og:title" />
        <meta content="" property="og:url" />
        <meta content="" property="og:image" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;