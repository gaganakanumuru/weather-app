import React, { useState } from 'react';
import WeatherDisplay from './Display';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (location) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=a6d6faaccd0e4f7ca82200339242407&q=${location}`);
      if (!response.ok) {
        throw new Error('Invalid location or API failure.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Weather Information</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Get Weather
          </button>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {weatherData && <WeatherDisplay data={weatherData} />}
      </div>
    </div>
  );
}

export default App;
