/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        {/* Primary Meta Tags */}
        <title>{`Is There A Fucking ${process.env.homeTeam} Game?`}</title>
        <meta
          name="title"
          content={`Is There A Fucking ${process.env.homeTeam} Game?`}
        />
        <meta name="description" content={process.env.websiteDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.websiteURL} />
        <meta
          property="og:title"
          content={`Is There A Fucking ${process.env.homeTeam} Game?`}
        />
        <meta
          property="og:description"
          content={process.env.websiteDescription}
        />
        <meta
          property="og:image"
          content={`${process.env.websiteURL}/social-preview.png`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={process.env.websiteURL} />
        <meta
          property="twitter:title"
          content={`Is There A Fucking ${process.env.homeTeam} Game?`}
        />
        <meta
          property="twitter:description"
          content={process.env.websiteDescription}
        />
        <meta
          property="twitter:image"
          content={`${process.env.websiteURL}/social-preview.png`}
        ></meta>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
