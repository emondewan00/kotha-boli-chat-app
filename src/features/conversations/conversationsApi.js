import apiSlice from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) => ({
        url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=5`,
        method: "GET",
      }),
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) => ({
        url: `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
        method: "GET",
      }),
    }),
    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const users = arg.data.users;
          const senderUser = users.find((user) => user.email === arg.sender);

          const receiverUser = users.find((user) => user.email !== arg.sender);

          dispatch(
            messagesApi.endpoints.sendMessage.initiate({
              conversationId: result.data.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          const users = arg.data.users;
          const senderUser = users.find((user) => user.email === arg.sender);

          const receiverUser = users.find((user) => user.email !== arg.sender);

          dispatch(
            messagesApi.endpoints.sendMessage.initiate({
              conversationId: result.data.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useAddConversationMutation,
  useEditConversationMutation,
  useGetConversationQuery,
} = conversationsApi;
