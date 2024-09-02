import apiSlice from "../api/apiSlice";
import { userLogin } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
          dispatch(
            userLogin({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
          dispatch(
            userLogin({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
