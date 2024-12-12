import React from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const generateRandomSensors = (num) => {
  const levels = ["Низьке", "Середнє", "Високе"];
  const colors = { Низьке: "green", Середнє: "orange", Високе: "red" };
  const sensors = [];

  for (let i = 0; i < num; i++) {
    const lat = 48 + Math.random() * 3; // Координати для західної України
    const lng = 24 + Math.random() * 5;
    const pollution = levels[Math.floor(Math.random() * levels.length)];

    sensors.push({
      id: i,
      name: `Сенсор ${i + 1}`,
      lat,
      lng,
      pollution,
      color: colors[pollution],
    });
  }

  return sensors;
};

const Map = () => {
  const sensors = generateRandomSensors(200); // Генеруємо 50 міток

  return (
    <MapContainer center={[49.0, 25.0]} zoom={7} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {sensors.map((sensor) => (
        <CircleMarker
          key={sensor.id}
          center={[sensor.lat, sensor.lng]}
          color={sensor.color}
          radius={10}
        >
          <Popup>
            <strong>{sensor.name}</strong>
            <br />
            Рівень забруднення: {sensor.pollution}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;
