import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUserThunk,
  getUserProfileThunk,
  LoginUserThunk,
  LogoutUserThunk,
  SignupUserThunk,
} from "./user.thunk";
const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  userProfile: null,
  buttonLoading: false,
  otheruser:null,
  selectedUser:JSON.parse(localStorage.getItem('selectedUser'))

};
export const userSlice = createSlice({
  name: "user",
  initialState,
  //reducer
  reducers: {
    setSelectedUser:(state,action)=>{
      localStorage.setItem('selectedUser',JSON.stringify(action.payload))
      state.selectedUser=action.payload

    }
  },
  //LoginUSer thunk
  extraReducers: (builder) => {
    builder.addCase(LoginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(LoginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(LoginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
    //registersuer thunk
    builder.addCase(SignupUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(SignupUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(SignupUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
    //logout
    builder.addCase(LogoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(LogoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.otheruser=null
      state.selectedUser=null
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.removeItem('selectedUser')
      
    });
    builder.addCase(LogoutUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
    //user profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {});
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      

      state.isAuthenticated = true;
      state.screenLoading = false;
      
      state.userProfile=action.payload?.data
     
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
    //get other user
    builder.addCase(getOtherUserThunk.pending, (state, action) => {
      state.screenLoading=true
    });
    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
       

      state.otheruser=action.payload?.responceData
      state.screenLoading = false;
    });
    builder.addCase(getOtherUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const {setSelectedUser} = userSlice.actions;

export default userSlice.reducer;
