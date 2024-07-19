import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { CartItem } from "@/store/models";
import {
  addCartQuantity,
  cartReducer,
  currencyReducer,
  removeCartItem,
  removeCartQuantity,
} from "@/store/entities";
import { QuantityControl } from "..";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

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

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

describe("QuantityControl", () => {
  let product: CartItem;

  beforeEach(() => {
    product = mockCartItems[0];

    const dispatch = jest.fn();

    store.dispatch = dispatch;
  });

  const renderComponent = () =>
    renderWithProvider(<QuantityControl product={product} />);

  it("should render correctly", () => {
    renderComponent();

    expect(screen.getByTestId("btn-delete-cart")).toBeInTheDocument();
    expect(screen.getByTestId("btn-subtract-quantity")).toBeInTheDocument();
    expect(screen.getByTestId("btn-add-quantity")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("should call removeCartItem when trash icon is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("btn-delete-cart"));

    expect(store.dispatch).toHaveBeenCalledWith(removeCartItem(product));
    expect(toast.success).toHaveBeenCalledWith("Product removed from cart");
  });

  it("should call addCartQuantity when plus icon is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("btn-add-quantity"));

    expect(store.dispatch).toHaveBeenCalledWith(addCartQuantity(product));
  });

  it("should call removeCartQuantity when minus icon is clicked", () => {
    product.quantity = 2;
    renderComponent();

    fireEvent.click(screen.getByTestId("btn-subtract-quantity"));

    expect(store.dispatch).toHaveBeenCalledWith(removeCartQuantity(product));
  });

  it("should not call removeCartQuantity when quantity is 1 and minus icon is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("btn-subtract-quantity"));

    expect(store.dispatch).toHaveBeenCalledWith(removeCartQuantity(product));
  });

  it("should call removeCartItem and show toast when input value is 0", () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "0" },
    });

    expect(store.dispatch).toHaveBeenCalledWith(removeCartItem(product));
  });

  it("should update quantity when input value is changed", () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("input-quantity"), {
      target: { value: "5" },
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      addCartQuantity({ ...product, quantity: 5 })
    );
  });
});
