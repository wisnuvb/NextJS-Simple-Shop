import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import { getCurrencies, getCurrentCurrency } from "..";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Selectors", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      currency: {
        currencies: [{ key: "usd", value: "USD" }],
        currentCurrency: "usd",
      },
    });
  });

  it("getCurrencies selector", () => {
    const state = store.getState();
    const result = getCurrencies(state);
    expect(result).toEqual({
      currencies: [{ key: "usd", value: "USD" }],
    });
  });

  it("getCurrentCurrency selector", () => {
    const state = store.getState();
    const result = getCurrentCurrency(state);
    expect(result).toEqual({
      currentCurrency: "usd",
    });
  });
});
