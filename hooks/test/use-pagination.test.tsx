import { act, renderHook } from "@testing-library/react";
import { usePagination } from "..";

describe("usePagination", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.pagination.limit).toBe(12);
    expect(result.current.pagination.offset).toBe(1);
  });

  it("should update offset when handlePageChange is called", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.pagination.handlePageChange(5);
    });

    expect(result.current.pagination.offset).toBe(5);
  });

  it("should update limit when handleLimitChange is called", () => {
    const { result } = renderHook(() => usePagination());

    const handleLimitChange = result.current.pagination.handleLimitChange;

    expect(typeof handleLimitChange).toBe("function");

    act(() => {
      if (handleLimitChange) handleLimitChange(30);
    });

    expect(result.current.pagination.limit).toBe(30);
  });
});
