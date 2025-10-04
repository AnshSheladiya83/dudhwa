import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Axios from "../../helper/axios";

// ================== auth Services ==================

// authLogin
export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ token, id, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`/api/auth/login`, body, {
        params
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


// authRegister
export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ token, id, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`/api/auth/signup`.replace(":id", id), body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params
      });
      if (response.data.success) {
    toast.success(response.data.message);
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


// authChangePassword
export const authChangePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ token, id, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`/api/auth/change-password`.replace(":id", id), body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params
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


// authGetProfile
export const authGetProfile = createAsyncThunk(
  "auth/getProfile",
  async ({ token, id, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/api/auth/profile`.replace(":id", id), {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params
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


// authUpdateProfile
export const authUpdateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ token, id, body, params }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/api/auth/profile`.replace(":id", id), body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        params
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
