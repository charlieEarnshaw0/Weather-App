import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/WeatherMap.css";

const WeatherMap = () => {
  const [coords, setCoords] = useState([null, null]); //two tupple

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
        <h1>Weather Info</h1>
      </div>
      <p>Coords</p>
      <p>Latitude: {coords[0]}</p>
      <p>Longitude: {coords[1]}</p>
    </div>
  );
};

export default WeatherMap;
