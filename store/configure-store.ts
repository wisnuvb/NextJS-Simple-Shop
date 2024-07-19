import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";
import { baseApi } from "./services";
import { cartReducer, currencyReducer } from "./entities";

export const configureAppStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi?.reducer,
      cart: cartReducer,
      currency: currencyReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof configureAppStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(configureAppStore);
