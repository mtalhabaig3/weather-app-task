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

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "0.25rem",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  backgroundColor: "#0077cc",
  color: "white",
  border: "none",
  borderRadius: "0.25rem",
};

const errorStyle = {
  color: "red",
  marginTop: "0.5rem",
};

const weatherStyle = {
  marginTop: "1rem",
  backgroundColor: "#f7f7f7",
  borderRadius: "0.25rem",
  padding: "1rem",
};

const weatherHeaderStyle = {
  marginBottom: "1rem",
};

const weatherIconStyle = {
  width: "50px",
  height: "50px",
  display: "inline-block",
  marginRight: "0.5rem",
};

const Home = () => {
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
        <label style={labelStyle}>
          Enter City{" "}
          <input
            type="text"
            value={city}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Search
        </button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
      {weather && (
        <div style={weatherStyle}>
          <h2 style={weatherHeaderStyle}>{weather.weather[0].main} </h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].main}
            style={weatherIconStyle}
          />
          <p>Temperature: {weather.main.temp}&deg;F</p>
          <p>City: {weather.name}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
