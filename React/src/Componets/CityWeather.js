import React, { useState, useEffect } from "react";
import api from "../api";
import CityInfo from "./CityInfo";
import CityForm from "./CityForm";
import DisplayWeather from "./DisplayWeather";

const CityWeather = () => {
  const [city, setCity] = useState("");

  return (
    <div>
      <h1>City Weather</h1>
      <DisplayWeather input={city} />
      <CityForm city={city} setCity={setCity} />
    </div>
  );
};

export default CityWeather;
