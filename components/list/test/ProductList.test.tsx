import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useCart, useCurrency } from "@/hooks";
import { CartItem } from "@/store/models";
import {
  addSelectedCartItem,
  cartReducer,
  currencyReducer,
  removeSelectedCartItem,
} from "@/store/entities";
import { ProductList } from "..";

const items: CartItem[] = [
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

jest.mock("@/hooks", () => ({
  useCart: jest.fn(),
  useCurrency: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  ...jest.requireActual("react-hot-toast"),
  success: jest.fn(),
}));

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("ProductList", () => {
  const mockDispatch = jest.fn();
  const product: CartItem = items[0];

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      selectedCartItems: [],
      cartItems: [],
    });

    (useCurrency as jest.Mock).mockReturnValue({
      currencies: [{ key: "usd", value: "USD" }],
      currentCurrency: "usd",
    });

    store.dispatch = mockDispatch as any;
  });

  const renderComponent = () =>
    renderWithProvider(<ProductList product={product} />);

  it("renders product details and quantity control", () => {
    renderComponent();

    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  it("should dispatch addSelectedCartItem when checkbox is clicked", () => {
    (useCart as jest.Mock).mockReturnValueOnce({
      selectedCartItems: [],
      cartItems: [],
    });

    renderComponent();

    fireEvent.click(screen.getByTestId("select-product"));

    expect(mockDispatch).toHaveBeenCalledWith(addSelectedCartItem(product));
  });

  it("should dispatch removeSelectedCartItem when checkbox is clicked", () => {
    (useCart as jest.Mock).mockReturnValueOnce({
      selectedCartItems: [product],
      cartItems: [product],
    });

    renderComponent();

    fireEvent.click(screen.getByTestId("unselect-product"));

    expect(mockDispatch).toHaveBeenCalledWith(removeSelectedCartItem(product));
  });
});
