import PharmacyCard from "./PharmacyCard";

function PharmacyList({ pharmacies, loading, onSelect, selectedPharmacy }) {
  if (loading) return <p className="status-text">Looking for pharmacies...</p>;

  if (pharmacies.length === 0) {
    return (
      <p className="status-text">
        No pharmacies found yet. Tap the button above.
      </p>
    );
  }

  return (
    <div className="pharmacy-list">
      {pharmacies.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy.id}
          pharmacy={pharmacy}
          onSelect={onSelect}
          isSelected={pharmacy.id === selectedPharmacy.id}
        />
      ))}
    </div>
  );
}

export default PharmacyList;
