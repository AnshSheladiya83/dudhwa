import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Axios from "../../helper/axios";

// ================== Contact Us Services ==================

// Get all contact messages
export const contactUsGetAll = createAsyncThunk(
  "contactUs/getAll",
  async ({ token, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/api/contactus", {
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
      return rejectWithValue(error?.response?.data?.message ?? "Oops! Something went wrong");
    }
  }
);

// Get contact message by ID
export const contactUsGetById = createAsyncThunk(
  "contactUs/getById",
  async ({ token, id, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/api/contactus/${id}`, {
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
      return rejectWithValue(error?.response?.data?.message ?? "Oops! Something went wrong");
    }
  }
);

// Create new contact message
export const contactUsCreate = createAsyncThunk(
  "contactUs/create",
  async ({ token, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/api/contactus", body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params,
      });
      if (response.data.success) {
        toast.success(response.data.message ?? "Message submitted successfully");
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
