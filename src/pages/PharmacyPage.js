import { useState } from "react";
import LocationButton from "../components/LocationButton";
import PharmacyList from "../components/PharmacyList";
import "../index.css";
import RouteMap from "../components/RouteMap";

import { fetchNearbyPlaces } from "../utils/overpass";

function PharmacyPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  console.log(location);

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleFindPharmacies = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);

        try {
          const results = await fetchNearbyPlaces(
            coords.lat,
            coords.lng,
            "pharmacy"
          );

          const sorted = results.sort((a, b) => a.distance - b.distance);
          setPharmacies(sorted);
        } catch (err) {
          setError("Something went wrong finding pharmacies");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(
          "Location access denied. Please enable it to find nearby pharmacies."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pharmacy Locator</h1>
        <p>Find pharmacies near you, anywhere in Nigeria</p>
      </header>

      <LocationButton onClick={handleFindPharmacies} loading={loading} />
      {/* {location && (
        <p>
          You are at: {location.lat}, {location.lng}
        </p>
      )} */}

      {error && <p className="error-message">{error}</p>}

      {selectedPharmacy && (
        <RouteMap
          userLocation={location}
          destination={{
            lat: location.lat + 0.01,
            lng: location.lng + 0.01,
            name: "Test Point",
          }}
        />
      )}

      <PharmacyList
        pharmacies={pharmacies}
        loading={loading}
        onSelect={handleSelectPharmacy}
        selectedPharmacy={selectedPharmacy}
      />
    </div>
  );
}

export default PharmacyPage;
