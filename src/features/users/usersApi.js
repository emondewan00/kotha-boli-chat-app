import apiSlice from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email) => ({
        url: `/users?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
