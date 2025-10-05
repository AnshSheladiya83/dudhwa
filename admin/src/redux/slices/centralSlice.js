// centralSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const centralSlice = createSlice({
  name: "central",
  initialState: {
    isSidebarOpen: true,
    token: null,
    language: "en", // Default language
      isDataRefresh: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setLanguage: (state, action) => {
      state.language = action.payload; // Set selected language
    },
        toggleDataRefresh: (state) => {
      state.isDataRefresh = !state.isDataRefresh;
    },
  },
});

export const {
  toggleSidebar,
  setIsSidebarOpen,
  setToken,
  clearToken,
  setLanguage,
    toggleDataRefresh
} = centralSlice.actions;

export default centralSlice.reducer;
    