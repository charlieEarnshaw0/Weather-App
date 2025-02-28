import React, { useState, useEffect } from "react";
import api from "./api";
const App = ({ city = "Wellington" }) => {
  //Debug
  const [weatherApiSaved, setWeatherApiSaved] = useState(true); //saves weather data in local host rather than calling the api again

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherFromApi = async () => {
      try {
        const response = await api.get(`/weather/${city}`);
        setWeather(response.data);
        localStorage.setItem("weather", JSON.stringify(response.data));
        console.log("Fetching weather data from api...");
      } catch (error) {
        console.error("Error fetching weather data from API:", error);
      }
    };

    const savedWeather = localStorage.getItem("weather");
    if (weatherApiSaved && savedWeather) {
      const parsedWeather = JSON.parse(savedWeather);
      console.log(parsedWeather);
      if (
        !parsedWeather.error &&
        parsedWeather.location.name.toLowerCase() === city.toLowerCase()
      ) {
        setWeather(parsedWeather);
        console.log("Fetching weather data from local host...");
      } else {
        fetchWeatherFromApi();
      }
    } else {
      fetchWeatherFromApi();
    }
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <h1>
            Weather in {weather.location.name}, {weather.location.country}
          </h1>
          <p>
            Temperature: {weather.current.temp_c}°C ({weather.current.temp_f}°F)
          </p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>
            Wind: {weather.current.wind_kph} kph ({weather.current.wind_mph}{" "}
            mph) {weather.current.wind_dir}
          </p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>
            Pressure: {weather.current.pressure_mb} mb (
            {weather.current.pressure_in} in)
          </p>
          <p>
            Visibility: {weather.current.vis_km} km ({weather.current.vis_miles}{" "}
            miles)
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
