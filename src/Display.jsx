import React from 'react';

const WeatherDisplay = ({ data }) => {
  const {
    location: { name, region, country },
    current: { temp_c, condition, wind_kph, humidity, },
  } = data;

  // Fetch forecast to get sunrise and sunset times
  const fetchForecast = async (location) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${location}&days=1`);
    const data = await response.json();
    return data.forecast.forecastday[0].astro;
  };

  const [astroData, setAstroData] = React.useState(null);

  React.useEffect(() => {
    fetchForecast(`${name},${region},${country}`).then(setAstroData);
  }, [name, region, country]);

  return (
    <div className="bg-green-500 p-4 rounded">
      <h2 className="text-xl font-bold mb-2">{name}, {region}, {country}</h2>
      <p className="mb-2">Temperature: {temp_c}°C</p>
      <p className="mb-2">Condition: {condition.text}</p>
      <p className="mb-2">Wind Speed: {wind_kph} kph</p>
      <p className="mb-2">Humidity: {humidity}%</p>
      {astroData && (
        <>
          <p className="mb-2">Sunrise: {astroData.sunrise}</p>
          <p className="mb-2">Sunset: {astroData.sunset}</p>
        </>
      )}
    </div>
  );
};

export default WeatherDisplay;
