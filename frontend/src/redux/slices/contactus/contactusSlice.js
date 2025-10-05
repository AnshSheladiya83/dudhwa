import { createSlice } from "@reduxjs/toolkit";
import {
  contactUsGetAll,
  contactUsGetById,
  contactUsCreate,
} from "../../services/contactus/contactusServices";

const initialState = {
  loader: false,
  data: null,       // for all contact messages
  message: null,    // for a single message or newly created message
  error: null,
};

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // contactUsGetAll
    builder.addCase(contactUsGetAll.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(contactUsGetAll.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.data = action.payload.data;
    });
    builder.addCase(contactUsGetAll.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // contactUsGetById
    builder.addCase(contactUsGetById.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(contactUsGetById.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.message = action.payload.data;
    });
    builder.addCase(contactUsGetById.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // contactUsCreate
    builder.addCase(contactUsCreate.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(contactUsCreate.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.message = action.payload.data;
    });
    builder.addCase(contactUsCreate.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });
  },
});

export default contactUsSlice.reducer;
