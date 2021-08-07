import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => void navigator.serviceWorker.register("/sw.js"));
  return <Component {...pageProps} />;
}
