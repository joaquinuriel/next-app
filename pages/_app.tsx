import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ProvideAuth } from "src/auth";
import "styles/globals.sass";
import { Provider } from "next-auth/client"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => void navigator.serviceWorker.register("/sw.js"), []);
  return (
    // <ProvideAuth>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    // </ProvideAuth>
  );
}
