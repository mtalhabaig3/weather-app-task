"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./page.css";
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

const Home = () => {
  const dispatch = useDispatch();
  const city = useSelector(selectCity);
  const weather = useSelector(selectWeather);
  const error = useSelector(selectError);
  const [loading, setLoading] = useState(true);

  console.log(weather);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city === "") {
      dispatch(setError("City cannot be empty"));
      return;
    }
    setLoading(false);

    try {
      const response = await axios.get(
        `${API_ENDPOINT}?q=${city}&appid=${API_KEY}&units=imperial`
      );

      dispatch(setWeather(response.data));
      dispatch(setError(null));
    } catch (error) {
      console.error(error);

      dispatch(setError(error.response.data.message));
      dispatch(setWeather(null));
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    dispatch(setCity(event.target.value));
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Enter City{" "}
          <input
            type="text"
            value={city}
            onChange={handleChange}
            className="input"
          />
        </label>

        <div className="search-button">
          <button type="submit" className="button">
            Search
          </button>
        </div>
        {!loading && <p>Please wait...</p>}
        {error && <p className="error">{error}</p>}
      </form>

      {weather && (
        <div className="weather">
          <h2 className="weather-header">{weather.weather[0].main} </h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].main}
            className="weather-icon"
          />

          <p className="bold">
            City: <p className="normal">{weather.name}</p>
          </p>
          <p className="bold">
            Temperature: <p className="normal">{weather.main.temp}&deg;F</p>
          </p>
          <p className="bold">
            Feels Like:{" "}
            <p className="normal">{weather.main.feels_like}&deg;F</p>
          </p>
          <p className="bold">
            Humidity: <p className="normal">{weather.main.humidity}</p>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
