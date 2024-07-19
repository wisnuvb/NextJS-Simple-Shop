import { baseApi } from ".";
import { ApiItemsRequest, ApiItemsResponse } from "../../common/types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiItemsResponse, ApiItemsRequest>({
      query: (params) => `/items?${new URLSearchParams(params as any)}`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
