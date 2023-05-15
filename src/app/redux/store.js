"use client";
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    // Add other reducers here
  },
});

export default store;
