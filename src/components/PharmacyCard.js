function PharmacyCard({ pharmacy, onSelect, isSelected }) {
  return (
    <div className={`pharmacy-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(pharmacy)}>
      <h3>{pharmacy.name}</h3>
      <p>{pharmacy.address}</p>
      <p className="distance">{pharmacy.distance} km away</p>
    </div>
  );
}

export default PharmacyCard;
