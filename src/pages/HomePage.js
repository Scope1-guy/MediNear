import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>MediNear</h1>
        <p>What are you looking for?</p>
      </header>

      <div className="home-options">
        <Link to="/pharmacy" className="option-btn">
          🏥 Locate a Nearby Pharmacy
        </Link>
        <Link to="/hospital" className="option-btn">
          🚑 Locate a Nearby Hospital
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
