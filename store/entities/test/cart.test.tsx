import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { CartItem } from "@/store/models";
import {
  addCartItem,
  addCartQuantity,
  addSelectedCartItem,
  bulkRemoveCartItem,
  cartReducer,
  getCartItems,
  getSelectedCartItems,
  removeAllSelectedCartItems,
  removeCartItem,
  removeCartQuantity,
  removeSelectedCartItem,
  selectAllCartItems,
} from "..";

const mockCartItems: CartItem[] = [
  {
    id: "d2f94dce-4d05-41e0-b508-393155393725",
    title: "Refined Plastic Cheese",
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    imageSrc: "https://picsum.photos/id/526/640/480",
    price: 55630.92,
    priceCurrency: "eur",
    createdAt: "2021-12-12T21:25:23.851Z",
    updatedAt: "1879-11-06T16:44:21.296Z",
    quantity: 1,
  },
  {
    id: "deb0aaf0-b6a4-4313-93c9-74dfc95b4de0",
    title: "Fantastic Metal Bacon",
    description: "The Football Is Good For Training And Recreational Purposes",
    imageSrc: "https://picsum.photos/id/526/640/480",
    price: 74062.88,
    priceCurrency: "gbp",
    createdAt: "2021-12-31T09:00:02.659Z",
    updatedAt: "1893-04-25T06:24:08.699Z",
    quantity: 1,
  },
];

const selectedCartItemId = "d2f94dce-4d05-41e0-b508-393155393725";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("cartSlice", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: mockCartItems,
        selectedCartItems: [],
      },
    });
    window.localStorage.clear();
  });

  const initialState = {
    cartItems: [] as CartItem[],
    selectedCartItems: [] as CartItem[],
  };

  it("should add cart item and save to localStorage", () => {
    const cartItem: CartItem = mockCartItems[0];
    store.dispatch(addCartItem(cartItem));
    const state = store.getState().cart;
    expect(state.cartItems).toContainEqual(cartItem);
  });

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addCartItem", () => {
    const newItem: CartItem = mockCartItems[0];
    const actual = cartReducer(initialState, addCartItem(newItem));
    expect(actual.cartItems).toEqual([newItem]);
  });

  it("should handle removeCartItem", () => {
    const initialStateWithItems = {
      cartItems: mockCartItems,
      selectedCartItems: mockCartItems,
    };
    const actual = cartReducer(
      initialStateWithItems,
      removeCartItem({ id: selectedCartItemId })
    );

    const expected = mockCartItems?.filter(
      (item) => item.id !== selectedCartItemId
    );
    expect(actual.cartItems).toEqual(expected);
    expect(actual.selectedCartItems).toEqual(expected);
    expect(window.localStorage.getItem("cartState")).toContain(
      JSON.stringify(expected)
    );
  });

  it("should handle bulkRemoveCartItem", () => {
    const initialStateWithItems = {
      cartItems: mockCartItems,
      selectedCartItems: mockCartItems,
    };
    const actual = cartReducer(initialStateWithItems, bulkRemoveCartItem());
    expect(actual.cartItems).toEqual([]);
    expect(actual.selectedCartItems).toEqual([]);
  });

  it("should handle addCartQuantity", () => {
    const initialStateWithItems = {
      cartItems: mockCartItems,
      selectedCartItems: [],
    };
    const actual = cartReducer(
      initialStateWithItems,
      addCartQuantity({ id: selectedCartItemId })
    );
    expect(actual.cartItems[0].quantity).toBe(2);
    expect(window.localStorage.getItem("cartState")).toContain(
      JSON.stringify(actual)
    );
  });

  it("should handle removeCartQuantity", () => {
    const initialStateWithItems = {
      cartItems: mockCartItems,
      selectedCartItems: [],
    };
    const actual = cartReducer(
      initialStateWithItems,
      removeCartQuantity({ id: selectedCartItemId })
    );
    expect(actual.cartItems[0].quantity).toBe(1);
  });

  it("should handle addSelectedCartItem", () => {
    const newItem: CartItem = mockCartItems[0];
    const actual = cartReducer(initialState, addSelectedCartItem(newItem));
    expect(actual.selectedCartItems).toEqual([newItem]);
  });

  it("should handle removeSelectedCartItem", () => {
    const initialStateWithItems = {
      cartItems: [],
      selectedCartItems: mockCartItems,
    };
    const actual = cartReducer(
      initialStateWithItems,
      removeSelectedCartItem({ id: selectedCartItemId })
    );
    expect(actual.selectedCartItems).toEqual(mockCartItems?.slice(1));
  });

  it("should handle selectAllCartItems", () => {
    const initialStateWithItems = {
      cartItems: mockCartItems,
      selectedCartItems: [],
    };
    const actual = cartReducer(initialStateWithItems, selectAllCartItems());
    expect(actual.selectedCartItems).toEqual(initialStateWithItems.cartItems);
  });

  it("should handle removeAllSelectedCartItems", () => {
    const initialStateWithItems = {
      cartItems: mockCartItems,
      selectedCartItems: mockCartItems,
    };
    const actual = cartReducer(
      initialStateWithItems,
      removeAllSelectedCartItems()
    );
    expect(actual.selectedCartItems).toEqual([]);
  });

  it("getCartItems selector", () => {
    const state = store.getState();
    const result = getCartItems(state);
    expect(result).toEqual({ cartItems: mockCartItems });
  });

  it("getSelectedCartItems selector", () => {
    const state = store.getState();
    const result = getSelectedCartItems(state);
    expect(result).toEqual({ selectedCartItems: [] });
  });
});
