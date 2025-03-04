import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  return (
    <div>
      <h1>Weather Map</h1>
      <MapContainer
        center={[48, 2]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <h1>End of Map</h1>
    </div>
  );
};

export default WeatherMap;
