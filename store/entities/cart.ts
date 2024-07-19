import { createSelector, createSlice } from "@reduxjs/toolkit";

import { AppState } from "..";
import { CartItem } from "../models";

interface CartState {
  cartItems: CartItem[];
  selectedCartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [] as CartItem[],
  selectedCartItems: [] as CartItem[],
};

const saveToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartState", JSON.stringify(state));
  }
};

const loadFromLocalStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem("cartState");
    return state ? JSON.parse(state) : initialState;
  }
  return initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage(),
  reducers: {
    addCartItem(state, action) {
      state.cartItems.push(action.payload);
      saveToLocalStorage(state);
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload?.id
      );
      state.selectedCartItems = state.selectedCartItems.filter(
        (item) => item.id !== action.payload?.id
      );
      saveToLocalStorage(state);
    },
    bulkRemoveCartItem(state) {
      state.cartItems = state.cartItems.filter((item) => {
        return !state.selectedCartItems.find((selectedItem) => {
          return selectedItem.id === item.id;
        });
      });
      state.selectedCartItems = [];
      saveToLocalStorage(state);
    },
    removeAllCartItems(state) {
      state.cartItems = [];
      state.selectedCartItems = [];
      saveToLocalStorage(state);
    },
    addCartQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.id === action.payload?.id
      );
      if (item) {
        item.quantity += 1;
      }
      saveToLocalStorage(state);
    },
    removeCartQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.id === action.payload?.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveToLocalStorage(state);
    },
    addSelectedCartItem(state, action) {
      state.selectedCartItems.push(action.payload);
      saveToLocalStorage(state);
    },
    removeSelectedCartItem(state, action) {
      state.selectedCartItems = state.selectedCartItems.filter(
        (item) => item.id !== action.payload?.id
      );
      saveToLocalStorage(state);
    },
    selectAllCartItems(state) {
      state.selectedCartItems = state.cartItems;
      saveToLocalStorage(state);
    },
    removeAllSelectedCartItems(state) {
      state.selectedCartItems = [];
      saveToLocalStorage(state);
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  bulkRemoveCartItem,
  addCartQuantity,
  removeCartQuantity,
  addSelectedCartItem,
  removeSelectedCartItem,
  selectAllCartItems,
  removeAllSelectedCartItems,
  removeAllCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItems = createSelector(
  (state: AppState) => ({ cartItems: state.cart.cartItems }),
  (state) => state
);

export const getSelectedCartItems = createSelector(
  (state: AppState) => ({ selectedCartItems: state.cart.selectedCartItems }),
  (state) => state
);
