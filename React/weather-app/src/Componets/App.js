import React from "react";
import CityWeather from "./CityWeather";
import NoPage from "./NoPage";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" /* element={<HomePage />} */>
          <Route path="" element={<HomePage />} />
          <Route path="city-weather" element={<CityWeather />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
