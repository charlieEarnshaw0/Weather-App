import React, { use, useState, useEffect } from "react";
import FetchWeather from "./FetchWeather";
import CityInfo from "./CityInfo";

const DisplayWeather = ({ input }) => {
  //First fetch weather data from API
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    FetchWeather(input, true).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [input]);

  //Display error message if there is an error
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (weather && weather.error) {
    return <h1 style={{ color: "red" }}>ERROR: {weather.error.message}</h1>;

    //Display weather data
  } else if (weather && weather.location) {
    return (
      <div>
        <CityInfo weather={weather} />
      </div>
    );
  }
};

export default DisplayWeather;
