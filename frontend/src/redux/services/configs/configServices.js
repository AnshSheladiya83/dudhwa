import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Axios from "../../helper/axios";

// ================== config Services ==================

// Add new off date(s)
export const configAddOffDates = createAsyncThunk(
  "config/addOffDates",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/api/config/off-dates", body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (response.data.success) {
        toast.success(response.data.message ?? "Off dates added successfully");
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Oops! Something went wrong");
    }
  }
);

// Get all configs
export const configGetAll = createAsyncThunk(
  "config/getAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/api/config", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Oops! Something went wrong");
    }
  }
);

// Get all off dates
export const configGetOffDates = createAsyncThunk(
  "config/getOffDates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/api/config/off-dates");
      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Oops! Something went wrong");
    }
  }
);
