import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  buttonLoading: false,
  messages: [],
  conversation: null,
};

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessages: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
      state.conversation = null;
    },
  },
  extraReducers: (builder) => {
    // Send message thunk
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      const newMsg = action.payload?.responceData?.newMessage;
      if (newMsg) {
        state.messages = [...state.messages, newMsg];
      }
      state.buttonLoading = false; // fix: should be false
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // Get message thunk
    builder.addCase(getMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      const responseData = action.payload?.responceData || {};
      state.conversation = responseData;
      state.messages = Array.isArray(responseData.messages)
        ? responseData.messages
        : [];
      state.buttonLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});

export const { setNewMessages, clearMessages } = MessageSlice.actions;

export default MessageSlice.reducer;
