import React, { useState, useEffect } from "react";
import api from "../api";
import CityInfo from "./CityInfo";
import CityForm from "./CityForm";

const fetchWeatherFromApi = async (city, setShowError, setWeather) => {
  setShowError(false);

  try {
    console.log("Fetching weather data from api...");
    console.log("City:", city);
    const response = await api.get(`/weather/${city}`);
    console.log("response.data: ", response.data);

    if (response.data === null) {
      setShowError(true);
      throw new Error("Error fetching weather data from API");
    } else {
      setWeather(response.data);
      localStorage.setItem("weather", JSON.stringify(response.data));
    }
  } catch (error) {
    console.error("Error fetching weather data from API:", error);
    setShowError(true);
  }
};

const useWeather = (city, setWeather, setShowError, weatherApiSaved) => {
  //Getting weather from API or local storage
  useEffect(() => {
    setWeather(null); //Clear weather data to activate loading screen

    //Check local storage first
    const savedWeather = localStorage.getItem("weather");
    if (weatherApiSaved && savedWeather) {
      const parsedWeather = JSON.parse(savedWeather);
      console.log(parsedWeather);
      if (
        //Make sure local storage is not an error
        !parsedWeather.error &&
        (parsedWeather.location.name.toLowerCase() === city.toLowerCase() ||
          city === "")
      ) {
        console.log("Fetching weather data from local host...");
        setWeather(parsedWeather);
        setShowError(false);
      } else {
        fetchWeatherFromApi(city, setShowError, setWeather);
      }
    } else {
      fetchWeatherFromApi(city, setShowError, setWeather);
    }
  }, [city]);
};

const CityWeather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [showError, setShowError] = useState(false);

  //Custom hook to fetch weather data
  useWeather(city, setWeather, setShowError, false); //false: saves weather data in local host rather than calling the api again. For optimisation purposes.

  return (
    <div>
      <CityInfo weather={weather} showError={showError} />
      <CityForm city={city} setCity={setCity} />
    </div>
  );
};

export default CityWeather;
export { fetchWeatherFromApi, useWeather };
