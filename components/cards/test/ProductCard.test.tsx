import { fireEvent, render, screen } from "@testing-library/react";

import { Item } from "@/common/types";
import { useCart, useCurrency } from "@/hooks";
import { addCartItem } from "@/store/entities";
import { ProductCard } from "..";
import { currencies } from "@/common/data";

jest.mock("@/hooks", () => ({
  useCart: jest.fn(),
  useCurrency: jest.fn(),
}));

jest.mock("next/image", () => (props: any) => <img {...props} />);

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const mockProduct: Item = {
  id: "93b6130d-6b50-4a16-95ac-b272f9e0d998",
  title: "Sleek Fresh Chips",
  description:
    "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
  imageSrc: "https://picsum.photos/id/526/640/480",
  price: 22594.71,
  priceCurrency: "gbp",
  createdAt: "2021-10-09T03:19:32.742Z",
  updatedAt: "2019-03-12T05:28:18.105Z",
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
    });
    (useCurrency as jest.Mock).mockReturnValue({
      currencies,
      currentCurrency: "USD",
    });
  });

  it("renders product card with correct data", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute(
      "src",
      mockProduct.imageSrc
    );
  });

  it("calls handleSelectProduct when Add button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByText("Add"));

    expect(mockDispatch).toHaveBeenCalledWith(
      addCartItem({ ...mockProduct, quantity: 1 })
    );
  });

  it("should render QuantityControl if product is in cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [mockProduct],
    });

    render(<ProductCard product={mockProduct} />);

    const btnAddQuantity = screen.getByTestId("btn-add-quantity");
    expect(btnAddQuantity).toBeInTheDocument();
    expect(fireEvent.click(btnAddQuantity)).toBeTruthy();
  });
});
