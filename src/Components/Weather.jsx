import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [cityTime, setCityTime] = useState('');
  const intervalRef = useRef(null); // To store the interval reference

  const API_KEY = 'f24b4a280e5a809e46ca765aa9d2275e';

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      try {
        const defaultLocation = 'Delhi';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        setData(response.data);
        startCityTimeUpdate(response.data.timezone);
      } catch (error) {
        console.error('Error fetching default location weather:', error);
      }
    };

    fetchDefaultLocation();
  }, [API_KEY]);

  const startCityTimeUpdate = (timezone) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear any existing interval
    }

    const update = () => {
      const utcTime = new Date();
      const cityTime = new Date(utcTime.getTime() + timezone * 1000);
      const formattedTime = cityTime.toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
      });
      setCityTime(formattedTime);
    };

    update();
    intervalRef.current = setInterval(update, 1000); // Update every second
  };

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation('');
        startCityTimeUpdate(response.data.timezone);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.log('An unexpected error occurred', error);
      }
    }
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

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Cleanup interval on unmount
      }
    };
  }, []);

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
      <div className="city-time">
        {cityTime && <div>City Time: {cityTime}</div>}
      </div>
    </div>
  );
};

export default Weather;