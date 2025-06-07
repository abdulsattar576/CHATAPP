import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
import { axiosInstance } from "../../../components/utils/axiosInstance";

export const LoginUserThunk=createAsyncThunk("users/login",async({username,password},{rejectWithValue})=>{
     
    try {
        const responce=await axiosInstance.post('/user/login',{
            username,
            password,
        })
          toast.success("Login Successfull")
        return responce.data
       
    } catch (error) {
        console.log(error?.response?.data.errMessage)
        
        const errorOutput=error?.response?.data.errMessage
         toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
})
//singup thunk
export const SignupUserThunk=createAsyncThunk("users/signup",async({fullName,username,password,gender},{rejectWithValue})=>{
     
    try {
        const responce=await axiosInstance.post('/user/register',{
            username,
            password,
            fullName,
            gender
        })
          toast.success("accouut created successfully")
        return responce.data
       
    } catch (error) {
        console.log(error?.response?.data.errMessage)
        
        const errorOutput=error?.response?.data.errMessage
         toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
})
//logout
 export const LogoutUserThunk = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successful");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage || "Logout failed";
      console.error("Logout error:", errorOutput);
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
//get profile
export const getUserProfileThunk = createAsyncThunk(
  "users/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/profile");
     
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage  ;
      console.error("Fetching user profile:", errorOutput);
       return rejectWithValue(errorOutput);
    }
  }
);
//getOther userr
export const getOtherUserThunk = createAsyncThunk(
  "users/getotheruser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-other-users");
     
      return response.data;
      
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      console.error("fetchinh other user:", errorOutput);
       return rejectWithValue(errorOutput);
    }
  }
);