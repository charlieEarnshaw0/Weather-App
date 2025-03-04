import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <h2>
        <Link to="/city-weather">Go to City Weather</Link>
        <br />
        <Link to="/weather-map">Go to Weather Map</Link>
      </h2>
    </div>
  );
};

export default HomePage;
