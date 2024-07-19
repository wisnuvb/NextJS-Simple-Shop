import { render, screen } from "@testing-library/react";

import { Header } from "..";

describe("Header", () => {
  it("renders the heading", () => {
    render(<Header />);
    const heading = screen.getByTestId("header-title");
    expect(heading).toBeTruthy();
  });
});
