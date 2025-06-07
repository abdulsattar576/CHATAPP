import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utils/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "users/message",
  async ({ message,receiverId}, { rejectWithValue }) => {
    try {
      const responce = await axiosInstance.post(
        `/message/send/${receiverId}`,
        {
          message,
        }
      );

      return responce.data;
    } catch (error) {
      console.log(error?.response?.data.errMessage);

      const errorOutput = error?.response?.data.errMessage;

      return rejectWithValue(errorOutput);
    }
  }
);
//getMessages
export const getMessageThunk = createAsyncThunk(
  "users/get-message",
  async ({ otherParticipantId }, { rejectWithValue }) => {
    try {
      const responce = await axiosInstance.get(
        `/message/get-messages/${otherParticipantId}`,
         
      );

      return responce.data;
    } catch (error) {
      console.log(error?.response?.data.errMessage);

      const errorOutput = error?.response?.data.errMessage;

      return rejectWithValue(errorOutput);
    }
  }
);

