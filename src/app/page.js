"use client";
import { useState } from "react";
import axios from "axios";

const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "a074728a9c1e6be576a6af3af11f03c2";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${API_ENDPOINT}?q=${city}&appid=${API_KEY}&units=imperial`
      );
      const responseData = response.data;

      setWeather(responseData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while fetching weather data. Please try again later."
      );
      setWeather(null);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
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
