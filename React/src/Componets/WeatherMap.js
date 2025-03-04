import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/WeatherMap.css";
import CityInfo from "./CityInfo";
import { fetchWeatherFromApi } from "./CityWeather";

const WeatherMap = () => {
  const [coords, setCoords] = useState([null, null]); //two tupple

  //fetch weather from api on submit
  const [weather, setWeather] = useState(null);
  const [showError, setShowError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    fetchWeatherFromApi(`${coords[0]},${coords[1]}`, setShowError, setWeather);
  };

  //Get coords
  const GetCoords = () => {
    useMapEvents({
      click: (event) => {
        setCoords([parseFloat(event.latlng.lat), parseFloat(event.latlng.lng)]);
      },
    });
    return null;
  };

  return (
    <div>
      <h1>Weather Map</h1>
      <div className="map-container">
        <MapContainer
          center={[48, 2]}
          zoom={13}
          style={{ height: "80vh", width: "80vw" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GetCoords />
        </MapContainer>
        <div>
          <h1>Weather Info</h1>
          <CityInfo weather={weather} showError={showError} />
        </div>
      </div>
      <h2>Coords</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={coords[0]} />
        <input type="text" value={coords[1]} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WeatherMap;
