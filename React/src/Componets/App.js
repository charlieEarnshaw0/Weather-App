import React from "react";
import CityWeather from "./CityWeather";
import NoPage from "./NoPage";
import HomePage from "./HomePage";
import WeatherMap from "./WeatherMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="city-weather" element={<CityWeather />} />
          <Route path="weather-map" element={<WeatherMap />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
