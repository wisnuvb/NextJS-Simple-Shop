import React from "react";
import { render, screen } from "@testing-library/react";
import { Modal } from "..";

describe("Modal", () => {
  const defaultProps = {
    onClose: jest.fn(),
    isOpen: true,
    title: "Test Modal",
    size: "md" as const,
  };

  it("renders the modal with title and children", () => {
    render(
      <Modal {...defaultProps}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("applies the correct size class based on size prop", () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);

    const modal = screen.getByTestId("modal");
    expect(modal.className).toContain("max-w-sm");

    rerender(<Modal {...defaultProps} size="lg" />);
    expect(modal.className).toContain("max-w-lg");
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <Modal {...defaultProps} isOpen={false}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("displays the default title when title prop is not provided", () => {
    render(
      <Modal onClose={() => {}} isOpen={true} size="md">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText("Information")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <Modal onClose={() => {}} isOpen={true} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const modal = screen.getByTestId("modal");
    expect(modal.className).toContain("max-w-md");
  });
});
