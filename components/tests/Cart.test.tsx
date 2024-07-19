import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import toast from "react-hot-toast";

import { cartReducer } from "@/store/entities";
import { Cart } from "..";
import { useCart, useCurrency } from "@/hooks";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

// NOTE: Mock hooks and functions
jest.mock("@/hooks", () => ({
  useCart: jest.fn(),
  useCurrency: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
  },
}));

const mockCartItems = [
  {
    id: "d2f94dce-4d05-41e0-b508-393155393725",
    title: "Gorgeous Wooden Pizza",
    price: 100,
    priceCurrency: "usd",
    quantity: 1,
  },
];

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with items in the cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      selectedCartItems: [],
      cartItems: mockCartItems,
    });
    (useCurrency as jest.Mock).mockReturnValue({
      currencies: [{ key: "usd" }],
      currentCurrency: "usd",
    });

    renderWithProvider(<Cart />);

    expect(screen.getByTestId("label-cart")).toHaveTextContent("Cart");
    expect(screen.getByText("Select All")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("handles select all cart", async () => {
    // NOTE: Setup mocks
    (useCart as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
    });
    (useCurrency as jest.Mock).mockReturnValue({
      currencies: [{ key: "usd" }],
      currentCurrency: "usd",
    });

    renderWithProvider(<Cart />);

    // NOTE:  Select All
    const selectAllButton = screen.getByTestId("select-all-cart");
    expect(selectAllButton).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("select-all-cart"));

    await waitFor(() => {
      expect(store.getState().cart.selectedCartItems.length).toEqual(
        store.getState().cart.cartItems.length
      );
    });
  });

  it("handles bulk remove cart items", () => {
    // NOTE: Setup mocks
    (useCart as jest.Mock).mockReturnValue({
      selectedCartItems: mockCartItems,
      cartItems: mockCartItems,
    });
    (useCurrency as jest.Mock).mockReturnValue({
      currencies: [{ key: "usd" }],
      currentCurrency: "usd",
    });

    renderWithProvider(<Cart />);

    // NOTE: Trigger bulk remove
    fireEvent.click(screen.getByText("Delete"));
    expect(toast.success).toHaveBeenCalledWith(
      "Successfully removed all products from cart"
    );
  });

  it("displays EmptyCard when cart is empty", () => {
    // NOTE: Setup mocks
    (useCart as jest.Mock).mockReturnValue({
      selectedCartItems: [],
      cartItems: [],
    });
    (useCurrency as jest.Mock).mockReturnValue({
      currencies: [{ key: "usd" }],
      currentCurrency: "usd",
    });

    renderWithProvider(<Cart />);

    expect(screen.getByTestId("empty-card-title")).toBeInTheDocument();
  });
});
