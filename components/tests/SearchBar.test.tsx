import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchBar } from "..";

jest.mock("lodash/debounce", () => (fn: any) => fn);

describe("SearchBar", () => {
  it("should call setQuery with the search term when the search button is clicked", () => {
    const setQuery = jest.fn();
    render(<SearchBar setQuery={setQuery} />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "durian" },
    });

    fireEvent.click(screen.getByTestId("search-button"));
    expect(setQuery).toHaveBeenCalledWith("durian");
  });

  it("should call setQuery with an empty string when input is cleared", async () => {
    const setQuery = jest.fn();
    render(<SearchBar setQuery={setQuery} />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "test" } });

    jest.advanceTimersByTime(400);

    fireEvent.change(searchInput, { target: { value: "" } });

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(setQuery).toHaveBeenCalledWith("");
    });
  });
});
