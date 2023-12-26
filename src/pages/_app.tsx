import React from "react";
import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";

const configuration = {
  environmentId: "d280b168-0feb-4621-ae76-2ba6283dcdcf",
  shadowDOMEnabled: false,
  // newToWeb3WalletChainMap: {
  //   primary_chain: "evm",
  //   wallets: {
  //     evm: "metamask, coinbase",
  //   },
  // },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hifi Pay</title>
      </Head>
      <DynamicContextProvider settings={configuration}>
        <Component {...pageProps} />
      </DynamicContextProvider>
    </>
  );
}
