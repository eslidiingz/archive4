import "../styles/globals.css";
// import AdminProvider from "/context/AdminContext";
import { SessionProvider } from "next-auth/react";
import WalletProvider from "../context/Wallet";
import { ApolloProvider } from "@apollo/client";
import { gqlClient } from "../utils/providers/apolloClient";

import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/custom.css";

import "react-checkbox-tree/lib/react-checkbox-tree.css";

export const apolloClient = gqlClient;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <ApolloProvider client={gqlClient}>
        <SessionProvider session={session}>
          <WalletProvider>
          <Component {...pageProps} />
          </WalletProvider>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
