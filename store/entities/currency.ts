import { createSelector, createSlice } from "@reduxjs/toolkit";

import { Currency } from "@/common/types";
import { currenciesApi } from "../services";
import { AppState } from "../configure-store";

interface CurrencyState {
  currencies: Currency[];
  currentCurrency: string;
}

const initialState: CurrencyState = {
  currencies: [] as Currency[],
  currentCurrency: "usd", // NOTE: set default currency is USD
};

const saveToLocalStorage = (state: CurrencyState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("currencyState", JSON.stringify(state));
  }
};

const loadFromLocalStorage = (): CurrencyState => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem("currencyState");
    return state ? JSON.parse(state) : initialState;
  }
  return initialState;
};

const currencySlice = createSlice({
  name: "currency",
  initialState: loadFromLocalStorage(),
  reducers: {
    setCurrentCurrency(state, action) {
      state.currentCurrency = action.payload;
      saveToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      currenciesApi.endpoints.getCurrencies.matchFulfilled,
      (state, action) => {
        state.currencies = action.payload;
      }
    );
  },
});

export const { setCurrentCurrency } = currencySlice.actions;

export default currencySlice.reducer;

export const getCurrencies = createSelector(
  (state: AppState) => ({ currencies: state.currency.currencies }),
  (state) => state
);

export const getCurrentCurrency = createSelector(
  (state: AppState) => ({ currentCurrency: state.currency.currentCurrency }),
  (state) => state
);
