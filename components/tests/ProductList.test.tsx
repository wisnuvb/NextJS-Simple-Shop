import { render, screen } from "@testing-library/react";
import { ProductList } from "..";
import { Item } from "@/common/types";

const mockProduct: Item[] = [
  {
    id: "93b6130d-6b50-4a16-95ac-b272f9e0d998",
    title: "Sleek Fresh Chips",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    imageSrc: "https://picsum.photos/id/526/640/480",
    price: 22594.71,
    priceCurrency: "gbp",
    createdAt: "2021-10-09T03:19:32.742Z",
    updatedAt: "2019-03-12T05:28:18.105Z",
  },
  {
    id: "4d7f41b4-bcd9-4c59-a7b0-bc2fa0baa29c",
    title: "Handmade Wooden Sausages",
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    imageSrc: "https://picsum.photos/id/526/640/480",
    price: 95102.4,
    priceCurrency: "gbp",
    createdAt: "2021-04-13T03:27:49.868Z",
    updatedAt: "1881-04-02T13:30:14.345Z",
  },
];

jest.mock("@/components/cards", () => ({
  ProductCard: (props: any) => (
    <div data-testid="product-card">{props.product.id}</div>
  ),
  EmptyCard: (props: any) => <div data-testid="empty-card">{props.title}</div>,
}));

describe("ProductList", () => {
  it("renders the product list", () => {
    render(<ProductList products={mockProduct} />);

    const productElement = screen.getByTestId("product-list");
    expect(productElement).toBeInTheDocument();
  });
  it("renders empty card if no products", () => {
    render(<ProductList products={[]} />);

    const emptyCardElement = screen.getByTestId("empty-card");
    expect(emptyCardElement).toBeInTheDocument();
    expect(emptyCardElement).toHaveTextContent("Product is out of stock");
  });
});
