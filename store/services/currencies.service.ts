import { baseApi } from ".";

export const currenciesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query({
      query: () => "/currencies",
    }),
  }),
});

export const { useGetCurrenciesQuery } = currenciesApi;
