import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const API_KEY = 'f24b4a280e5a809e46ca765aa9d2275e';

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      try {
        const defaultLocation = 'Delhi';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching default location weather:', error);
      }
    };

    fetchDefaultLocation();
  }, [API_KEY]);

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation('');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.log('An unexpected error occurred', error);
      }
    }
    console.log(data);
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return <i className="bx bxs-sun"></i>;
      case 'Clouds':
        return <i className="bx bxs-cloud"></i>;
      case 'Thunderstorm':
        return <i className="bx bxs-clod-lightning"></i>;
      case 'Rain':
        return <i className="bx bxs-cloud-rain"></i>;
      case 'Snow':
        return <i className="bx bxs-cloud-snow"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>

      {data.notFound ? (
        <div className="not-found">Not Found 😭</div>
      ) : (
        <div className="weather-data">
          {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}
          <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
          <div className="temp">{data.main ? Math.floor(data.main.temp) + '*C' : ''}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;