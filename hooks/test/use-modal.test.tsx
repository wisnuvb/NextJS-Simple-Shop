import { act, renderHook } from "@testing-library/react";
import { useModal } from "@/hooks";

describe("useModal", () => {
  it("should initialize with the modal closed", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.modal.isOpen).toBe(false);
  });

  it("should open the modal when onOpen is called", () => {
    const { result } = renderHook(() => useModal());

    const onOpen = result.current.modal.onOpen;
    expect(typeof onOpen).toBe("function");

    act(() => {
      if (onOpen) onOpen();
    });

    expect(result.current.modal.isOpen).toBe(true);
  });

  it("should close the modal when onClose is called", () => {
    const { result } = renderHook(() => useModal());

    const onOpen = result.current.modal.onOpen;
    expect(typeof onOpen).toBe("function");

    act(() => {
      if (onOpen) onOpen();
    });

    act(() => {
      result.current.modal.onClose();
    });

    expect(result.current.modal.isOpen).toBe(false);
  });
});
