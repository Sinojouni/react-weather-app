import React, { useState } from "react";
import "./Tab3.css";

function Tab3() {
  const [city, setCity] = useState("");
  const [years, setYears] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);

  const checkCityExists = async (cityName) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results && data.results.length > 0;
    } catch (err) {
      return false;
    }
  };

  const handlePredict = async () => {
    setError("");
    setPrediction(null);
    setLoading(true);

    if (!city) {
      setError("Please enter a city.");
      setLoading(false);
      return;
    }

    if (years < 1 || years > 10) {
      setError("Years must be between 1 and 10.");
      setLoading(false);
      return;
    }

    const cityExists = await checkCityExists(city);
    if (!cityExists) {
      setError("City not found. Please enter a valid city.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://trainanycity.up.railway.app/predict/${city}/${years}`);
      if (!response.ok) throw new Error("Error fetching prediction");
      const data = await response.json();
      setPrediction(data.predictions);
    } catch (err) {
      setError("Failed to fetch prediction.");
    }

    setLoading(false);
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather Prediction</h2>
      <p className="weather-description">
        Enter a city and the number of years to train an LSTM model for weather prediction. 
        The model will analyze past weather data for the same month across multiple years. 
        Training may take long time.
      </p>
      <p  className="weather-description">Note: The API for training the model is hosted on a free service with a 500MB RAM limit. To accommodate this, I reduced the LSTM network size, which may lower accuracy. Also, training on a large number of years may cause the API to become unresponsive. For now, try training on just 1 or 2 years.
      </p>
      <div className="weather-inputs">
        <input
          type="text"
          className="weather-input"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="number"
          className="weather-input"
          min="1"
          max="10"
          placeholder="Years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <button className="weather-button" onClick={handlePredict} disabled={loading}>
          {loading ? "Training..." : "Predict"}
        </button>
      </div>
      {error && <p className="weather-error">{error}</p>}
      {prediction && (
        <div className="weather-result">
          <h3>Prediction Result:</h3>
          <table className="weather-table">
            <thead>
              <tr>
                <th>Hour</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {prediction.map((item) => (
                <tr key={item.hour}>
                  <td>{item.hour}:00</td>
                  <td>{item.temperature}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Tab3;
