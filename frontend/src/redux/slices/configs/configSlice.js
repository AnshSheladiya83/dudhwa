import { createSlice } from "@reduxjs/toolkit";
import {
  configAddOffDates,
  configGetAll,
  configGetOffDates,
} from "../../services/configs/configServices";

const initialState = {
  loader: false,
  configs: [],
  offDates: [],
  error: null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Off Dates
    builder.addCase(configAddOffDates.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(configAddOffDates.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      // Optionally merge new off_dates into state.offDates
      state.offDates = [...state.offDates, ...(action.payload.data?.off_dates || [])];
    });
    builder.addCase(configAddOffDates.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // Get All Configs
    builder.addCase(configGetAll.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(configGetAll.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.configs = action.payload.data;
    });
    builder.addCase(configGetAll.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });

    // Get All Off Dates
    builder.addCase(configGetOffDates.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(configGetOffDates.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.offDates = action.payload.data;
    });
    builder.addCase(configGetOffDates.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload ?? "Something went wrong!";
    });
  },
});

export default configSlice.reducer;
