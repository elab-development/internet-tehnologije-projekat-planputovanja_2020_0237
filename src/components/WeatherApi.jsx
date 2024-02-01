import React from "react";
import { Link } from "react-router-dom";
import "../css/WeatherApi.css";
import useWeatherSearch from "./useWeatherSearch"; 

function WeatherApi() {
  const { search, setSearch, weather, setWeather, searchWeather } = useWeatherSearch();

  const searchPressed = async () => {
    try {
      await searchWeather();
    } catch (error) {
      console.error("Greška pri pretrazi vremena:", error);
    }
  };

  return (
    <div className="Weather">
      <header className="Weather-header">
        <h2>Za putovanje po meri, prvo vreme proveri:</h2>

        <div className="Weather-input-container">
          <input
            type="text"
            placeholder="Unesite željenu destinaciju"
            className="Weather-input"
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link to="/weather">
            <button
              type="button"
              onClick={searchPressed}
              className="Weather-button"
            >
              Pretraži
            </button>
          </Link>
        </div>

        <WeatherDisplay weather={weather} />
      </header>
    </div>
  );
}

const WeatherDisplay = ({ weather }) => {
  return (
    <>
      {weather && typeof weather.main !== "undefined" ? (
        <div className="Weather-display">
          <p>{weather.name}</p>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].main}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WeatherApi;
