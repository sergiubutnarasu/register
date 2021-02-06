import "@solness/ui/build/global/styles/styles.css";
import "@solness/ui/build/global/styles/tailwind.css";
import { Provider } from "next-auth/client";
import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
