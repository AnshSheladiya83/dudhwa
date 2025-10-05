import { createSlice } from "@reduxjs/toolkit";
import {
  bookingGetAll,
  bookingGetById,
  bookingCreate
} from "../../services/bookings/bookingsServices";

const initialState = {
  loader: false,
  data: null,
  booking: null,
  bookings: [],
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // bookingGetAll
    builder.addCase(bookingGetAll.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(bookingGetAll.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      console.log(action.payload)
      state.bookings = action.payload.data;
    });
    builder.addCase(bookingGetAll.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // bookingGetById
    builder.addCase(bookingGetById.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(bookingGetById.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.booking = action.payload.data;
    });
    builder.addCase(bookingGetById.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // bookingCreate
    builder.addCase(bookingCreate.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(bookingCreate.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.booking = action.payload.data;
    });
    builder.addCase(bookingCreate.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });
  },
});

export default bookingSlice.reducer;
