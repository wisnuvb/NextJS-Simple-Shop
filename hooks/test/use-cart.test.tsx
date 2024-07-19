import { getCartItems, getSelectedCartItems } from "@/store/entities";
import { renderHook } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useCart } from "..";

const mockStore = configureMockStore();
const store = mockStore({
  entities: {
    cartItems: {
      cartItems: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
    },
    selectedCartItems: { selectedCartItems: [{ id: 1, name: "Product 1" }] },
  },
});

jest.mock("@/store/entities", () => ({
  getCartItems: jest.fn(),
  getSelectedCartItems: jest.fn(),
}));

describe("useCart", () => {
  beforeEach(() => {
    (getCartItems as unknown as jest.Mock).mockReturnValue({
      cartItems: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
    });
    (getSelectedCartItems as unknown as jest.Mock).mockReturnValue({
      selectedCartItems: [{ id: 1, name: "Product 1" }],
    });
  });

  it("should return cartItems and selectedCartItems from store", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.cartItems).toEqual([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);
    expect(result.current.selectedCartItems).toEqual([
      { id: 1, name: "Product 1" },
    ]);
  });

  it("should return an empty array if no cartItems are present", () => {
    (getCartItems as unknown as jest.Mock).mockReturnValue({ cartItems: [] });

    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.cartItems).toEqual([]);
  });

  it("should return an empty array if no selectedCartItems are present", () => {
    (getSelectedCartItems as unknown as jest.Mock).mockReturnValue({
      selectedCartItems: [],
    });

    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.selectedCartItems).toEqual([]);
  });
});
