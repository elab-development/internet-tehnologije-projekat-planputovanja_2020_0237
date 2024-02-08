import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../css/WeatherApi.css";
import useWeatherSearch from "./useWeatherSearch"; 
import axios from "axios";

function WeatherApi() {
  const { search, setSearch, weather, setWeather, searchWeather } = useWeatherSearch();
  const [news, setNews] = useState([]);
  

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=64086c1931554a36b9b4438d97043fcb`);
      return response.data.articles;
    } catch (error) {
      console.error('Greška pri dohvatanju vesti:', error);
      return [];
    }
  };
  
  const searchPressed = async () => {
    try {
      await searchWeather();
      const news = await fetchNews();
      setNews(news);
    } catch (error) {
      console.error('Greška pri pretrazi vremena:', error);
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
        <NewsDisplay news={news} />
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

const NewsDisplay = ({ news }) => {
  const maxNews = 6;
  return (
    <>
      {news && news.length > 0 ? (
        <div className="News-display">
          <h3>Najnovije vesti</h3>
          <ul>
            {news.slice(0, maxNews).map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default WeatherApi;
