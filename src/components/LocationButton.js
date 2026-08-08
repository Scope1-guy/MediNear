function LocationButton({ onClick, loading }) {
  return (
    <button className="location-btn" onClick={onClick} disabled={loading}>
      {loading ? "Searching..." : "📍 Find Pharmacies Near Me"}
    </button>
  );
}

export default LocationButton;
