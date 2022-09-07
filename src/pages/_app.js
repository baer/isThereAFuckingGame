/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="site.webmanifest" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="icon.png" />

        {/* Primary Meta Tags */}
        <title>{`Is There A Fucking ${process.env.teamName} Game?`}</title>
        <meta
          name="title"
          content={`Is There A Fucking ${process.env.teamName} Game?`}
        />
        <meta name="description" content={process.env.websiteDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.websiteURL} />
        <meta
          property="og:title"
          content={`Is There A Fucking ${process.env.teamName} Game?`}
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
          content={`Is There A Fucking ${process.env.teamName} Game?`}
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
