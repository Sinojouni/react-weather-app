import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";


function Map({ setCoordinates }){
  const [position, setPosition] = useState([33.8938, 35.5018]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      },
    });

    return <Marker position={position}></Marker>;
  };

  return (
    <MapContainer center={position} zoom={5} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;