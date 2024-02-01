import { useState } from "react";

const api = {
  key: "82d01bf93bb39c6672a6f1198e7fa81b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const useWeatherSearch = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchWeather = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        console.error("Greška pri preuzimanju podataka:", error);
      });
  };

  return {
    search,
    setSearch,
    weather,
    setWeather, // Dodato postavljanje weather stanja
    searchWeather,
  };
};

export default useWeatherSearch;
