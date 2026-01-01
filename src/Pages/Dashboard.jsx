import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCrops } from "../services/api";
import "../styles/Dashboard.css";

// calculate months since planted
function monthsSincePlanted(date) {
  if (!date) return "-";
  const planted = new Date(date);
  const now = new Date();
  return (
    (now.getFullYear() - planted.getFullYear()) * 12 +
    (now.getMonth() - planted.getMonth())
  );
}

export default function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

 useEffect(() => {
  getCrops()
    .then((res) => setCrops(res.data))
    .catch((err) => console.error(err));
}, []);

  const filteredCrops = crops.filter(
    (crop) =>
      crop.name?.toLowerCase().includes(search.toLowerCase()) ||
      crop.soilType?.toLowerCase().includes(search.toLowerCase()) ||
      crop.suitableSeason?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-top">
          <h2>🌾 Crop Dashboard</h2>
          <input
            type="text"
            placeholder="Search crop / soil / season..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <span>Crop</span>
            <span>Expense ₹</span>
            <span>Soil</span>
            <span>Season</span>
            <span>Months</span>
            <span>Moisture %</span>
            <span>Min °C</span>
            <span>Max °C</span>
          </div>

          {filteredCrops.length === 0 ? (
            <div className="no-data">No crops found 🌱</div>
          ) : (
            filteredCrops.map((crop) => (
              <div className="table-row" key={crop.id}>
                <span>{crop.name}</span>
                <span>₹ {crop.estimatedCost}</span>
                <span>{crop.soilType}</span>
                <span>{crop.suitableSeason}</span>
                <span>{monthsSincePlanted(crop.plantedDate)}</span>
                <span>{crop.moisture}</span>
                <span>{crop.minTemperature}</span>
                <span>{crop.maxTemperature}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
