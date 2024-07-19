import { renderHook } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { currencies } from "@/common/data";
import { getCurrencies, getCurrentCurrency } from "@/store/entities";
import { useCurrency } from "..";

const mockStore = configureMockStore();
const store = mockStore({
  entities: {
    currencies: {
      currencies,
    },
    currentCurrency: { currentCurrency: "USD" },
  },
});

jest.mock("@/store/entities", () => ({
  getCurrencies: jest.fn(),
  getCurrentCurrency: jest.fn(),
}));

describe("useCurrency", () => {
  beforeEach(() => {
    (getCurrencies as unknown as jest.Mock).mockReturnValue({
      currencies: [
        { key: "USD", symbol: "$" },
        { key: "EUR", symbol: "€" },
      ],
    });
    (getCurrentCurrency as unknown as jest.Mock).mockReturnValue({
      currentCurrency: "USD",
    });
  });

  it("should return currencies and currentCurrency from store", () => {
    const { result } = renderHook(() => useCurrency(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.currencies).toEqual([
      { key: "USD", symbol: "$" },
      { key: "EUR", symbol: "€" },
    ]);
    expect(result.current.currentCurrency).toBe("USD");
  });

  it("getActiveCurrency should return the active currency", () => {
    const { result } = renderHook(() => useCurrency(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const activeCurrency = result.current.getActiveCurrency();

    expect(activeCurrency).toEqual({ key: "USD", symbol: "$" });
  });

  it("getActiveCurrency should return undefined if no matching currency is found", () => {
    (getCurrentCurrency as unknown as jest.Mock).mockReturnValue({
      currentCurrency: "JPY",
    });

    const { result } = renderHook(() => useCurrency(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const activeCurrency = result.current.getActiveCurrency();

    expect(activeCurrency).toBeUndefined();
  });
});
