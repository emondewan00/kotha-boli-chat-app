import apiSlice from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) => ({
        url: `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${5}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const message = await queryFulfilled;
          const id = message.data.conversationId.toString();
          dispatch(
            apiSlice.util.updateQueryData("getMessages", id, (draft) => {
              draft.push(message.data);
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
