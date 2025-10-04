import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  authRegister,
  authChangePassword,
  authGetProfile,
  authUpdateProfile
} from "../../services/auth/authServices";

const initialState = {
  loader: false,
  data: null,
  profile: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // authLogin
    builder.addCase(authLogin.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      // TODO: update state fields properly
      state.data = action.payload.data;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // authRegister
    builder.addCase(authRegister.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      // TODO: update state fields properly
      state.data = action.payload.data;
    });
    builder.addCase(authRegister.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // authChangePassword
    builder.addCase(authChangePassword.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(authChangePassword.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      // TODO: update state fields properly
      state.data = action.payload.data;
    });
    builder.addCase(authChangePassword.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // authGetProfile
    builder.addCase(authGetProfile.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(authGetProfile.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      // TODO: update state fields properly
      state.profile = action.payload.data;
    });
    builder.addCase(authGetProfile.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // authUpdateProfile
    builder.addCase(authUpdateProfile.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(authUpdateProfile.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      // TODO: update state fields properly
      state.data = action.payload.data;
    });
    builder.addCase(authUpdateProfile.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });
  },
});

export default authSlice.reducer;
