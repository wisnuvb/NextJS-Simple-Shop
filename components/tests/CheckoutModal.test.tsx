import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { CheckoutModal } from "@/components/CheckoutModal";
import { useCart, useCurrency } from "@/hooks";
import { CartItem } from "@/store/models";
import { cartReducer, currencyReducer } from "@/store/entities";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

jest.mock("@/hooks", () => ({
  useCart: jest.fn(),
  useCurrency: jest.fn(),
}));

const mockModalProps = {
  isOpen: true,
  onClose: jest.fn(),
};

describe("CheckoutModal", () => {
  const cartItems: CartItem[] = [
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
      description:
        "The Football Is Good For Training And Recreational Purposes",
      imageSrc: "https://picsum.photos/id/526/640/480",
      price: 74062.88,
      priceCurrency: "gbp",
      createdAt: "2021-12-31T09:00:02.659Z",
      updatedAt: "1893-04-25T06:24:08.699Z",
      quantity: 1,
    },
  ];

  const currencies = [
    { key: "USD", value: 1 },
    { key: "EUR", value: 0.9 },
  ];

  const currentCurrency = "USD";

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ cartItems });
    (useCurrency as jest.Mock).mockReturnValue({ currencies, currentCurrency });
  });

  it("renders the modal with correct title and content", () => {
    renderWithProvider(<CheckoutModal modal={mockModalProps} />);

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    cartItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
    expect(screen.getByText("Total Price (2 Items)")).toBeInTheDocument();
  });

  it("displays the confirmation message when confirm button is clicked", () => {
    renderWithProvider(<CheckoutModal modal={mockModalProps} />);

    fireEvent.click(screen.getByText("Submit"));

    expect(
      screen.getByText("Your feedback is greatly appreciated.")
    ).toBeInTheDocument();
  });

  it("calls the onClose function when close button is clicked", () => {
    renderWithProvider(<CheckoutModal modal={mockModalProps} />);

    fireEvent.click(screen.getByText("Close"));

    expect(mockModalProps.onClose).toHaveBeenCalled();
  });
});
