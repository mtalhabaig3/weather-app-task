"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCity,
  selectCity,
  setWeather,
  selectWeather,
  setError,
  selectError,
} from "./redux/weatherSlice";

const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "a074728a9c1e6be576a6af3af11f03c2";

export default function Home() {
  const dispatch = useDispatch();
  const city = useSelector(selectCity);
  const weather = useSelector(selectWeather);
  const error = useSelector(selectError);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${API_ENDPOINT}?q=${city}&appid=${API_KEY}&units=imperial`
      );
      const responseData = response.data;

      dispatch(setWeather(response.data));
      dispatch(setError(null));
    } catch (error) {
      console.error(error);
      dispatch(setError("An error occurred. Please try again later."));
      dispatch(setWeather(null));
    }
  };

  const handleChange = (event) => {
    dispatch(setCity(event.target.value));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter City:
          <input type="text" value={city} onChange={handleChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.weather[0].main} </h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].main}
          />
          <p>Temperature: {weather.main.temp}&deg;F</p>
          <p>City: {weather.name}</p>
        </div>
      )}
    </div>
  );
}
