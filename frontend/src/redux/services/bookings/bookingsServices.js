import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Axios from "../../helper/axios";

// ================== booking Services ==================

// get all bookings
export const bookingGetAll = createAsyncThunk(
  "booking/getAll",
  async ({ token, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/api/bookings", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params,
      });
      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Opps! Something went wrong");
    }
  }
);

// get booking by id
export const bookingGetById = createAsyncThunk(
  "booking/getById",
  async ({ token, id, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/api/bookings/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params,
      });
      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Opps! Something went wrong");
    }
  }
);

// create new booking
export const bookingCreate = createAsyncThunk(
  "booking/create",
  async ({ token, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/api/bookings", body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params,
      });
      if (response.data.success) {
        toast.success(response.data.message ?? "Booking created successfully");
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Opps! Something went wrong");
    }
  }
);

export const bookingGetAvailability = createAsyncThunk(
  "booking/getAvailability",
  async ({ token, safari_date, time_slot }, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/api/bookings/availability", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params: { safari_date, time_slot },
      });

      if (response.data.success) {
        return response.data;
      } else {
        toast.error(response.data.message ?? "Something went wrong");
        return rejectWithValue(response.data.message ?? "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      return rejectWithValue(error?.response?.data?.message ?? "Opps! Something went wrong");
    }
  }
);