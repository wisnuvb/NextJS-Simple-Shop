import { renderHook, waitFor } from "@testing-library/react";
import { useGetCurrenciesQuery } from "..";

jest.mock("..", () => ({
  useGetCurrenciesQuery: jest.fn().mockReturnValue({
    data: [{ key: "usd", value: "USD" }],
    isLoading: false,
    error: null,
  }),
}));

describe("useGetCurrenciesQuery", () => {
  it("fetches currencies successfully", async () => {
    const { result } = renderHook(() => useGetCurrenciesQuery({}));

    await waitFor(() => {
      expect(result.current.data).toEqual([{ key: "usd", value: "USD" }]);
      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
