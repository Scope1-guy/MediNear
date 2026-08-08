import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PharmacyPage from "./pages/PharmacyPage";
import HospitalPage from "./pages/HospitalPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pharmacy" element={<PharmacyPage />} />
      <Route path="/hospital" element={<HospitalPage />} />
    </Routes>
  );
}

export default App;
