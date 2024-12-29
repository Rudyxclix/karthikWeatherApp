import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("kakkanad");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Weather App</h1>
      <form
        onSubmit={handleSearch}
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "200px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            background: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      {weather && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "white",
            display: "inline-block",
            textAlign: "left",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "300px",
          }}
        >
          <h2 style={{ margin: "0 0 10px" }}>{weather.name}</h2>
          <p style={{ margin: "5px 0" }}>Temperature: {weather.main.temp}°C</p>
          <p style={{ margin: "5px 0" }}>Humidity: {weather.main.humidity}%</p>
          <p style={{ margin: "5px 0" }}>Wind Speed: {weather.wind.speed} m/s</p>
          <p style={{ margin: "5px 0", textTransform: "capitalize" }}>
            {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
