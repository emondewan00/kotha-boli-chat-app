import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // reducers will be added
  },
});

export const {} = messagesSlice.actions;
export default messagesSlice.reducer;
