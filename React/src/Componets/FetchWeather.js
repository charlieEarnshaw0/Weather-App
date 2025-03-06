import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api";

//Returns weather object on success or the error
//Manages the local storage as well
const FetchWeather = async (input, weatherApiSaved) => {
  //WeatherApiSaved is the option to use local storage to save weather
  //Check local storage first
  const parsedWeather = JSON.parse(localStorage.getItem("weather"));

  //Check if data in local storage
  //Check saved data is not an error, and the city matches the input or no input
  //If no input, grab the first city in local storage
  if (
    weatherApiSaved &&
    parsedWeather &&
    parsedWeather.location &&
    (parsedWeather.location.name.toLowerCase() === input.toLowerCase() ||
      input === "")
  ) {
    return parsedWeather;
  }

  //Fetch weather data from API or the error
  try {
    const response = await api.get(`/weather/${input}`);

    //only write to local storage if the data is not an error or message
    if (
      response.data !== null &&
      !response.data.error &&
      !response.data.message
    ) {
      localStorage.setItem("weather", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data from API:", error);
    return { error: error || "Something went wrong" };
  }
};

export default FetchWeather;
