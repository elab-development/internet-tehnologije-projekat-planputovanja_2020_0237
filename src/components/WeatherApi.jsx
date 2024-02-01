import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/WeatherApi.css"; 

const api = {
  key: "82d01bf93bb39c6672a6f1198e7fa81b",
  base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherApi() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        console.error("Greška pri preuzimanju podataka:", error);
      });
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

        {/* Weather component moved to a separate component */}
        <WeatherDisplay weather={weather} />
      </header>
    </div>
  );
}

// Separate component to display weather
const WeatherDisplay = ({ weather }) => {
  return (
    <>
      {typeof weather.main !== "undefined" ? (
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
