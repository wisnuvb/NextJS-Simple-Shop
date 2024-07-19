import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (_builder) => ({}),
});
