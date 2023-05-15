"use client";
import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    weather: null,
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCity, setWeather, setError } = weatherSlice.actions;

export const selectCity = (state) => state.weather.city;
export const selectWeather = (state) => state.weather.weather;
export const selectError = (state) => state.weather.error;

export default weatherSlice.reducer;
