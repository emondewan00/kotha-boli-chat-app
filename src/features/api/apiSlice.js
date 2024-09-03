import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (arg, api, option) => {
  const result = await baseQuery(arg, api, option);
  if (result.error && result.error.status === 401) {
    api.dispatch(userLoggedOut());
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,

  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
