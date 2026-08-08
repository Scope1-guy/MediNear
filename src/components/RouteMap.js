import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";

function RouteMap({ userLocation, destination }) {
  const positions = [
    [userLocation.lat, userLocation.lng],
    [destination.lat, destination.lng],
  ];

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>You are here</Popup>
      </Marker>

      <Marker position={[destination.lat, destination.lng]}>
        <Popup>{destination.name}</Popup>
      </Marker>

      <Polyline positions={positions} color="blue" />
    </MapContainer>
  );
}

export default RouteMap;
