import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/WeatherMap.css";
import CityInfo from "./CityInfo";
import DisplayWeather from "./DisplayWeather";
import FetchWeather from "./FetchWeather";

const WeatherMap = () => {
  //Default coords

  const [inputCoords, setInputCoords] = useState([null, null]); //two tupple to strore lat and long
  const [coords, setCoords] = useState(""); //Will be a two tupple, empty as default

  //on submit, update coords hook
  const handleSubmit = (event) => {
    event.preventDefault();
    setCoords(`${inputCoords[0]},${inputCoords[1]}`);
    //setCoords("47.987029131374335,1.9808378637290196");
  };

  //Get coords from map click
  const GetCoords = () => {
    useMapEvents({
      click: (event) => {
        setInputCoords([
          parseFloat(event.latlng.lat),
          parseFloat(event.latlng.lng),
        ]);
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
          <DisplayWeather input={coords} />
        </div>
      </div>
      <h2>Coords</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputCoords[0]} />
        <input type="text" value={inputCoords[1]} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WeatherMap;
