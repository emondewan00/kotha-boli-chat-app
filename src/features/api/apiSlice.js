import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // eslint-disable-next-line no-undef
    baseUrl: process.env.VITE_API_URL,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
