import { fireEvent, render, screen } from "@testing-library/react";
import { Pagination } from "..";
import { paginationProps } from "@/utils/interfaces";

const mockHandlePageChange = jest.fn();

const mockPaginationProps: paginationProps = {
  offset: 1,
  handlePageChange: mockHandlePageChange,
  limit: 10,
};

const setup = (total: number, limit: number, offset: number) => {
  const handlePageChange = jest.fn();
  const pagination = { offset, handlePageChange, limit };
  render(<Pagination pagination={pagination} total={total} />);
  return { handlePageChange };
};

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the pagination component", () => {
    render(<Pagination pagination={mockPaginationProps} total={50} />);

    const previousButton = screen.getByTestId("btn-previous");
    const nextButton = screen.getByTestId("btn-next");
    const pageButtons = screen
      .getAllByRole("button")
      .filter((button) => button.textContent?.match(/\d+/));

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(pageButtons.length).toBe(5);

    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[1]).toHaveTextContent("2");
    expect(pageButtons[2]).toHaveTextContent("3");
    expect(pageButtons[3]).toHaveTextContent("4");
    expect(pageButtons[4]).toHaveTextContent("5");
  });

  it("displays correct page numbers for offset <= 3", () => {
    setup(100, 10, 3);
    const pageButtons = screen.getAllByTestId("btn-page");
    expect(pageButtons.length).toBe(5);
    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[1]).toHaveTextContent("2");
    expect(pageButtons[2]).toHaveTextContent("3");
    expect(pageButtons[3]).toHaveTextContent("...");
    expect(pageButtons[4]).toHaveTextContent("10");
  });

  it("displays correct page numbers for offset >= totalPages - 2", () => {
    setup(100, 10, 9);
    const pageButtons = screen.getAllByTestId("btn-page");
    expect(pageButtons.length).toBe(5);
    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[1]).toHaveTextContent("...");
    expect(pageButtons[2]).toHaveTextContent("8");
    expect(pageButtons[3]).toHaveTextContent("9");
    expect(pageButtons[4]).toHaveTextContent("10");
  });

  it("displays correct page numbers for offset in middle range", () => {
    setup(100, 10, 5);
    const pageButtons = screen.getAllByTestId("btn-page");
    const previousButton = screen.getByTestId("btn-previous");
    fireEvent.click(previousButton);
    expect(pageButtons.length).toBe(7);
    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[1]).toHaveTextContent("...");
    expect(pageButtons[2]).toHaveTextContent("4");
    expect(pageButtons[3]).toHaveTextContent("5");
    expect(pageButtons[4]).toHaveTextContent("6");
    expect(pageButtons[5]).toHaveTextContent("...");
    expect(pageButtons[6]).toHaveTextContent("10");
  });

  it("handlePageChange is called with correct argument when a page is clicked", () => {
    const { handlePageChange } = setup(100, 10, 5);
    const pageButtons = screen.getAllByTestId("btn-page");
    fireEvent.click(pageButtons[3]); // Click on page 5
    expect(handlePageChange).toHaveBeenCalledWith(5);
  });

  it("should handle page changes", () => {
    render(<Pagination pagination={mockPaginationProps} total={50} />);

    const nextButton = screen.getByText("Next");
    const pageButton = screen.getByText("2");

    fireEvent.click(nextButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(2);

    fireEvent.click(pageButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });

  it("should disable Previous button on first page", () => {
    render(
      <Pagination
        pagination={{ ...mockPaginationProps, offset: 1 }}
        total={50}
      />
    );

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("should disable Next button on last page", () => {
    render(
      <Pagination
        pagination={{ ...mockPaginationProps, offset: 5 }}
        total={50}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
