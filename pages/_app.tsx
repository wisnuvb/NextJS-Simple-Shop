import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { wrapper } from "@/store";
import { Toast } from "@/components/toast";

import "../styles/globals.css";

const MyApp = ({ Component, ...rest }: React.PropsWithChildren<AppProps>) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Toast />
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;
