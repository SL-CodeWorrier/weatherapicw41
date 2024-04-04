import MapSvg from "./map";
import axios from "axios";
import { useEffect, useState } from "react";
import Districts from "../constants/districts";

export default function MapContainer() {
  const [data, setData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://weather-forecast-backend-m9oo.onrender.com/api/v1/weather/lk/latest"
      )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setShowCard(true);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <MapSvg />
        {Districts.map((district) => (
          <div
            key={district.id}
            style={{
              position: "absolute",
              top: district.top + "px",
              left: district.left + "px",
            }}
          >
            <div
              style={{
                position: "absolute",
                transform: `translate(${district.x}px, ${district.y}px)`,
                fontSize: "7px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => handleDistrictClick(district)}
            >
              {district.name}
            </div>
            {showCard && selectedDistrict === district && (
              <div
                style={{
                  position: "absolute",
                  fontSize: "7px",
                  fontWeight: "bold",
                  backgroundColor: "white",
                  padding: "8px",
                  borderRadius: "5px",
                  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
                  left: "300px",
                  top: "100px",
                  width: "180px",
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {data
                  .filter((weather) => weather.district === district.name)
                  .map((weather) => (
                    <div key={weather.district}>
                      <p style={{ fontSize: "12px" }}>
                        Temperature: {weather._temperature}°C
                      </p>
                      <p style={{ fontSize: "12px" }}>
                        Humidity: {weather._humidity}%
                      </p>
                      <p style={{ fontSize: "12px" }}>
                        Air Pressure: {weather._airPressure} hPa
                      </p>
                      <p style={{ fontSize: "12px" }}>
                        Last Updated: {weather._lastUpdatedDateTime}
                      </p>
                      {weather.updatedNow && (
                        <p>{weather._district} updated now!</p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}