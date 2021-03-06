import Document, { Html, Head, Main, NextScript } from "next/document";
const manrope =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="royalblue" />
          <meta name="description" content="A sample web app to learn nextjs" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/192x192.png" />
          <link rel="stylesheet" href={manrope} />
          {/* <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
