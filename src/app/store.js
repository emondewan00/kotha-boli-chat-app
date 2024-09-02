import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import conversationsSlice from "../features/conversations/conversationsSlice";
import messagesSlice from "../features/messages/messagesSlice";

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    auth: authSlice,
    conversation: conversationsSlice,
    messages: messagesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
