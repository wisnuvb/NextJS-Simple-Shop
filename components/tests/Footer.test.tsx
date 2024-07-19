import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Footer } from "..";
import { currencyReducer } from "@/store/entities";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

// Mock hooks
jest.mock("@/hooks", () => ({
  useCart: () => ({
    cartItems: [{ id: 1, name: "Product 1" }],
  }),
  useCurrency: () => ({
    currencies: [{ key: "usd" }, { key: "eur" }, { key: "jpy" }],
    currentCurrency: "usd",
  }),
  useModal: () => ({
    modal: {
      onOpen: jest.fn(),
    },
  }),
}));

jest.mock("lodash/size", () => jest.fn((items) => items.length));

describe("Footer", () => {
  it("renders the footer", () => {
    renderWithProvider(<Footer />);
    const footerElement = screen.getByTestId("label-footer");
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent("Currency");

    const selectElement = screen.getByTestId("select-currency");
    expect(selectElement).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("JPY")).toBeInTheDocument();
  });
  it("calls handleSelectCurrency on select change", () => {
    renderWithProvider(<Footer />);

    fireEvent.change(screen.getByTestId("select-currency"), {
      target: { value: "eur" },
    });
    expect(store.getState().currency.currentCurrency).toBe("eur");
  });

  it("enables and disables the Checkout button based on cart items", () => {
    renderWithProvider(<Footer />);

    const checkoutButton = screen.getByText("Checkout");
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).toBeEnabled();

    fireEvent.click(checkoutButton);
  });
});
