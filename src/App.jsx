import React, { useState, useEffect } from 'react';
import './App.css';

const apikey = "8965aad5a0a0812888dd8d76c1f7d791";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

function App() {
  // State to hold the weather data
  const [weatherData, setWeatherData] = useState(null);
  // State to hold the city name input by the user
  const [city, setCity] = useState('London');
  // State to hold the loading status
  const [loading, setLoading] = useState(false);
  // State to hold any error messages
  const [error, setError] = useState('');

  // useEffect hook to fetch weather data when the city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(''); // Reset error state
      try {
        const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeatherData(data); // Update weather data state
        console.log(data);
        
      } catch (err) {
        setError(err.message); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchWeatherData(); // Call the function to fetch data
  }, [city]); // Dependency array: fetch data whenever 'city' changes

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setCity(e.target.elements.city.value); // Update city state with input value
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="Enter city" required />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;