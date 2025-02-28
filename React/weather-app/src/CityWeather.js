import React, { useState, useEffect } from "react";
import api from "./api";

const CityWeather = () => {
  const [weatherApiSaved, setWeatherApiSaved] = useState(true); //saves weather data in local host rather than calling the api again. For optimisation purposes.

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [showError, setShowError] = useState(false);

  const CityForm = () => {
    const [cityInput, setCityInput] = useState(city); //the value of the input field. NOT the current city

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Country submitted:", cityInput);
      setCity(cityInput); //Only set city on submission
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  useEffect(() => {
    const fetchWeatherFromApi = async () => {
      try {
        const response = await api.get(`/weather/${city}`);
        setWeather(response.data);
        localStorage.setItem("weather", JSON.stringify(response.data));
        console.log("Fetching weather data from api...");
      } catch (error) {
        console.error("Error fetching weather data from API:", error);
        setShowError(true);
      }
    };

    setShowError(false);
    const savedWeather = localStorage.getItem("weather");
    if (weatherApiSaved && savedWeather) {
      const parsedWeather = JSON.parse(savedWeather);
      console.log(parsedWeather);
      if (
        !parsedWeather.error &&
        (parsedWeather.location.name.toLowerCase() === city.toLowerCase() ||
          city === "")
      ) {
        setWeather(parsedWeather);
        console.log("Fetching weather data from local host...");
      } else {
        fetchWeatherFromApi();
      }
    } else {
      fetchWeatherFromApi();
    }
  }, [city]);

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
          <p>Time: {weather.current.last_updated} </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <CityForm />
      {showError && <p style={{ color: "red" }}>Error fetching weather data</p>}
    </div>
  );
};

export default CityWeather;
