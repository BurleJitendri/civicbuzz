import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🧭 Custom colored icons
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 🧠 Helper component: Auto-fit map bounds to markers
const FitMapToMarkers = ({ issues }) => {
  const map = useMap();

  useEffect(() => {
    if (!issues.length) return;

    const bounds = L.latLngBounds(
      issues
        .filter((i) => i.latitude && i.longitude)
        .map((i) => [i.latitude, i.longitude])
    );

    if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50] });
  }, [issues, map]);

  return null;
};

const MapView = ({ issues }) => {
  const defaultPosition = [12.9716, 77.5946]; // fallback (Bengaluru)

  return (
    <MapContainer
      center={defaultPosition}
      zoom={12}
      className="h-96 w-full rounded-lg shadow"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <FitMapToMarkers issues={issues} />

      {issues.map((issue, index) => {
        // ✅ Use stored coordinates (fallback to Bengaluru)
        const position = [
          issue.latitude || 12.9716,
          issue.longitude || 77.5946,
        ];
        const icon = issue.status === "Resolved" ? greenIcon : redIcon;

        return (
          <Marker key={index} position={position} icon={icon}>
            <Popup>
              <strong>{issue.title}</strong> <br />
              <span
                style={{
                  color: issue.status === "Resolved" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {issue.status || "Pending"}
              </span>
              <br />
              {issue.description}
              {issue.location && (
                <>
                  <br />
                  📍 <em>{issue.location}</em>
                </>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
