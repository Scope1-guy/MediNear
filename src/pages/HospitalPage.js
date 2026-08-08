import { useState } from "react";
import LocationButton from "../components/LocationButton";
import PharmacyList from "../components/PharmacyList";
import { fetchNearbyPlaces } from "../utils/overpass";
// ^ adjust this import based on what you actually named things when you split files

function HospitalPage() {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(location);

  const handleFindHospitals = () => {
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
            "hospital|clinic"
          );

          const sorted = results.sort((a, b) => a.distance - b.distance);
          setHospitals(sorted);
        } catch (err) {
          setError("SOmething went wrong finding hospitals");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(
          "Location access denied. Please enable it to find nearby hospitals."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hospital Locator</h1>
        <p>Find hospitals & clinics near you</p>
      </header>

      <LocationButton onClick={handleFindHospitals} loading={loading} />
      {error && <p className="error-message">{error}</p>}
      <PharmacyList pharmacies={hospitals} loading={loading} />
    </div>
  );
}

export default HospitalPage;
