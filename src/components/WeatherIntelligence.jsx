import React from 'react';
import { useDigiYatra } from '../context/DigiYatraContext';
import { getIcon } from './IconRegistry';
import { Thermometer, Droplets, Shirt } from 'lucide-react';
import './WeatherIntelligence.css';

const WeatherIntelligence = () => {
  const { weather } = useDigiYatra();
  if (!weather?.departure) return null;

  const WeatherCard = ({ data, label }) => (
    <div className="wi-city-card">
      <span className="wi-label">{label}</span>
      <div className="wi-main">
        <span className="wi-weather-icon">{getIcon(data.iconName, { size: 28 })}</span>
        <div className="wi-temp-block">
          <span className="wi-temp">{data.temp}°C</span>
          <span className="wi-condition">{data.condition}</span>
        </div>
      </div>
      <div className="wi-details">
        <span className="wi-detail"><Thermometer size={11} /> {data.city}</span>
        <span className="wi-detail"><Droplets size={11} /> {data.humidity}% humidity</span>
      </div>
      <div className="wi-advice">
        <Shirt size={11} />
        <span>{data.advice}</span>
      </div>
    </div>
  );

  return (
    <div className="wi-card">
      <h3 className="wi-title">Weather Intelligence</h3>
      <div className="wi-grid">
        <WeatherCard data={weather.departure} label="Departure" />
        <WeatherCard data={weather.destination} label="Destination" />
      </div>
    </div>
  );
};

export default WeatherIntelligence;
