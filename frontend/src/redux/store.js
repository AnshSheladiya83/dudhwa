// redux/store.js
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/authSlice";
import bookingReducer from "./slices/bookings/bookingsSlice";
import configReducer from "./slices/configs/configSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  config:configReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
